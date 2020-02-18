// @ts-ignore
import { NgModule } from '@angular/core';
// @ts-ignore
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'details-annonce',
    loadChildren: () => import('./details-annonce/details-annonce.module').then( m => m.DetailsAnnoncePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
