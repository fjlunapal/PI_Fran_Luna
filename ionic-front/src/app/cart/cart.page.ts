import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  orderedProducts: any;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  async cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
