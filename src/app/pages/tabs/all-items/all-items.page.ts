import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AccessProviders } from '../../../providers/access-providers';

@Component({
  selector: 'app-all-items',
  templateUrl: './all-items.page.html',
  styleUrls: ['./all-items.page.scss'],
})
export class AllItemsPage implements OnInit {
  item: any;
  datastorage: any;
  name:string;
  price: string;
  category: string;
  img: string;
  description: string;
  limit: number = 6;
  start: number = 0;

  plants: any = [];
  featuredItems: any = [];
  popularItems: any =[];

  constructor(
    private toastCtrl: ToastController,
    private accessProvider: AccessProviders,
    private loadingCtrl: LoadingController,
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
            this.plants.push(datas);
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

  openItem(a){
    this.navCtrl.navigateRoot(['/items/'+ a]);
  }

  loadData(event){
    this.start += this.limit;
    setTimeout(() => {
      this.loadPlants().then(()=>{
        event.target.complete();
      });
      this.loadPopPlants().then(()=>{
        event.target.complete();
      });
      this.loadFeaturedPlants().then(()=>{
        event.target.complete();
      });
    }, 500);
  }

  async doRefresh(event){
    const loader = await this.loadingCtrl.create({
      message: 'Updating Content....',
      duration: 5000
    });
    loader.present();

    this.ionViewDidEnter();
    event.target.complete();

    loader.dismiss();
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message:a,
      duration: 1500,
    });
    toast.present();
  }

  async loadPresent(){
    const loader = await this.loadingCtrl.create({
      message:"Loading Products....",
      duration: 2000,
    });
    loader.present();
  }

  ionViewDidEnter(){
    this.storage.get('plant_category').then((res)=>{
      console.log(res);
      if(res === 'plants'){
        this.item = this.plants = [];
      }
      if(res === 'featured'){
        this.item = this.featuredItems = [];
      }
      if(res === 'popular'){
        this.item = this.popularItems = [];
      }
    });
    this.start = 0;
    this.loadPresent();
    this.loadPlants();
    this.loadPopPlants();
    this.loadFeaturedPlants();
  }

  ngOnInit() {

  }

}
