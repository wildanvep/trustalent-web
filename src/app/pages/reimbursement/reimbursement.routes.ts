import { Routes } from '@angular/router';

import { ReimbursementComponent } from './reimbursement.component';

export const ReimbursementRoutes: Routes = [
  {
    path: '',
    component: ReimbursementComponent,
    children: [
      // {
      //   path: 'detail',
      //   component: ReimbursementDetailComponent,
      // }
    ],
  },
];
