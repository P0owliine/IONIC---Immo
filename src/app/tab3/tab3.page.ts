import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
readonly root = 'http://localhost:8000';
messageInput = '';
messages = [];
toast: any;
annonces: any;
  constructor(private toastCtrl: ToastController, private http: HttpClient) {}
  async settingToast() {
    this.toast = this.toastCtrl.create({
      message: 't kon ou quoi',
      duration: 3000,
      position: 'bottom'
    });
    return await this.toast.present();
  }
  showMessage() {
    alert('afficher la partie de samy');
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

  async getAnnonces() {
    this.http.get(this.root + '/getAnnoncesByCompte/' + sessionStorage.getItem('loggedId'), optionRequete).subscribe(data => {
      // @ts-ignore
      JSON.parse(data);
      this.annonces = data;
    });
  }
}
