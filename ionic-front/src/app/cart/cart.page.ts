import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Producto } from '../services/interfaces/Producto';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor(private router: Router, public dataService: DataService) { }
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
