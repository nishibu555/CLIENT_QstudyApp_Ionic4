import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllModuleListPage } from './all-module-list.page';

describe('AllModuleListPage', () => {
  let component: AllModuleListPage;
  let fixture: ComponentFixture<AllModuleListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllModuleListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllModuleListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
