import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {
  username: string = "";
  gender: string = "";
  email: string = "";
  password: string = "";
  confirm_pass: string = "";
  disabledButton: boolean;

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private accessProvider: AccessProviders
  ) { }

  // Add Data

  async addUser(){
    if(this.username == ""){
      this.presentToast('Username Required','danger')
    }else if(this.gender == ""){
      this.presentToast('Gender Required','danger')
    }else if(this.email == ""){
      this.presentToast('Email Required','danger')
    }else if(this.password == ""){
      this.presentToast('Password Required','danger')
    }else if(this.confirm_pass != this.password){
      this.presentToast('Password do not matched!','danger')
    }else{
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Please Wait.....',
      });

      loader.present();

        return new Promise(resolve =>{
          let body = {
            action: 'process_register',
            username: this.username,
            gender: this.gender,
            email: this.email,
            password: this.password
          }

          this.accessProvider.postData(body, 'process_api.php').subscribe((res:any) =>{
            if(res.success == true){
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg,'success');
              this.router.navigate(['/login']);
            }
            else{
              loader.dismiss();
              this.disabledButton = false;
              this.presentToast(res.msg,'danger');
              console.log(res.result);
            }
          }, (err)=>{
              loader.dismiss();
              this.disabledButton = false;
              this.presentAlert('Connection Timeout!');
          }
          );
        });
    }
  }

  //  Methods

  toggleShow(){
    let x : any = document.getElementById("showPassword");
    let y : any = document.getElementById("showPassword2");
    if(x.type == 'password' && y.type == 'password'){
      x.type = "text"
      y.type = "text"
    }else{
      x.type = "password"
      y.type = "password"
    }
  }

  async presentToast(a,b){
    const toast = await this.toastCtrl.create({
      message:a,
      duration: 1500,
      position: 'bottom',
      color: b
    });
    toast.present();
  }

  async presentAlert(a){
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [{
        text: 'Close',
        handler: (close)=>{
          console.log('Confirm Cancel: close');
          //action
        }
      },{
        text: 'Try Again',
        handler: ()=>{
          this.addUser();
        }
      }]
    });
    await alert.present();
  }

  ionViewDidEnter(){
    this.disabledButton = false;
  }

  ngOnInit() {
  }

}
