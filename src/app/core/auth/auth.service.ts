import { HttpClient, HttpContext, HttpHeaders } from "@angular/common/http";
import { DestroyRef, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { catchError, Observable, of, tap, throwError } from "rxjs";
import { environment } from "../../../environments/environment";
import { IS_PUBLIC } from "./auth.interceptor";
import { Login, LoginData, UserInfo } from "./login/interfaces";
import { LoginResponse } from "./login/types/login-response.type";
import { User } from "./user.interface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly jwtHelper = inject(JwtHelperService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly CONTEXT = { context: new HttpContext().set(IS_PUBLIC, true) };
  private readonly TOKEN_EXPIRY_THRESHOLD_MINUTES = 5;

  get user(): WritableSignal<User | null> {
    const token = localStorage.getItem('token');
    return signal(token ? this.jwtHelper.decodeToken(token) : null);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    } else {
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

  login(body: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/authenticate`, body, this.CONTEXT)
      .pipe(
        tap(data => {
          const response = data as LoginResponse;
          this.storeTokens(response.data);
          this.scheduleTokenRefresh(response.data.token);
          this.storeUserInfo(response.data.user_info);
          this.router.navigate(['/']);
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    const token = localStorage.getItem('token');
    this.http.post<LoginResponse>(`${environment.apiUrl}/auth/logout`, { token }, this.CONTEXT)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_info');
        this.router.navigate(['/authentication/login']);
      });
  }

  storeTokens(data: LoginData): void {
    localStorage.setItem('token', data.token);
  }

  storeUserInfo(userInfo: UserInfo): void {
    localStorage.setItem('user_info', JSON.stringify(userInfo));
  }

  refreshToken(): Observable<LoginResponse | null> {
    const previous_token = localStorage.getItem('token')    

    if (!previous_token) {
      return of();
    }

    if (!this.jwtHelper.isTokenExpired(previous_token)) {
      return of();
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${previous_token}`
    });

    return this.http.post<LoginResponse>(
      `${environment.apiUrl}/auth/refresh-token`, {}, { headers, ...this.CONTEXT }
    ).pipe(
      catchError(() => of()),
      tap(data => {
        const response = data as LoginResponse;
        this.storeTokens(response.data);
        this.scheduleTokenRefresh(response.data.token);
        this.router.navigate(['/']);
      })
    );
  }

  scheduleTokenRefresh(token: string): void {
    const expirationTime = this.jwtHelper.getTokenExpirationDate(token)?.getTime();
    const refreshTime = expirationTime ? expirationTime - this.TOKEN_EXPIRY_THRESHOLD_MINUTES * 60 * 1000 : Date.now();
    const refreshInterval = refreshTime - Date.now();

    if (refreshInterval > 0) {
      setTimeout(() => {
        this.refreshToken()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe();
      }, refreshInterval);
    }
  }
}