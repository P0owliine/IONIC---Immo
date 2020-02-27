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
 favoris: any;
  constructor(public http: HttpClient) {
      this.getFavoris();
  }
    getFavoris() {
        return new Promise(resolve => {
            this.http.get('http://localhost/immo-api/public/favoris/getFavoris/5', optionRequete).subscribe(data => {
                this.favoris = data;
                console.log(data);
            }, err => {
                console.log(err);
            });
        });
    }

}

