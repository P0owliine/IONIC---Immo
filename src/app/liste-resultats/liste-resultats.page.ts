import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

const optionRequete = {
  headers : new HttpHeaders({'Access-Control-Allow-Origin': '*'})
};

@Component({
  selector: 'app-liste-resultats',
  templateUrl: './liste-resultats.page.html',
  styleUrls: ['./liste-resultats.page.scss'],
})
export class ListeResultatsPage {
  results: any;
  id = sessionStorage.getItem('clicked_region');
  url = 'http://localhost/immo-api/public/annonce/getAnnoncesByRegion/' + this.id;

  constructor(public http: HttpClient) {
    console.log(this.id);
    this.getAnnonces();
  }

  public getAnnonces(): void {
    let data: Observable<any>;
    data = this.http.get(this.url, optionRequete);
    data.subscribe(resultat => {
      this.results = resultat;
      console.log(this.results);
    });
  }
}
