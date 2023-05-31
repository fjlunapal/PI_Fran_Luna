import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Producto } from './interfaces/Producto';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'https://api-marruzella.herokuapp.com/api/';
  pedido: any;
  productosPedido: any;
  productosCarrito: Producto[] = [];

  constructor(private http: HttpClient, public alert: AlertController) {}

  //Metodo para hacer un get a la api de los productos
  getProducts() {
    return fetch(this.apiUrl + 'producto', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Error al cargar los productos');
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  //Metodo para almacenar en un array varios productoCarrito
  addProductoCarrito(producto: Producto) {
    var prod = producto;

    this.productosCarrito.push(prod);
  }

  //Metodo para borrar un producto
  deleteProductoCarrito(producto: Producto) {
    var prod = producto;
    for (var i = 0; i < this.productosCarrito.length; i++) {
      if (this.productosCarrito[i].id === prod.id) {
        this.productosCarrito.splice(i, 1);
        break; // Sale del bucle después de borrar el producto
      }
    }
  }

  getProductoCarrito() {
    return this.productosCarrito;
  }

  createOrder(productosCantidadMap: Map<Producto, number>) {
    // Crear pedido en el que le pasamos el usuario actual
    this.pedido = {
      usuario: localStorage.getItem('id')
    };
    //Crear productoCarrito(PEDIDO RELACIONADO, PRODUCTO, CANTIDAD)  LOS QUE NECESITEN EL PEDIDO
    this.productosCarrito.forEach((producto) => {
      this.productosPedido = {
        pedido: this.pedido.id,
        producto: producto.id,
        cantidad: productosCantidadMap.get(producto),
      };
    });
    console.log('DATApedido', this.pedido);
    console.log('DATAproductosPedido', this.productosPedido);
    //Paga: put a pedido para ponerle pagado a true
  }





  //Metodo para hacer un post a la api de los pedidos
  //metodo para hacer un get a la api de los pedidos
}
