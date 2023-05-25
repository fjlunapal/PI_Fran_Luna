import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://api-marruzella.herokuapp.com/api/';
  alertController: any;
  token: any;
  constructor(private http: HttpClient, public alert: AlertController) {}

  //Metodo de registro mediante una promesa que se manda a la api para los usuarios que se registren en la app
  register(email: string, user: string, password: string) {
    const url = this.apiUrl + '/user/register';
    var newUser = {
      email: email,
      username: user,
      password: password
    };
    console.log(newUser);
    return fetch(this.apiUrl + 'user/register', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if(res.ok){
      res.json();
      console.log(res);
      }
      else{
        throw new Error('Error de registro. Comprueba que los datos introducidos son correctos.');
      }
    }).catch((error) => {
      console.error(error);
      throw error;
    });
}
  

  //Metodo de login mediante una promesa que se manda a la api para los usuarios que se logueen en la app
  login(email: string, password: string) {
    const user = {
      username: email,
      password: password,
    };
  
    console.log(user);
  
    return fetch(this.apiUrl + 'user/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.json();
        } else {
          throw new Error('Error de inicio de sesión. Comprueba que los datos introducidos son correctos.');
        }
      })
      .catch((error) => {
        this.invalidLoginAlert();
        console.error(error);
        throw error;
      });
  }
  
  async invalidLoginAlert() {
    const alert = await this.alert.create({
      header: 'Error',
      message: 'Usuario o contraseña incorrectos',
      buttons: [
        {
          text: 'Ok',
          id: 'cancel-button',
          handler: (blah) => {
          }
        }
      ]
    });
    await alert.present();
  }

}
