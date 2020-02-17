import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailsAnnoncePage } from './details-annonce.page';

describe('DetailsAnnoncePage', () => {
  let component: DetailsAnnoncePage;
  let fixture: ComponentFixture<DetailsAnnoncePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsAnnoncePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailsAnnoncePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
