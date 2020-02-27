import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const optionRequete = {
    headers : new HttpHeaders({'Access-Control-Allow-Origin': '*'})
};

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
    readonly root = 'http://localhost';
    favoris: any;

  constructor(private http: HttpClient) {
      this.getFavoris();
  }
    getFavoris() {
        this.http.get(this.root + '/immo-api/public/favoris/getFavoris/5', optionRequete).subscribe(data => {
            this.favoris = data[0];
            console.log(data[0]);
        }, err => {
            console.log(err);
        });
    }

}

