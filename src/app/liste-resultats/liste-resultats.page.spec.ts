import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListeResultatsPage } from './liste-resultats.page';

describe('ListeResultatsPage', () => {
  let component: ListeResultatsPage;
  let fixture: ComponentFixture<ListeResultatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeResultatsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListeResultatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
