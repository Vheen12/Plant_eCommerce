import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {  NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpass-verify',
  templateUrl: './forgotpass-verify.page.html',
  styleUrls: ['./forgotpass-verify.page.scss'],
})
export class ForgotpassVerifyPage implements OnInit {
  datastorage: any;
  email: any;
  newPass: string="";
  confirmPass: string="";
  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public toastCtrl: ToastController
  ) { }

  async confirmPassChange(){
    this.presentToast('password change','success');
    this.storage.clear();
    this.navCtrl.navigateRoot('login');
  }

  async presentToast(a,b){
    const toast = await this.toastCtrl.create({
      message:a,
      duration: 1500,
      color: b
    });
    toast.present();
  }

  ngOnInit() {
    this.storage.get('email_storage')
    this.storage.get('email_storage').then((res)=>{
      console.log(res);
      this.datastorage =  res;
      this.email = this.datastorage.email;
    });
  }

}
