import { Routes } from '@angular/router';

import { LeaveComponent } from './leave.component';

export const LeaveRoutes: Routes = [
  {
    path: '',
    component: LeaveComponent,
    children: [
      // {
      //   path: 'detail',
      //   component: LeaveDetailComponent,
      // }
    ],
  },
];
