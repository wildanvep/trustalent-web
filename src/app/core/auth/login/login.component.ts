import {Component, DestroyRef, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import { MatButtonModule } from '@angular/material/button';
import { MaterialModule } from 'src/app/material.module';
import { AuthService } from '../auth.service';
import { Login } from './interfaces';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './login.component.html'
})
export class AppLoginComponent implements OnInit{
  
  private readonly authSvc = inject(AuthService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  loginForm!: FormGroup;
  validLogin = true;

  ngOnInit() {
    console.log('AppLoginComponent initialized');
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onLoginFormSubmitted() {
    console.log('Login form submitted' + this.loginForm.value);
    if (!this.loginForm.valid) {
      return;
    }

    this.authSvc.login(this.loginForm.value as Login).pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(
      {
        next: (v) => console.log(v),
        error: (e) => this.validLogin = false,
        complete: () => console.info('complete') 
      }
    );
  }
}
