import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutsection',
  templateUrl: './aboutsection.page.html',
  styleUrls: ['./aboutsection.page.scss'],
})
export class AboutsectionPage implements OnInit {

  constructor() { }
  profiles: any = [
    {id: 1,role: 'Data Processor', img: 'assets/about/emerson.png'},
    {id: 2,role: 'Documenter', img: 'assets/about/evy.png'},
    {id: 3,role: 'Designer', img: 'assets/about/bryan.png'},
    {id: 4,role: 'Data Processor', img: 'assets/about/jessa.png'},
    {id: 5,role: 'Developer', img: 'assets/about/arvin.png'}];

  ngOnInit() {
    this.profiles;
  }

}
