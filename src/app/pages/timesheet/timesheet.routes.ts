import { Routes } from '@angular/router';

import { TimesheetComponent } from './timesheet.component';

export const TimesheetRoutes: Routes = [
  {
    path: '',
    component: TimesheetComponent,
    children: [
      // {
      //   path: 'detail',
      //   component: TimesheetDetailComponent,
      // }
    ],
  },
];
