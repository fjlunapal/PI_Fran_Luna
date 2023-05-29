import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { Producto } from './interfaces/Producto';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  apiUrl = 'https://api-marruzella.herokuapp.com/api/';

  constructor(private http: HttpClient, public alert: AlertController) {}

  productosCarrito: any[] = [];

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
    const productoCarrito = {
      producto: producto,
      cantidad: 1,
    };
  
    this.productosCarrito.push(productoCarrito);
  }

  // //Metodo para añadir productosCarrito a un carrito
  // addCarrito() {
  //   return fetch(this.apiUrl + 'carrito', {
  //     method: 'POST',
  //     body: JSON.stringify(this.productosCarrito),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Token ' + localStorage.getItem('token'),
  //     },
  //   })
  //     .then((res) => {
  //       if (res.ok) {
  //         this.productosCarrito = [];
  //         return res.json();
  //       } else {
  //         throw new Error('Error al añadir el producto');
  //       }
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       throw error;
  //     });
  // }

}
