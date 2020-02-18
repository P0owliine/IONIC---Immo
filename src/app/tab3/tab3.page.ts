import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
messageInput = '';
messages = [];
toast: any;
  constructor(private toastCtrl: ToastController) {}
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
  sendMessage() {
    if (this.messageInput !== '') {
      this.messages.push(this.messageInput);
      this.messageInput = '';
      console.log('Envoi de message...' + 'message envoyé :' + this.messages[this.messages.length - 1]);
    } else {
      this.toast.present();
    }
  }
}
