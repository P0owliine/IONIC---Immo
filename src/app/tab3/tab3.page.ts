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
  readonly root = 'http://localhost:8000';
  showingMessage: boolean;
  messageInput = '';
  messageShown: any;
  messages: any;
  toast: any;
  annonces: any;
  constructor(private toastCtrl: ToastController, private http: HttpClient) {
    this.showingMessage = false;
    this.getMessages();
  }
  async settingToast() {
    this.toast = this.toastCtrl.create({
      message: 't kon ou quoi',
      duration: 3000,
      position: 'bottom'
    });
    return await this.toast.present();
  }
  showMessage(message) {
    this.messageShown[0] = message['sender'];
    this.messageShown[1] = message['message'];
    this.showingMessage = true;
    // hide ion-content
    // show ion-list and ion-footer
    // afficher les messages de la BDD
  }
  checkIfLogged() {
    return sessionStorage.getItem('loggedUser') != null;
  }
  sendMessage() {
    if (this.messageInput !== '') {
      this.messages.push(this.messageInput);
      this.messageInput = '';
      console.log('Envoi de message...' + 'message envoyé :' + this.messages[this.messages.length - 1]);
    } else {
      this.toast.present();
    }
  }

  async getMessages() {
    this.http.get(this.root + '/message/getMessage/' + sessionStorage.getItem('loggedId'), optionRequete).subscribe(data => {
      this.messages = data;
      JSON.parse(this.messages);
    });
  }
}
