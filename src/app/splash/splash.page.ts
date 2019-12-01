import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(
    private storage: Storage,
    public router: Router,
  ) { }

  ngOnInit() {
    this.storage.get('qstudy_user').then(val => {
      if (val != null) {
        this.router.navigateByUrl("home");
      } else {
        this.router.navigateByUrl("login");
      }
    })
  }

}
