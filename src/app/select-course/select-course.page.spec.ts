import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectCoursePage } from './select-course.page';

describe('SelectCoursePage', () => {
  let component: SelectCoursePage;
  let fixture: ComponentFixture<SelectCoursePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCoursePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectCoursePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
