import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentProgressStepPage } from './student-progress-step.page';

describe('StudentProgressStepPage', () => {
  let component: StudentProgressStepPage;
  let fixture: ComponentFixture<StudentProgressStepPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProgressStepPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentProgressStepPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
