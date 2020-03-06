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
    // connexion
    connected: string;
    userJson: any;
    usrInput: any;
    pwdInput: any;
    data: any;
    userId: any;


    constructor(private http: HttpClient) {
      if (this.checkIfLogged()) {
          this.getFavoris();
      }
  }
    checkIfLogged() {
        return sessionStorage.getItem('loggedId') != null;
    }
    getFavoris() {
      this.favoris = '';
      this.img = '';
      this.http.get(this.root + '/favoris/getFavoris/' + sessionStorage.getItem('loggedId'), optionRequete).subscribe(data => {
        this.favoris = data;
        if (this.favoris.length === 0) {
              this.img = '/assets/icon/favoris.PNG';
          }
        }, err => {
            console.log(err);
        });

    }

    logUser() {
        console.log('Log button clicked');
        this.data = '{"username": "' + this.usrInput + '", "password": "' + this.pwdInput + '"}';
        this.http.post(this.root + '/compte/login', this.data, optionRequete).subscribe(data => {
            if (data === 1) {
                sessionStorage.setItem('loggedUser', this.usrInput);
                this.http.get(this.root + '/compte/getCompteByUsername/' + this.usrInput, optionRequete).subscribe(result => {
                    this.userJson = result;
                    this.userId = this.userJson[0].id;
                    sessionStorage.setItem('loggedId', this.userId);
                    this.getFavoris();
                });
                this.connected = sessionStorage.getItem('loggedUser');
            } else {
                console.log('connexion échouée');
            }
        });
    }
}

