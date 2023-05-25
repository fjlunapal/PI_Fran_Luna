import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public dataService: DataService, private router: Router) {}
  products: any;

  ngOnInit() {
    this.dataService.getProducts().then((products: any) => {
      this.products = products;
      console.log(this.products);
    }
    )
  }
  
  async cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
