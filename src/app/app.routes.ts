import { Routes } from '@angular/router';
import { LandingPage } from './features/landing-page/landing-page';
import { Layout } from './shared/components/layout/layout';



export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '',
        component: LandingPage
      }
    ]
  },
  {
    path: '**',
    loadComponent: ()=> import('./features/error/error').then(c=> c.Error)
  }
];
