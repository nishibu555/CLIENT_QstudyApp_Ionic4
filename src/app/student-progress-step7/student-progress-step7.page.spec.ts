import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentProgressStep7Page } from './student-progress-step7.page';

describe('StudentProgressStep7Page', () => {
  let component: StudentProgressStep7Page;
  let fixture: ComponentFixture<StudentProgressStep7Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProgressStep7Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentProgressStep7Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
