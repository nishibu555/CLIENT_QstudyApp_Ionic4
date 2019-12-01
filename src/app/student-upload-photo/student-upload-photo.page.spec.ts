import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StudentUploadPhotoPage } from './student-upload-photo.page';

describe('StudentUploadPhotoPage', () => {
  let component: StudentUploadPhotoPage;
  let fixture: ComponentFixture<StudentUploadPhotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentUploadPhotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StudentUploadPhotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
