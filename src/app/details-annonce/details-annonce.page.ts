import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-annonce',
  templateUrl: './details-annonce.page.html',
  styleUrls: ['./details-annonce.page.scss'],
})
export class DetailsAnnoncePage implements OnInit {

  constructor() { }
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  ngOnInit() {
  }

}
