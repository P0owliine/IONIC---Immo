import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';

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

  constructor(public http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('idRegion');
    console.log(id);
    if (id !== null) {
      const url = 'http://localhost/immo-api/public/annonce/getAnnoncesByRegion/' + id;
      this.getAnnonces(url);
    } else {
      window.location.href = '../tab1/';
    }
  }

  public getAnnonces(url): void {
    let data: Observable<any>;
    data = this.http.get(url, optionRequete);
    data.subscribe(resultat => {
      this.results = resultat;
      console.log(this.results);
      if (this.results.length === 0) {
        const results = document.getElementById('results');
        results.innerHTML = 'Aucune annonce';
      }
    });
  }

  clickAnnonce(id) {
    console.log(id);
  }
}
