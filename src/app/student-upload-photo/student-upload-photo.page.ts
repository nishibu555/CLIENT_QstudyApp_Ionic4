import { Component, OnInit } from '@angular/core';
import { ActionSheetController, LoadingController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { QustadyService } from '../service/qustady.service';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-upload-photo',
  templateUrl: './student-upload-photo.page.html',
  styleUrls: ['./student-upload-photo.page.scss'],
})
export class StudentUploadPhotoPage implements OnInit {
  id: '';
  base64img:string='';
  constructor(
    public actionSheetCtrl:ActionSheetController,
    public camera: Camera,
    private storage:Storage, 
    private serv:QustadyService,
    private router:Router
    ) { }

  ngOnInit() {
  }


  ionViewWillEnter(){
    this.storage.get('qstudy_user').then(res=>{
        this.id=res.id;
    })
  }
  saveImage(){
    const data={
      action:'update_student_image',
      id:this.id,
      image:this.base64img
    }
    this.serv.commonFunctionCall(data).subscribe(res=>{
      this.router.navigateByUrl('/student-setting');
    })
  }

  async openActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image',
      buttons: [{
        text: 'Open Gallery',
        icon: 'image',
        handler: () => {
          this.openGallery();
        }
      }, {
        text: 'Take Picture',
        icon: 'camera',
        handler: () => {
          this.openCamera();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          
        }
      }]
    });
    await actionSheet.present();
  }

  openCamera(){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      encodingType:this.camera.EncodingType.JPEG,
      mediaType:this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((ImageData=>{
      this.base64img="data:image/jpeg;base64,"+ImageData;
      console.log("From camera",this.base64img);
    }),error=>{
     console.log(error);
    })
  }

  openGallery(){
    const options:CameraOptions={
      quality:70,
      destinationType:this.camera.DestinationType.DATA_URL,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum:false
    }

    this.camera.getPicture(options).then((ImageData=>{
      this.base64img="data:image/jpeg;base64,"+ImageData;
      console.log("From Gallery",this.base64img);
    }),error=>{
      console.log(error);
    })
  }


}
