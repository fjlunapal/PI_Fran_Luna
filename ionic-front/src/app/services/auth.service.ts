import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = '127.0.0.1:8000';

  constructor() {}

  //Metodo de registro mediante una promesa que se manda a la api para los usuarios que se registren en la app
  register(email: string, password: string, confirmPassword: string) {
    //user array that contains the data to parse to json
    var user = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    return fetch(this.apiUrl + '/auth/registration', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
  }

  //Metodo de login mediante una promesa que se manda a la api para los usuarios que se logueen en la app
  login(email: string, password: string) {
    var user = {
      email: email,
      password: password,
    };
    // console.log('DATOS USUARIO LOGIN', user)
    return fetch(this.apiUrl + '/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());
    
  }
}
