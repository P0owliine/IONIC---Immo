import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AlertController } from '@ionic/angular';


registerLocaleData(localeFr, 'fr');


const optionRequete = {
  headers : new HttpHeaders({'Access-Control-Allow-Origin': '*'})
};

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.page.html',
  styleUrls: ['./details-annonce.page.scss'],
})
export class DetailsAnnoncePage implements OnInit {

  constructor(public http: HttpClient, private route: ActivatedRoute, private alertCtrl: AlertController) {
    this.verifFavoris();

  }

  readonly root = 'http://localhost/immo-api/public';
  results: [];
  details: any[] = [];
  texteAnnonce: any;
  images: [];
  favoris: any;
  img: any;
  idAnnonce: any;
  idFavoris: any;
  saveIcon: any;
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  ngOnInit() {
    this.texteAnnonce = document.getElementById('texte-annonce');
    this.idAnnonce = this.route.snapshot.paramMap.get('idAnnonce');
    if (this.idAnnonce !== null) {
      const url = this.root + '/annonce/getAnnonces/' + this.idAnnonce;
      this.getDetails(url);
      this.saveIcon = document.getElementById('save-icon');
      this.saveIcon.setAttribute('name', 'heart-empty');
    } else {
      window.location.href = '../tabs/tab1/';
    }
  }

  public getDetails(url): void {
    let data: Observable<any>;
    data = this.http.get(url, optionRequete);
    data.subscribe(resultat => {
      this.results = resultat;
      // @ts-ignore
      this.details = this.results[0];
      // @ts-ignore
      this.images = this.results.images;
      if (this.results !== []) {
        this.texteAnnonce.style.display = 'inline';
      }
    });
  }

  processForm(event) {
    event.preventDefault();

  }

  verifFavoris() {
    let i = 0;
    this.favoris = '';
    this.img = '';
    this.http.get(this.root + '/favoris/getFavoris/' + sessionStorage.getItem('loggedId'), optionRequete).subscribe(data => {
      this.favoris = data;
      while (i < this.favoris.length) {
        if (data[i].id === this.idAnnonce) {
          this.saveIcon.setAttribute('name', 'heart');
          this.idFavoris = data[i].id_favoris;
        }
        i++;
      }
    });
  }

  changeIcon() {
    if (this.saveIcon.getAttribute('name') === 'heart') {
      this.saveIcon.setAttribute('name', 'heart-empty');
      const params = '{"id_favoris": "' + this.idFavoris + '"}';
      this.http.post(this.root + '/favoris/deleteFavoris', params, optionRequete).subscribe(data => {
        if (data === 1) {
          console.log('suppression favoris');
        }
      });
    } else {
      this.saveIcon.setAttribute('name', 'heart');
      const params = '{"id_annonce": "' + this.idAnnonce + '", "id_compte": "' + sessionStorage.getItem('loggedId') + '"}';
      this.http.post(this.root + '/favoris/addFavoris', params, optionRequete).subscribe(data => {
        if (data === 1) {
          console.log('ajout favoris');
        }
      });
    }
  }
  async showPrompt() {
    const alert = await this.alertCtrl.create({

      inputs: [
        {
          name: 'message',
          placeholder: 'Ecrivez ici...'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Envoyer',
          handler: data => {
            const params = '{"message": "' + data
                + '", "id_annonce": "' + this.idAnnonce
                + '", "id_sender": "' + sessionStorage.getItem('loggedId') + '"}';
            this.http.post(this.root + '/message/addMessage', params, optionRequete).subscribe(data => {
              console.log('Response from API :' + data);
            });
          }
        }
      ]
    });
    await alert.present();
  }
}
