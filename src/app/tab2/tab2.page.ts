import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {isEmpty} from "rxjs/operators";


const optionRequete = {
    headers : new HttpHeaders({'Access-Control-Allow-Origin': '*'})
};

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
    readonly root = 'http://localhost/immo-api/public';
    favoris: any ;
    img: any;

  constructor(private http: HttpClient) {
      this.getFavoris();
  }
    getFavoris() {
      this.favoris = '';
      this.img = '';
      this.http.get(this.root + '/favoris/getFavoris/5', optionRequete).subscribe(data => {
        this.favoris = data;
        if (this.favoris.length === 0) {
              this.img = '/assets/icon/favoris.PNG';
          }
        }, err => {
            console.log(err);
        });

    }

}

