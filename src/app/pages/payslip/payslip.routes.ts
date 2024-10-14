import { Routes } from '@angular/router';

import { PayslipComponent } from './payslip.component';

export const PayslipRoutes: Routes = [
  {
    path: '',
    component: PayslipComponent,
    children: [
      // {
      //   path: 'detail',
      //   component: PayslipDetailComponent,
      // }
    ],
  },
];
