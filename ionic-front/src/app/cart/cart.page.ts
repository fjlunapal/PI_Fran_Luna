import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Producto } from '../services/interfaces/Producto';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor(private router: Router, public dataService: DataService, private menuController: MenuController) {}
  products: any;
  showCart: any[] = [];
  finalCart: any;
  totalPrice: number = 0;
  ngOnInit() {
    this.showCart = this.calculateSameProducts();
    console.log(this.showCart);
  }

  public calculateSameProducts(): any[] {
    const groupedCart: any[] = [];
    const groupedProducts: any = {};

    // Agrupar productos por ID y calcular la suma de los precios
    for (const product of this.dataService.productosCarrito) {
      if (groupedProducts[product.id]) {
        groupedProducts[product.id].cantidad++;
        groupedProducts[product.id].precioTotal += product.precio;
      } else {
        groupedProducts[product.id] = {
          ...product,
          cantidad: 1,
          precioTotal: product.precio,
        };
      }
    }

    // Crear un array con los productos agrupados
    for (const key in groupedProducts) {
      if (groupedProducts.hasOwnProperty(key)) {
        groupedCart.push(groupedProducts[key]);
      }
    }

    this.finalCart = groupedCart;

    return groupedCart;
  }

  public getTotalPrice() {
    this.totalPrice=this.dataService.getTotalPrice();
    return this.totalPrice;
  }

  public async createOrder() {
    this.dataService.createOrder(this.finalCart);
  }

  public async openMenu(){
    await this.menuController.open('cartMenu');
  }

  addProduct(producto: Producto) {
    this.dataService.addProductoCarrito(producto);
    this.showCart = this.calculateSameProducts();
    this.updateCart();
  }

  deleteProduct(producto: Producto) {
    this.dataService.deleteProductoCarrito(producto);
    this.showCart = this.calculateSameProducts();
    this.updateCart();
  }

  updateCart() {
    this.showCart = this.calculateSameProducts();
    this.updateFinalCart();
  }

  updateFinalCart() {
    this.finalCart = this.showCart;
  }

  async cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
