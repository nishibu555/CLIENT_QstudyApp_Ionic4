import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowResultPage } from './show-result.page';

describe('ShowResultPage', () => {
  let component: ShowResultPage;
  let fixture: ComponentFixture<ShowResultPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResultPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowResultPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
