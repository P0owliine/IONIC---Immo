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
  readonly root = 'http://localhost:8000';
  posts: any;
  connected: string;
  userJson: any;
  usrInput: any;
  pwdInput: any;
  data: any;

  constructor(private http: HttpClient) {
    this.testAPI();
  }

  logUser() {
    console.log('Log button clicked');
    this.data = '{"username": ' + this.usrInput + ', "password": ' + this.pwdInput + '}';
    if (this.http.post(this.root + '/compte/login', this.data, optionRequete)) {
      sessionStorage.setItem('loggedUser', this.usrInput);
      this.http.get(this.root + '/compte/getIdByUsername', optionRequete).subscribe(data => this.userJson = data);
      JSON.parse(this.userJson);
      sessionStorage.setItem('loggedId', this.userJson['id']);
      this.connected = sessionStorage.getItem('loggedUser');
    } else {
      console.log('nope');
    }
  }
  checkIfLogged() {
    return sessionStorage.getItem('loggedUser') != null;
  }
  testAPI() {
    this.http.get(this.root + '/compte/getCompte/4', optionRequete).subscribe(data => {
      this.posts = data;
      console.log(data[0].username);
    }, err => {
      console.log(err);
    });
  }
}
