import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr, 'fr');


const optionRequete = {
  headers : new HttpHeaders({'Access-Control-Allow-Origin': '*'})
};

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.page.html',
  styleUrls: ['./details-annonce.page.scss'],
})
export class DetailsAnnoncePage implements OnInit {

  constructor(public http: HttpClient, private route: ActivatedRoute) {
    this.verifFavoris();

  }

  readonly root = 'http://localhost/immo-api/public';
  results: [];
  details: any[] = [];
  texteAnnonce: any;
  images: [];
  favoris: any;
  img: any;
  idAnnonce: any;
  idFavoris: any;
  saveIcon: any;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ngOnInit() {
    this.texteAnnonce = document.getElementById('texte-annonce');
    this.idAnnonce = this.route.snapshot.paramMap.get('idAnnonce');
    if (this.idAnnonce !== null) {
      const url = this.root + '/annonce/getAnnonces/' + this.idAnnonce;
      this.getDetails(url);
      this.saveIcon = document.getElementById('save-icon');
      this.saveIcon.setAttribute('name', 'heart-empty');
    } else {
      window.location.href = '../tabs/tab1/';
    }
  }

  public getDetails(url): void {
    let data: Observable<any>;
    data = this.http.get(url, optionRequete);
    data.subscribe(resultat => {
      this.results = resultat;
      // @ts-ignore
      this.details = this.results[0];
      // @ts-ignore
      this.images = this.results.images;
      if (this.results !== []) {
        this.texteAnnonce.style.display = 'inline';
      }
    });
  }

  verifFavoris() {
    let i = 0;
    this.favoris = '';
    this.img = '';
    this.http.get(this.root + '/favoris/getFavoris/' + sessionStorage.getItem('loggedId'), optionRequete).subscribe(data => {
      this.favoris = data;
      console.log(data[0]);
      while (i < this.favoris.length) {
        if (data[i].id === this.idAnnonce) {
          this.saveIcon.setAttribute('name', 'heart');
          this.idFavoris = data[i].id_favoris;
          console.log(this.idFavoris);
        }
        i++;
      }
    });
  }

  changeIcon() {
    if (this.saveIcon.getAttribute('name') === 'heart') {
      this.saveIcon.setAttribute('name', 'heart-empty');
      const params = '{"id_favoris": "' + this.idFavoris + '"}';
      console.log(params);
      this.http.post(this.root + '/favoris/deleteFavoris', params, optionRequete).subscribe(data => {
        if (data === 1) {
          console.log('suppression favoris');
        }
      });
    } else {
      this.saveIcon.setAttribute('name', 'heart');
      console.log(this.idAnnonce + ' ' + sessionStorage.getItem('loggedId'));
      const params = '{"id_annonce": "' + this.idAnnonce + '", "id_compte": "' + sessionStorage.getItem('loggedId') + '"}';
      this.http.post(this.root + '/favoris/addFavoris', params, optionRequete).subscribe(data => {
        if (data === 1) {
          console.log('ajout favoris');
        }
      });
    }
  }
}
