import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  orders: any[];

  datastorage: any;
  user: any;
  id: number;
  price: number;
  amount: number;
  plantName: any;
  contact: any;
  address:any;
  payment:any;

  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    private accessProvider: AccessProviders,
    private storage: Storage
  ) { }

  // Load Data

  async loadOrders(){
    return new Promise(resolve =>{
      let body = {
        action: 'load_orders',
        user: this.user
      }

        this.accessProvider.postData(body, 'cart_api.php').subscribe((res:any) =>{
          for(let datas of res.result){
            if(datas.customer === this.user) {
              this.orders.push(datas);
            }
          }
          resolve(true);
        });
    });
  }

  //  Delete data

  async delData(item){
    return new Promise(resolve =>{
      let body = {
        action: 'cancel_item',
        plantID: item.plantName
      }

        this.accessProvider.postData(body, 'cart_api.php').subscribe((res:any) =>{
          if (res.success == true) {
            console.log('Deleted successfully');
          }else{
            console.log('Deleted error');
          }
        });
    });
  }

  // Methods

  removeProduct(product) {
    for(let [index, p] of this.orders.entries()) {
      if (p.plantName === product.plantName) {
        this.orders.splice(index,1);
        this.delData(p);
      }
    }
  }

  getTotal(): number {
		return this.orders.reduce((i, j) => i + j.price * j.amount, 0);
	}

  async presentToast(){
    const toast = await this.toastCtrl.create({
      message: 'Cart is empty',
      color: 'danger',
      duration: 2500
    });
    toast.present();
  }

  async doRefresh(event){
    this.ngOnInit();
    event.target.complete();
  }

  ngOnInit() {
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage =  res;
      this.user = this.datastorage.userID;
    });
    this.storage.get('contact').then((res)=>{
      this.contact =  res;
    });
    this.storage.get('address').then((res)=>{
      this.address =  res;
    });
    this.storage.get('paymentMode').then((res)=>{
      this.payment =  res;
    });
    this.loadOrders();
    this.orders = [];
  }
}
