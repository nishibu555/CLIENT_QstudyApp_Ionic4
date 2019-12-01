import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentProgressStep3Page } from './student-progress-step3.page';

describe('StudentProgressStep3Page', () => {
  let component: StudentProgressStep3Page;
  let fixture: ComponentFixture<StudentProgressStep3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProgressStep3Page ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentProgressStep3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
