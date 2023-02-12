import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(
    public loadingController: LoadingController,
    private navCtrl: NavController
    ) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Please wait...',
      duration: 1500
    });
    await loading.present();
    this.navCtrl.navigateRoot(['/login']);
    console.log('Loading dismissed!');
  }
  ngOnInit() {
  }

}
