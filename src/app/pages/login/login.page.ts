import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{

  email: string = "";
  password: string = "";
  disabledButton: boolean;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private accessProvider: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController
  ) {
  }

  ionViewDidEnter(){
    this.disabledButton = false;
  }

  toggleShow(){
    let x : any = document.getElementById("inputPassword");
    let y : any = document.getElementById("iconchange");
    if(x.type == 'password' && y.name == 'eye-off'){
      x.type = "text"
      y.name = "eye"
    }else{
      x.type = "password"
      y.name = "eye-off"
    }
  }

  openRegister(){
    this.router.navigate(['/register']);
  }

  openForgotPassword(){
    this.router.navigate(['/forgotpass']);
  }

  async presentToast(a,b){
    const toast = await this.toastCtrl.create({
      message:a,
      duration: 1500,
      color: b
    });
    toast.present();
  }

  async tryLogin(){
    if(this.email == ""){
      this.presentToast('Email Required','danger')
    }else if(this.password == ""){
      this.presentToast('Password Required','danger')
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please Wait.....',
      });

      loader.present();

        return new Promise(resolve =>{
          let body = {
            action: 'process_login',
            email: this.email,
            password: this.password
          }

          this.accessProvider.postData(body, 'process_api.php').subscribe((res:any) =>{
            if(res.success == true){
              loader.dismiss();
              this.disabledButton = false;
              this.storage.set('storage_xxx',res.result); // create storage session
              this.navCtrl.navigateRoot(['/tabs']);
              this.presentToast('Logged in Successfully','success');
            }
            else{
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Email or password is incorrect!','danger');
            }
          }, (err)=>{
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast('Connection Timeout!','danger');
          }
          );
        });
    }
  }
}
