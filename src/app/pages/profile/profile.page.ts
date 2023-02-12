import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { NavController, LoadingController } from "@ionic/angular"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  datastorage: any;
  name: string;
  email: string;

  constructor(
    private storage: Storage,
    public navCtrl: NavController,
    public loadCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.storage.get('storage_xxx').then((res)=>{
      console.log(res);
      this.datastorage =  res;
      this.name = this.datastorage.username;
      this.email = this.datastorage.email;
    });
  }
  async presentLoading() {
    const load = await this.loadCtrl.create({
      duration: 1000,
      message: 'Verifying...'
    })
    await load.present();
    this.navCtrl.navigateRoot("account")
  }

  changePass(){
    this.presentLoading();
  }

}
