import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/shopping-list/shopping-list.component').then(c => c.ShoppingListComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];