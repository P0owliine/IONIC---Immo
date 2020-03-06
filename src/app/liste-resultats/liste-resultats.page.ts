import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {forEach} from '@angular-devkit/schematics';

const optionRequete = {
  headers : new HttpHeaders({'Access-Control-Allow-Origin': '*'})
};

@Component({
  selector: 'app-liste-resultats',
  templateUrl: './liste-resultats.page.html',
  styleUrls: ['./liste-resultats.page.scss'],
})
export class ListeResultatsPage implements OnInit {
  results: [];
  resultsList: any;
  resultsTitle: any;
  nbAnnonces: any;
  noAnnonce: any;

  constructor(public http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resultsList = document.getElementById('resultList');
    this.resultsTitle = document.getElementById('resultTitle');
    this.nbAnnonces = document.getElementById('nbAnnonces');
    this.noAnnonce = document.getElementById('noAnnonce');
    const id = this.route.snapshot.paramMap.get('idRegion');
    if (id !== null) {
      const url = 'http://localhost/immo-api/public/annonce/getAnnoncesByRegion/' + id;
      this.getAnnonces(url);
    } else {
      window.location.href = '../tabs/tab1/';
    }
  }

  getAnnonces(url): void {
    let data: Observable<any>;
    data = this.http.get(url, optionRequete);
    data.subscribe(resultat => {
      this.results = resultat;
      if (this.results.length === 0) {
        this.noAnnonce.style.display = 'block';
      } else {
        this.resultsList.style.display = 'inline';
        this.nbAnnonces.style.display = 'inline';
        this.nbAnnonces.innerHTML = this.results.length + ' annonces';
      }
    });
  }
/*

  applyFilters() {
    if (sessionStorage.getItem('priceMin') !== null || sessionStorage.getItem('priceMax') !== null) {
      this.checkPrice();
    }
    if (sessionStorage.getItem('surfaceMin') !== null || sessionStorage.getItem('surfaceMax') !== null) {
      this.checkSurface();
    }
    if (sessionStorage.getItem('piecesMin') !== null || sessionStorage.getItem('piecesMax') !== null) {
      this.checkPieces();
    }
  }

  checkPrice() {
    let remove;
    const priceMin = sessionStorage.getItem('priceMin');
    const priceMax = sessionStorage.getItem('priceMax');
    console.log(priceMin + ' ' + priceMax);
    for (let i = 0; i < this.results.length; i++) {
      if (priceMin !== null) {
        console.log('yoo' + this.results[i]);
        if (this.results[i].price < priceMin) {
          console.log(this.results[i].price + '<' + priceMin);
          remove = true;
        }
      }
      if (priceMax !== null) {
        if (this.results[i].price > priceMax) {
          console.log('max ' + i);
          remove = true;
        }
      }

      if(remove){
        this.results.splice(i, 1);
      }

    }
  }
  checkSurface() {
    const surfaceMin = sessionStorage.getItem('surfaceMin');
    const surfaceMax = sessionStorage.getItem('surfaceMax');
    for (let i = 0; i < this.results.length; i++) {
      if ((surfaceMin !== null && this.results[i].surface < surfaceMin) || (surfaceMax !== null && this.results[i].surface > surfaceMax) ) {
        this.results.splice(i, 1);
      }
    }
  }

  checkPieces() {
    const piecesMin = sessionStorage.getItem('piecesMin');
    const piecesMax = sessionStorage.getItem('piecesMax');
    for (let i = 0; i < this.results.length; i++) {
      if ((piecesMin !== null && this.results[i].rooms_number < piecesMin)
          || (piecesMax !== null && this.results[i].rooms_number > piecesMax) ) {
        this.results.splice(i, 1);
      }
    }
  }*/

}
