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
  showingMessage: boolean;
  shownMessage = false;
  messageInput = '';
  messageShown: any;
  messages: any;
  toast: any;

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
  showMessage(message) {
    if (this.showingMessage === false) {
      this.shownMessage = message;
      this.showingMessage = true;
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
      // this.http.post(this.root + '/message/addMessage/')
      this.messageInput = '';
      console.log('Envoi de message...' + 'message envoyé :' + this.messages[this.messages.length - 1]);
    } else {
      // this.toast.present();
    }
  }



  getMessages() {
    this.http.get(this.root + '/message/getMessage/' + sessionStorage.getItem('loggedId'), optionRequete).subscribe(data => {
      this.messages = data;
      console.log(data);
      console.log(data[0].title);
    });
  }
}
