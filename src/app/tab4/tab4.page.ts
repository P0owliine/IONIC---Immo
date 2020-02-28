import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {log} from 'util';
import {Observable} from 'rxjs';
import {forEach} from "@angular-devkit/schematics";

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
  announces: any [];

  constructor(private http: HttpClient) {}
  logUser() {
    console.log('Log button clicked');
    this.data = '{"username": ' + this.usrInput + ', "password": ' + this.pwdInput + '}';
    if (this.http.post(this.root + '/compte/login', this.data, optionRequete)) {
      sessionStorage.setItem('loggedUser', this.usrInput);
      this.http.get(this.root + '/compte/getCompteByUsername/Popo', optionRequete).subscribe(result => {
        this.userJson = result;
        this.userId = this.userJson[0].id;
        sessionStorage.setItem('loggedId', this.userId);
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
  this.http.get(this.root + '/annonce/getAnnoncesByCompte/' + id, optionRequete).subscribe(data => {
    this.announces = data;
    }, err => {
      console.log(err);
    });
  }
}
