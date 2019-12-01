import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewprogressPage } from './viewprogress.page';

describe('ViewprogressPage', () => {
  let component: ViewprogressPage;
  let fixture: ComponentFixture<ViewprogressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewprogressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewprogressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
