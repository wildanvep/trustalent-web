import { Routes } from '@angular/router';
import { UserComponent } from './user.component';

export const UserRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      title: 'User',
      urls: [
        { title: 'User', url: '/user' },
      ],
    },
  },
];
