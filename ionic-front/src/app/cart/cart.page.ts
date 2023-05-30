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
  constructor(private router: Router, public dataService: DataService) {}
  products: any;
  showCart: any[] = [];
  finalCart: any[] = [];
  ngOnInit() {
    console.log('productos pagina carrito', this.dataService.productosCarrito);
    this.showCart = this.calculateSameProducts();
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
    this.finalCart=groupedCart;
    return groupedCart;
  }

  //this method post the order to the api postPedido()
  public createOrder(){
    // Crear pedido(USUARIO)

    //Crear productoCarrito(PEDIDO RELACIONADO, PRODUCTO, CANTIDAD)  LOS QUE NECESITEN EL PEDIDO

    //Paga: put a pedido para ponerle pagado a true


  }

  addProduct(producto: Producto) {
    this.dataService.addProductoCarrito(producto);
    this.showCart = this.calculateSameProducts();
    this.updateCart();
    console.log('after add', this.dataService.productosCarrito);
  }

  deleteProduct(producto: Producto) {
    this.dataService.deleteProductoCarrito(producto);
    this.showCart = this.calculateSameProducts();
    this.updateCart();
    console.log('after delete', this.dataService.productosCarrito);
  }

  updateCart() {
    this.showCart = this.calculateSameProducts();
  }

  async cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
