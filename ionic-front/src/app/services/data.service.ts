import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Producto } from './interfaces/Producto';
import { Router } from '@angular/router';
import { get } from 'http';


@Injectable({
  providedIn: 'root',
})
export class DataService {

  apiUrl = 'https://api-marruzella.herokuapp.com/api/';
  pedido: any;
  productosPedido: any;
  productosCarrito: Producto[] = [];
  userId: any;
  totalPrice: number = 0;
  constructor(private http: HttpClient, public alert: AlertController, private router: Router) {
    this.userId = localStorage.getItem('userId');
  }

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

  createOrder(productosCantidad: Producto[]) {
    // Crear pedido en el que le pasamos el usuario actual
    if (this.productosCarrito.length === 0) {
      this.emptyCartAlert();
      return;
    }
    this.postToOrder().then((res) => {
      var pedidoId = res.id;
      console.log(res);
      productosCantidad.forEach((producto) => {
        this.postCart(producto.id, producto.cantidad, pedidoId);
      });
    });
    this.orderSuscessAlert();
    this.router.navigate(['/tabs/tab3']);
    this.productosCarrito = [];
    console.log('DATAproductosPedido', this.productosPedido);
  }

  //Metodo para hacer un post a la api de los pedidos
  postToOrder() {
    const user = {
      usuario: this.userId,
    };

    console.log(user);

    return fetch(this.apiUrl + 'pedido', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error('Error al crear el pedido');
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  //Calcular el total de los pedidos
  getTotalPrice() {
    let totalPrice = 0;
  
    for (const producto of this.productosCarrito) {
      totalPrice += producto.precio;
    }
  
    return totalPrice;
  }
  
  //metodo para hacer un get a la api de los pedidos

  postCart(productoId: any, cantidad: number, pedidoId: any) {
    const order = {
      cantidad: cantidad,
      pedido: pedidoId,
      producto: productoId,
    };

    console.log(order);

    return fetch(this.apiUrl + 'productoCarrito', {
      method: 'POST',
      body: JSON.stringify(order),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Token ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error('Error al añadir el producto');
        }
      })
      .catch((error) => {
        console.error(error);
        throw error;
      });
  }

  async getPedidos() {
    return fetch(this.apiUrl + 'pedido', {
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

  async emptyCartAlert(){
    const alert = await this.alert.create({
      header: 'Carrito vacio',
      message: 'No tienes productos en el carrito',
      buttons: ['OK']
    });
    await alert.present();
  }

  async orderSuscessAlert(){
    const alert = await this.alert.create({
      header: 'Pedido realizado',
      message: 'Su pedido se ha realizado correctamente',
      buttons: ['OK']
    });
    await alert.present();
  }

  async getOrderHistory(pedidoId: any) {
    return fetch(this.apiUrl + 'productoCarrito/' + pedidoId, {
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

  

}
