import { Component } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {log} from 'util';
import {Observable} from 'rxjs';
import {forEach} from '@angular-devkit/schematics';
import { ToastController } from '@ionic/angular';

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
  connected: string;
  userJson: any;
  usrInput: any;
  pwdInput: any;
  data: any;
  userId: any;
  announces: any;
  toast: any;

  constructor(private toastCtrl: ToastController, private http: HttpClient) {
    this.settingToast();
  }
  async settingToast() {
    this.toast = this.toastCtrl.create({
      message: 'Et non',
      duration: 3000,
      position: 'bottom'
    });
    return await this.toast.present();
  }
  logUser() {
    console.log('Log button clicked');
    this.data = '{"username": "' + this.usrInput + '", "password": "' + this.pwdInput + '"}';
    // tslint:disable-next-line:only-arrow-functions
    this.http.post(this.root + '/compte/login', this.data, optionRequete).subscribe(data => {
      if (data === 1) {
        sessionStorage.setItem('loggedUser', this.usrInput);
        this.http.get(this.root + '/compte/getCompteByUsername/' + this.usrInput, optionRequete).subscribe(result => {
        this.userJson = result;
        this.userId = this.userJson[0].id;
        sessionStorage.setItem('loggedId', this.userId);
        this.getAnnonces(this.userId);
        });
        this.connected = sessionStorage.getItem('loggedUser');
      } else {
        console.log('connexion échouée');
        this.toast.present();
      }
    });
  }
  checkIfLogged() {
    if (sessionStorage.getItem('loggedUser') != null) {
      return true;
    } else { return false; }
  }

  getAnnonces(id) {
    this.http.get(this.root + '/annonce/getAnnoncesByCompte/' + id, optionRequete).subscribe(data => {
      this.announces = data;
    }, err => {
      console.log(err);
    });
  }
}
