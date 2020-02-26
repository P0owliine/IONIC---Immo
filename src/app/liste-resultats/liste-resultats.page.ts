import { Component } from '@angular/core';

@Component({
  selector: 'app-liste-resultats',
  templateUrl: './liste-resultats.page.html',
  styleUrls: ['./liste-resultats.page.scss'],
})
export class ListeResultatsPage {

  items = [];

  constructor() {
    this.addMoreItems();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.addMoreItems();
      event.target.complete();
    }, 500);
  }

  addMoreItems() {
    for (let i = 0; i < 10; i++) {
      this.items.push(i);
    }
  }

}
