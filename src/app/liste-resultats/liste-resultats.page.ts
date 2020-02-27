import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
  constructor(public http: HttpClient) {}

  getResults(event) {

    setTimeout(() => {
      console.log('Done');
      event.target.complete();
      return new Promise(resolve => {
        this.http.get('http://localhost/immo-api/public/resultats/getResultats/5', optionRequete).subscribe(data => {
          this.results = data;
          if (this.results.length === 1000) {
            event.target.disabled = true;
          }
          console.log(data);
        }, err => {
          console.log(err);
        });
      });
    }, 500);
  }
}
