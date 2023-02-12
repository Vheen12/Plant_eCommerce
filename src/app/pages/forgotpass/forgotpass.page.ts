import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.page.html',
  styleUrls: ['./forgotpass.page.scss'],
})
export class ForgotpassPage implements OnInit {
  email: string = "";
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private accessProvider: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController
  ) { }


  async tryLogin(){
    if(this.email == ""){
      this.presentToast('Email Required','danger')
    }else{
      const loader = await this.loadingCtrl.create({
        message: 'Checking Email Please Wait'
      });

      loader.present();

        return new Promise(resolve =>{
          let body = {
            action: 'change_pass',
            email: this.email
          }

          this.accessProvider.postData(body, 'process_api.php').subscribe((res:any) =>{
            if(res.success == true){
              loader.dismiss();
              this.presentToast(res.msg,'danger');
            }
            else{
              loader.dismiss();
              this.presentToast(res.msg,'success');
              this.storage.set('email_storage',res.result);
              this.navCtrl.navigateRoot('forgotpass-verify')
            }
          }, (err)=>{
              loader.dismiss();
              this.presentToast('Connection Timeout!','danger');
          }
          );
        });
    }
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
  }

}
