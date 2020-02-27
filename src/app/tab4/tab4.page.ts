import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {log} from 'util';
import {Observable} from 'rxjs';

const optionRequete = {
  headers : new HttpHeaders({'Access-Control-Allow-Origin': '*'})
};

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})

export class Tab4Page {
  readonly root = 'http://localhost/immo-api/public';
  posts: any;
  connected: string;
  userJson: any;
  usrInput: any;
  pwdInput: any;
  data: any;
  userId: any;
  annonces: [];

  constructor(private http: HttpClient) {}
  logUser() {
    console.log('Log button clicked');
    this.data = '{"username": ' + this.usrInput + ', "password": ' + this.pwdInput + '}';
    if (this.http.post(this.root + '/compte/login', this.data, optionRequete)) {
      sessionStorage.setItem('loggedUser', this.usrInput);
      this.http.get('http://localhost/immo-api/public/compte/getCompteByUsername/Popo', optionRequete).subscribe(result => {
        this.userJson = result;
        this.userId = this.userJson[0].id;
        sessionStorage.setItem('loggedId', this.userId);
        console.log(sessionStorage.getItem('loggedId'));
        this.testAPI(this.userId);
      });
      this.connected = sessionStorage.getItem('loggedUser');
    } else {
      console.log('nope');
    }
  }
  checkIfLogged() {
    if (sessionStorage.getItem('loggedUser') != null) {
      return true;
    } else { return false; }
  }
  testAPI(id) {
  console.log(id);
  this.http.get(this.root + '/annonce/getAnnoncesByCompte/' + id, optionRequete).subscribe(data => {
    console.log(data[0].id + data[0].title);
    this.annonces = [
      { id: data[0].id, title: data[0].title }
    ];
    console.log(this.annonces);
    }, err => {
      console.log(err);
    });
  }
}
