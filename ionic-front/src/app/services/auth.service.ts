import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = '127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  //Metodo de registro mediante una promesa que se manda a la api para los usuarios que se registren en la app
  register(email: string, password: string, password2: string) {
    const url = this.apiUrl + '/auth/registration';
    const data = {
      email,
      password,
      password2
    };
    console.log(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Allow': 'POST, OPTIONS'
      })
    };
    return this.http.post(url, data, httpOptions);
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
    }).then((res) => {
      res.json();
      console.log(res);
    });
    
  }
}
