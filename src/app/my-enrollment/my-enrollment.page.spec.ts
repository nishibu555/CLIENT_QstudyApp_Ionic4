import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyEnrollmentPage } from './my-enrollment.page';

describe('MyEnrollmentPage', () => {
  let component: MyEnrollmentPage;
  let fixture: ComponentFixture<MyEnrollmentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyEnrollmentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyEnrollmentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
