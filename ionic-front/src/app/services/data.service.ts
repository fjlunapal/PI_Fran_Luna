import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = 'https://api-marruzella.herokuapp.com/api/';

  constructor(private http: HttpClient, public alert: AlertController) { }

  //Metodo para hacer un get a la api de los productos
  getProducts() {
    return fetch(this.apiUrl + 'producto', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + localStorage.getItem('token'),
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        else {
          throw new Error('Error al cargar los productos');
        }
      }).catch((error) => {
        console.error(error);
        throw error;
      });
  }

}
