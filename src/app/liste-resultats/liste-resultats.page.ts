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
  resultsList: any;
  noAnnonce: any;

  constructor(public http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.resultsList = document.getElementById('resultList');
    this.noAnnonce = document.getElementById('noAnnonce');
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
      if (this.results.length === 0) {
        this.noAnnonce.style.display = 'block';
      } else {
        this.resultsList.style.display = 'inline';
      }
    });
  }

  clickAnnonce(id) {
    console.log(id);
  }
}
