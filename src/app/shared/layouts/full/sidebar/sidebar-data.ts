import { NavItem } from './nav-item/nav-item';

export const userNavItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    navCap: 'Task List',
    divider: true,
  },
  {
    displayName: 'Timesheet',
    iconName: 'solar:sort-by-time-bold',
    route: '/timesheet',
  },
  {
    navCap: 'Report',
    divider: true,
  },
  {
    displayName: 'Payslip',
    iconName: 'solar:hand-money-outline',
    route: '/payslip',
  },
  {
    navCap: 'Employee Self Service',
    divider: true,
  },
  {
    displayName: 'Overtime',
    iconName: 'solar:clock-circle-broken',
    route: '/overtime',
  },
  {
    displayName: 'Leave',
    iconName: 'solar:exit-outline',
    route: '/leave',
  },
  {
    displayName: 'Reimbursement',
    iconName: 'solar:wad-of-money-broken',
    route: '/reimbursement',
  }
];

export const adminNavItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    navCap: 'User Management',
  },
  {
    displayName: 'User',
    iconName: 'solar:widget-add-line-duotone',
    route: '/user',
  }
];
