import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {

  datastorage: any;
  name: string;
  email: string;

  constructor(
    private storage: Storage,
    private router: Router
  ) { }

  toProfile(){
    this.router.navigate(['/profile']);
  }

  toOrders(){
    this.router.navigate(['/tabs/wishlist']);
  }

  ngOnInit() {
    this.storage.get('storage_xxx').then((res)=>{
      this.datastorage =  res;
      this.name = this.datastorage.username;
      this.email = this.datastorage.email;
    });
  }
}
