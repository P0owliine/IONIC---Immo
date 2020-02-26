import { Component } from '@angular/core';

@Component({
  selector: 'app-liste-resultats',
  templateUrl: './liste-resultats.page.html',
  styleUrls: ['./liste-resultats.page.scss'],
})
export class ListeResultatsPage {

  items = [];
  nbScrolls = 4;

  constructor() {
    this.addMoreItems();
  }

  loadData(event) {
    setTimeout(() => {
      console.log('Done');
      this.addMoreItems();
      this.nbScrolls -= 1;
      event.target.complete();
    }, 500);
  }

  addMoreItems() {
    for (let i = 0; i < 10; i++) {
      this.items.push(i);
    }
  }

}
