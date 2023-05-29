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
  showCart = this.dataService.productosCarrito;

  ngOnInit() {
      console.log('productos pagina carrito', this.dataService.productosCarrito); 
    }

  ngOnDestroy() {
    this.products = null; // Borra la variable products al salir del componente
  }

  borrarProducto(producto: Producto) {
    this.dataService.deleteProductoCarrito(producto);
    this.showCart = this.dataService.productosCarrito;
    console.log('after delete', this.dataService.productosCarrito);
  }

  async cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
