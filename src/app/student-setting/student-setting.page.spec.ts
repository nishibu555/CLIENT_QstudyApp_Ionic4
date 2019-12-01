import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentSettingPage } from './student-setting.page';

describe('StudentSettingPage', () => {
  let component: StudentSettingPage;
  let fixture: ComponentFixture<StudentSettingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentSettingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentSettingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
