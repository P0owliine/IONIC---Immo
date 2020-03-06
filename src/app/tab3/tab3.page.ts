import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {forEach} from '@angular-devkit/schematics';
const optionRequete = {
  headers : new HttpHeaders({'Access-Control-Allow-Origin': '*'})
};

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  readonly root = 'http://localhost/immo-api/public';
  showingMessage = false;
  shownMessage = 'yolo';
  messageInput = '';
  messageShown: any;
  messages: any;
  detailMessage: any;
  toast: any;
  idAnnonce: any;

  constructor(private toastCtrl: ToastController, private http: HttpClient) {
    if (this.checkIfLogged()) {
      this.getMessages();
    }
  }
  async settingToast() {
    this.toast = this.toastCtrl.create({
      message: 'Bad input',
      duration: 3000,
      position: 'bottom'
    });
    return await this.toast.present();
  }
  getMessages() {
    this.http.get(this.root + '/message/getMessage/' + sessionStorage.getItem('loggedId'), optionRequete).subscribe(data => {
      this.messages = data;
    });
  }
  showMessage(idAnnonce) {
    if (this.showingMessage === false) {
      this.showingMessage = true;
      this.http.get(this.root + '/message/getDetailMessage/' + sessionStorage.getItem('loggedId'), optionRequete).subscribe(data => {
        this.detailMessage = data;
        console.log(data);
        this.idAnnonce = idAnnonce;
        console.log(this.idAnnonce);
      });
    } else {
      this.showingMessage = false;
    }
  }

  checkIfLogged() {
    return sessionStorage.getItem('loggedId') != null;
  }
  sendMessage() {
    if (this.messageInput !== '') {
      this.messages.push(this.messageInput);
      const params = '{"id_annonce": "' + this.idAnnonce
                    + '", "id_sender": "' + sessionStorage.getItem('loggedId')
                    + '", "message": "' + this.messageInput + '"}';
      console.log(params);
      this.http.post(this.root + '/message/addMessage', params, optionRequete).subscribe(data => {
        if (data === 1) {
          console.log('ajout message');
          this.showMessage(this.messages);
          this.messageInput = '';
        }
      });
    } else {
      // this.toast.present();
    }
  }
  verifTitle() {
    if (this.showingMessage === true) {
      return true;
    } else {
      return false;
    }
  }


}
