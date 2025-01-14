import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'details-annonce/:idAnnonce',
    loadChildren: () => import('./details-annonce/details-annonce.module').then( m => m.DetailsAnnoncePageModule)
  },
  {
    path: 'liste-resultats/:idRegion',
    loadChildren: () => import('./liste-resultats/liste-resultats.module').then( m => m.ListeResultatsPageModule)
  },  {
    path: 'recherche-avancee',
    loadChildren: () => import('./recherche-avancee/recherche-avancee.module').then( m => m.RechercheAvanceePageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
