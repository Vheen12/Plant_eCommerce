import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
// import { BehaviorSubject } from 'rxjs';
import { AccessProviders } from 'src/app/providers/access-providers';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  cart: any[];
  products: any[];

  datastorage: any;
  user: any;
  id: number;
  price: number;
  amount: number;
  plantName: any;


  constructor(
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    private accessProvider: AccessProviders,
    private storage: Storage,
    private router: Router
  ) { }

  ngOnInit() {
    this.storage.get('storage_xxx').then((res)=>{
      // console.log(res);
      this.datastorage =  res;
      this.user = this.datastorage.userID;
    });
    this.loadCart();
    this.loadPlants();
    this.amount = 0;
    this.cart = [];
    this.products = [];
  }

  async doRefresh(event){
    this.ngOnInit();
    event.target.complete();
  }

  async loadCart(){
    return new Promise(resolve =>{
      let body = {
        action: 'load_cart',
        user: this.user
      }

        this.accessProvider.postData(body, 'cart_api.php').subscribe((res:any) =>{
          for(let datas of res.result){
            if(datas.customer === this.user) {
              this.cart.push(datas);
            }
          }
          resolve(true);
        });
    });
  }

  async loadPlants(){
    return new Promise(resolve =>{
      let body = {
        action: 'load_plants'
      }

        this.accessProvider.postData(body, 'cart_api.php').subscribe((res:any) =>{
          for(let datas of res.result){
            this.products.push(datas)
          }
          resolve(true);
        });
    });
  }

  async delData(product){
      return new Promise(resolve =>{
        let body = {
          action: 'cancel_item',
          plantID: product.plantID
        }

          this.accessProvider.postData(body, 'process_api.php').subscribe((res:any) =>{
            if (res.success == true) {
              console.log('Deleted successfully');
              // this.ngOnInit();
            }else{
              console.log('Deleted error');
            }
          });
      });
    }

  insertToOrder(items){
      return new Promise(resolve =>{
        let body = {
          action: 'addToOrder',
          plantName: items.plantName,
          price: this.total,
          amount: items.amount,
          img: items.img,
          customer: this.user,
          plantID: items.plantID
        }

        this.accessProvider.postData(body, 'cart_api.php').subscribe((res:any) =>{
          if(res.success == true){
            console.log(res.msg);
          }
          else{
            console.log(res.msg);
          }
        });
      });
    }

  increaseCartItem(product) {
    for(let p of this.cart){
      if(p.plantID === product.plantID){
        p.amount++;
      }
    }
  }

  decreaseCartItem(product) {
    for(let [index, p] of this.cart.entries()){
      if(p.plantID === product.plantID){
        p.amount--;
      }
      if (p.amount === 0) {
        p.amount = 1;
      }
    }
  }

  getTotal(): number {
		return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
	}

  removeProduct(product) {
    for(let [index, p] of this.cart.entries()) {
      if (p.plantID === product.plantID) {
        this.cart.splice(index,1);
        this.delData(p);
      }
    }
  }
  selected:any;
  changeRadio(event){
    console.log(event.detail);
    if(event.detail.value === "card2"){
      this.selected = 'GCash';
    }
    else{
      this.selected = 'COD';
    }
  }

  async presentToast(a,b){
    const toast = await this.toastCtrl.create({
      message: a,
      color: b,
      duration: 2500
    });
    toast.present();
  }
   total: any;
   contact: string =" ";
   address: string =" ";
  order(){
     if(this.contact === " "){
      this.presentToast('Please add Contact Number!', 'danger')
     }
     else if(this.address === " "){
      this.presentToast('Please add Delivery Address!', 'danger')
     }
     else{
      for(let items of this.cart){
        this.total = items.price * items.amount;
       this.insertToOrder(items);
      }

      this.storage.set('contact',this.contact);
      this.storage.set('address',this.address);
      this.storage.set('paymentMode',this.selected);
      this.presentToast('Order has been placed','success');
     }
  }
}
