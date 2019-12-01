import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModuleTutorListPage } from './module-tutor-list.page';

describe('ModuleTutorListPage', () => {
  let component: ModuleTutorListPage;
  let fixture: ComponentFixture<ModuleTutorListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleTutorListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleTutorListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
