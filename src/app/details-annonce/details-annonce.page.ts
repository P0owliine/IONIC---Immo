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
  id_annonce: any;
  id_favoris: any;

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ngOnInit() {
    this.texteAnnonce = document.getElementById('texte-annonce');
    this.id_annonce = this.route.snapshot.paramMap.get('idAnnonce');
    if (this.id_annonce !== null) {
      const url = this.root + '/annonce/getAnnonces/' + this.id_annonce;
      this.getDetails(url);
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
        if (data[i].id === this.id_annonce) {
          this.changeIcon();
          this.id_favoris = data[i].id;
        }
        i++;
      }
    });
  }

  changeIcon() {
    const saveIcon = document.getElementById('save-icon');
    if (saveIcon.getAttribute('name') === 'heart') {
      saveIcon.setAttribute('name', 'heart-empty');
      const data = '{"id_favoris": "' + this.id_favoris + '"}';
      this.http.post(this.root + '/favoris/deleteFavoris', data, optionRequete);
    } else {
      saveIcon.setAttribute('name', 'heart');
      console.log(this.id_annonce + ' ' + sessionStorage.getItem('loggedId'));
      const data = '{"id_annonce": "' + this.id_annonce + '", "id_compte": "' + sessionStorage.getItem('loggedId') + '"}';
      this.http.post(this.root + '/favoris/addFavoris', data, optionRequete);
    }
  }
}
