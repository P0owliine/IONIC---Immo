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


  constructor(public http: HttpClient, private route: ActivatedRoute) {}
  results: [];
  details: any[] = [];
  images: [];

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idAnnonce');
    if (id !== null) {
      const url = 'http://localhost/immo-api/public/annonce/getAnnonces/' + id;
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
      this.images =  this.results.images;
    });
  }

  changeIcon() {
    const saveIcon = document.getElementById('save-icon');
    saveIcon.setAttribute('name', 'heart');
  }
}
