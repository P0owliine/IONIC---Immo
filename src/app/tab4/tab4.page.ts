import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {log} from 'util';

const optionRequete = {
  headers : new HttpHeaders({'Access-Control-Allow-Origin': '*'})
};

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page {
  readonly root = 'http://localhost';
  posts: any;
  connected: string;
  usrInput: any;
  pwdInput: any;

  constructor(private http: HttpClient) {
    this.testAPI();
  }

  logUser() {
    console.log('Log button clicked');
    // On mettra ici le script de connexion, en attendant y a ce qui a .... /**/
    sessionStorage.setItem('loggedUser', this.usrInput);
    this.connected = sessionStorage.getItem('loggedUser');
  }
  checkIfLogged() {
    return sessionStorage.getItem('loggedUser') != null;
  }
  testAPI() {
    this.http.get(this.root + '/immo-api/public/compte/getCompte/4', optionRequete).subscribe(data => {
      this.posts = data;
      console.log(data[0].username);
    }, err => {
      console.log(err);
    });
  }
}
