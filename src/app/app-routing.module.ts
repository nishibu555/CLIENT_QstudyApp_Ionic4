import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full'
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'personal',
    loadChildren: () => import('./personal/personal.module').then(m => m.PersonalPageModule)
  },
  {
    path: 'viewprogress/:id',
    loadChildren: () => import('./viewprogress/viewprogress.module').then(m => m.ViewprogressPageModule)
  },
  {
    path: 'course',
    loadChildren: () => import('./course/course.module').then(m => m.CoursePageModule)
  },
  {
    path: 'student-setting',
    loadChildren: () => import('./student-setting/student-setting.module').then(m => m.StudentSettingPageModule)
  },
  {
    path: 'student-details',
    loadChildren: () => import('./student-details/student-details.module').then(m => m.StudentDetailsPageModule)
  },
  {
    path: 'student-upload-photo',
    loadChildren: () => import('./student-upload-photo/student-upload-photo.module').then(m => m.StudentUploadPhotoPageModule)
  },
  {
    path: 'my-enrollment',
    loadChildren: () => import('./my-enrollment/my-enrollment.module').then(m => m.MyEnrollmentPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register/:registrationType',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'registerparent',
    loadChildren: () => import('./registerparent/registerparent.module').then(m => m.RegisterparentPageModule)
  },
  {
    path: 'select-country',
    loadChildren: () => import('./select-country/select-country.module').then(m => m.SelectCountryPageModule)
  },
  {
    path: 'select-course',
    loadChildren: () => import('./select-course/select-course.module').then(m => m.SelectCoursePageModule)
  },
  {
    path: 'student-form',
    loadChildren: () => import('./student-form/student-form.module').then(m => m.StudentFormPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'student-progress-step',
    loadChildren: () => import('./student-progress-step/student-progress-step.module').then(m => m.StudentProgressStepPageModule)
  },
  //for qstudy(7)
  {
    path: 'student-progress-step/:userType',
    loadChildren: () => import('./student-progress-step7/student-progress-step7.module').then( m => m.StudentProgressStep7PageModule)
  },
  //for tutor(3)
  {
    path: 'student-progress-step/:userType',
    loadChildren: () => import('./student-progress-step3/student-progress-step3.module').then( m => m.StudentProgressStep3PageModule)
  },
  {
    path: 'module-types',
    loadChildren: () => import('./student-course/student-course.module').then( m => m.StudentCoursePageModule)
  },
  {
    path: 'module/tutor-list/:moduleType',
    loadChildren: () => import('./module-tutor-list/module-tutor-list.module').then( m => m.ModuleTutorListPageModule)
  },
  {
    path: 'all_tutors_by_type/:tutorId/:moduleType',
    loadChildren: () => import('./all-module-list/all-module-list.module').then( m => m.AllModuleListPageModule)
  },
  {
    path: 'get_tutor_tutorial_module/:moduleId',
    loadChildren: () => import('./question-answer/question-answer.module').then( m => m.QuestionAnswerPageModule)
  },
  {
    path: 'show-result/:moduleId',
    loadChildren: () => import('./show-result/show-result.module').then( m => m.ShowResultPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
