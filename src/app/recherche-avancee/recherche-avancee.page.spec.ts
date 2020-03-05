import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RechercheAvanceePage } from './recherche-avancee.page';

describe('RechercheAvanceePage', () => {
  let component: RechercheAvanceePage;
  let fixture: ComponentFixture<RechercheAvanceePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercheAvanceePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RechercheAvanceePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
