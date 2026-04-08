import { Routes } from '@angular/router';




export const routes: Routes = [
  {
    path: '',
    loadComponent: ()=> import('./shared/components/layout/layout').then(c=> c.Layout),
    children: [
      {
        path: '',
        loadComponent: ()=> import('./features/landing-page/landing-page').then(c=> c.LandingPage),
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    loadComponent: ()=> import('./features/error/error').then(c=> c.Error)
  }
];
