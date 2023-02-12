import { Component, OnInit } from '@angular/core';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { AccessProviders } from '../../../providers/access-providers';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styleUrls: ['./items.page.scss'],
})
export class ItemsPage implements OnInit {
  mycart: any = false;

  datastorage: any;
  id: number;
  name: string="";
  price: number;
  img: string="";
  description: string="";
  user: string="";

  constructor(
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private storage: Storage,
    private toastCtrl: ToastController,
    private accessProvider: AccessProviders,
    private loadCtrl: LoadingController
  ) { }

  // Load Data

  loadPlant(){
    return new Promise(resolve =>{

      let body = {
        action: 'load_single_plant',
        id: this.id
      }

      this.accessProvider.postData(body, 'process_api.php').subscribe((res:any) =>{
        for(let datas of res.result){
          this.name = datas.name;
          this.price = datas.price;
          this.img = datas.img;
          this.description = datas.description;
        }
        resolve(true);
      });
    });
  }

  // Insert Data

  async insertToCart(){
    return new Promise(resolve =>{

      let body = {
        action: 'addTocart',
        plantName: this.name,
        price: this.price,
        qty: 1,
        img: this.img,
        customer: this.user,
        plantID: this.id
      }

      this.accessProvider.postData(body, 'cart_api.php').subscribe((res:any) =>{
        if(res.success == true){
          console.log('added to cart');
          console.log(res.msg);
        }

      });
    });
  }

  // Delete Data

  async delData(product){
    return new Promise(resolve =>{
      let body = {
        action: 'cancel_item',
        plantID: product
      }

        this.accessProvider.postData(body, 'process_api.php').subscribe((res:any) =>{
          if (res.success == true) {
            console.log('Deleted successfully');
          }else{
            console.log('Deleted error');
          }
        });
    });
  }

  // Methods

  addToCart(){
    this.mycart = !this.mycart;
    if (this.mycart) {
      this.presentToast('Added To Cart');
      this.insertToCart();
      this.mycart = true;
    }
    else{
      this.presentToast('Remove from Cart');
      this.delData(this.id)
      !this.mycart;
    }
  }

  async loadPresent(){
    const loader = await this.loadCtrl.create({
      message:"Loading Plant Details",
      duration: 3000,
    });
    loader.present();
  }

  async presentToast(a){
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1000,
      color: 'success'
    });
    toast.present();
  }

  ngOnInit() {
    // Get current 'Value' of Email from storage session
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage =  res;
      this.user = this.datastorage.userID;
    });
    // Check ID if equals to selected Item ID
    this.route.params.subscribe((data:any)=>{
      console.log(data);
      this.id = data.id;
      if (this.id != 0) {
        this.loadPresent();
        this.loadPlant();
      }
    });
	}
}
