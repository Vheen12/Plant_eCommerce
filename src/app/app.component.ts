import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  datastorage: any;
  email: any;
  username: any;
  constructor(
    private storage: Storage,
    public loadCtrl: LoadingController,
    private toastCtrl: ToastController,
    public navCtrl: NavController
  ) {
    this.initializeApp();
  }

  initializeApp(){
    this.storage.get('storage_xxx').then((res)=>{
      if(res == null){
        this.navCtrl.navigateRoot('slides/login');
      } else{
        this.navCtrl.navigateRoot('tabs/home');
      }
    });
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage = res;
      this.username = this.datastorage.username;
    });
  }

  async processLogout(){
    this.storage.clear();
    this.presentLoading();
    this.navCtrl.navigateRoot('login');
  }

  async presentLoading() {
    const loading = await this.loadCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Logging out',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }

}
