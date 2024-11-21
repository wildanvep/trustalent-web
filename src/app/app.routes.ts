import { Routes } from '@angular/router';
import { BlankComponent } from './shared/layouts/blank/blank.component';
import { FullComponent } from './shared/layouts/full/full.component';
import { accountGuard, authGuard } from './core/auth/guards';

export const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.routes').then((m) => m.DashboardRoutes),
        canActivate: [authGuard]
      },
      {
        path: 'timesheet',
        loadChildren: () =>
          import('./pages/timesheet/timesheet.routes').then(
            (m) => m.TimesheetRoutes
          ),
        canActivate: [authGuard]
      },
      {
        path: 'payslip',
        loadChildren: () =>
          import('./pages/payslip/payslip.routes').then(
            (m) => m.PayslipRoutes
          ),
        canActivate: [authGuard]
      },
      {
        path: 'overtime',
        loadChildren: () =>
          import('./pages/overtime/overtime.routes').then(
            (m) => m.OvertimeRoutes
          ),
        canActivate: [authGuard]
      },
      {
        path: 'leave',
        loadChildren: () =>
          import('./pages/leave/leave.routes').then(
            (m) => m.LeaveRoutes
          ),
        canActivate: [authGuard]
      },
      {
        path: 'reimbursement',
        loadChildren: () =>
          import('./pages/reimbursement/reimbursement.routes').then(
            (m) => m.ReimbursementRoutes
          ),
        canActivate: [authGuard]
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./pages/user/user.routes').then(
            (m) => m.UserRoutes
          ),
        canActivate: [authGuard]
      },
      {
        path: 'client',
        loadChildren: () =>
          import('./pages/client/client.routes').then(
            (m) => m.ClientRoutes
          ),
        canActivate: [authGuard]
      }
    ],
  },
  
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () =>
          import('./core/auth/authentication.routes').then(
            (m) => m.AuthenticationRoutes
          ),
        canActivate: [accountGuard]
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'authentication/error',
  },
];
