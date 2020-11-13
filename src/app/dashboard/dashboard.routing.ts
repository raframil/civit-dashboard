import { HomeComponent } from './home/home.component'
import { Routes } from '@angular/router'
import { NavComponent } from './nav/nav.component'

export const DashboardRoutes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
    ],
  },
]
