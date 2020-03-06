import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recherche-avancee',
  templateUrl: './recherche-avancee.page.html',
  styleUrls: ['./recherche-avancee.page.scss'],
})
export class RechercheAvanceePage implements OnInit {
  region: any;
  priceMin: any;
  priceMax: any;
  surfaceMin: any;
  surfaceMax: any;
  piecesMin: any;
  piecesMax: any;

  constructor() { }

  ngOnInit() {
  }

  sendRequest() {
    this.priceMin !== undefined ? sessionStorage.setItem('priceMin', this.priceMin) : sessionStorage.removeItem('priceMin');
    this.priceMax !== undefined ? sessionStorage.setItem('priceMax', this.priceMax) : sessionStorage.removeItem('priceMax');
    this.surfaceMin !== undefined ? sessionStorage.setItem('surfaceMin', this.surfaceMin) : sessionStorage.removeItem('surfaceMin');
    this.surfaceMax !== undefined ? sessionStorage.setItem('surfaceMax', this.surfaceMax) : sessionStorage.removeItem('surfaceMax');
    this.piecesMin !== undefined ? sessionStorage.setItem('piecesMin', this.piecesMin) : sessionStorage.removeItem('piecesMin');
    this.piecesMax !== undefined ? sessionStorage.setItem('piecesMax', this.piecesMax) : sessionStorage.removeItem('piecesMax');
    if (this.region !== undefined) {
      window.location.href = '../liste-resultats/' + this.region ;
      sessionStorage.setItem('filtres', 'true');
    }  else{
      console.log('Pas de région sélectionnée');
    }
  }
}
