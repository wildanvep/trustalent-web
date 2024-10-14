import { Routes } from '@angular/router';

import { OvertimeComponent } from './overtime.component';

export const OvertimeRoutes: Routes = [
  {
    path: '',
    component: OvertimeComponent,
    children: [
      // {
      //   path: 'detail',
      //   component: PayslipDetailComponent,
      // }
    ],
  },
];
