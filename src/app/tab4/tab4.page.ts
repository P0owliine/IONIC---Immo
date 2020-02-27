import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {log} from 'util';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  readonly root = 'http://localhost:8000';
  posts: any;
  connected: string;
  usrInput: any;
  pwdInput: any;

  constructor(private http: HttpClient) {}

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
    this.posts = this.http.get(this.root + '/compte/getCompte/1');
    console.log('This is what I got !' + this.posts.toString());
  }

}
