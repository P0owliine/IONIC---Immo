import { Component } from '@angular/core';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  connected: string;
  usrInput: any;
  pwdInput: any;

  constructor() {}
  logUser() {
    // On mettra ici le script de connexion, en attendant y a ce qui a ....
    sessionStorage.setItem('loggedUser', this.usrInput);
    this.connected = sessionStorage.getItem('loggedUser');
  }
  checkIfLogged() {
    return sessionStorage.getItem('loggedUser') != null;
  }

}
