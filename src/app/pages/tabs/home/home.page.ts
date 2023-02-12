import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from '../../../providers/access-providers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  datastorage: any;
  username: any;
  name:string;
  price: string;
  category: string;
  img: string;
  description: string;
  limit: number = 5;
  start: number = 0;

  plants: any = [];
  popularItems: any = [];
  featuredItems: any = [];

  slideOpts = {
    slidesPerView: 1.8,
  };
  slideOpts1 = {
    slidesPerView: 1.8,
  };

  constructor(
    private accessProvider: AccessProviders,
    private loadingCtrl: LoadingController,
    private router: Router,
    private storage: Storage,
    public navCtrl: NavController
    ) { }

    //  Loading Data

  loadPlants(){
    return new Promise(resolve =>{
      let body = {
        action: 'load_plants',
        start: this.start,
        limit: this.limit
      }

        this.accessProvider.postData(body, 'process_api.php').subscribe((res:any) =>{
          for(let datas of res.result){
            this.plants.push(datas)
          }
          resolve(true);
        });
    });
  }

  loadFeaturedPlants(){
    return new Promise(resolve =>{
      let body = {
        action: 'load_featured_plants',
        start: this.start,
        limit: this.limit
      }

        this.accessProvider.postData(body, 'process_api.php').subscribe((res:any) =>{
          for(let datas of res.result){
              this.featuredItems.push(datas)
          }
          resolve(true);
        });
    });
  }

  loadPopPlants(){
    return new Promise(resolve =>{
      let body = {
        action: 'load_popular_plants',
        start: this.start,
        limit: this.limit
      }

        this.accessProvider.postData(body, 'process_api.php').subscribe((res:any) =>{
          for(let datas of res.result){
              this.popularItems.push(datas)
          }
          resolve(true);
        });
    });
  }

  //  Methods

  openPlants(item){
    this.storage.set('plant_category',item)
    this.router.navigate(['/all-items']);
  }

  async doRefresh(event){
    const loader = await this.loadingCtrl.create({
      message: 'Refreshing Content...',
      duration: 3000
    });
    await loader.present();

    this.ionViewDidEnter();
    event.target.complete();

    loader.dismiss();
  }

  ionViewDidEnter(){
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage =  res;
      this.username = this.datastorage.username;
      this.name = this.datastorage.name;
      this.price = this.datastorage.price;
      this.category = this.datastorage.category;
      this.img = this.datastorage.img;
      this.description = this.datastorage.description;
    });
    this.start = 0;
    this.loadPlants();
    this.loadFeaturedPlants();
    this.loadPopPlants();
  }

  ngOnInit() {

  }
}
