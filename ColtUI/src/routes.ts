import { Routes } from '@angular/router';
import { LayoutComponent } from './app/core/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./app/homepage/homepage.component').then(
            (m) => m.HomepageComponent
          ),
      },
      {
        path: 'mitglieder',
        loadComponent: () =>
          import('./app/users/users.component').then((m) => m.UsersComponent),
      },
      {
        path: 'anwesenheiten',
        loadComponent: () =>
          import('./app/attendances/attendances.component').then(
            (m) => m.AttendancesComponent
          ),
      },
      {
        path: 'abteilungen',
        loadComponent: () =>
          import('./app/departments/departments.component').then(
            (m) => m.DepartmentsComponent
          ),
      },
      {
        path: 'mitgliederstellung',
        loadComponent: () =>
          import('./app/user-create/user-create.component').then(
            (m) => m.UserCreateComponent
          ),
      },
      {
        path: 'details',
        loadComponent: () =>
          import('./app/user-details/user-details.component').then(
            (m) => m.UserDetailsComponent
          ),
      },
    ],
  },
];
