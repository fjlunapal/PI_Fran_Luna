import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://api-marruzella.herokuapp.com/api/';

  constructor(private http: HttpClient) {}

  //Metodo de registro mediante una promesa que se manda a la api para los usuarios que se registren en la app
  register(email: string, user: string, password: string) {
    const url = this.apiUrl + '/user/register';
    var newUser = {
      email: email,
      user: user,
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
      res.json();
      console.log(res);
    });
    
  }
  

  //Metodo de login mediante una promesa que se manda a la api para los usuarios que se logueen en la app
  login(email: string, password: string) {
    
    var user = {
      username: email,
      password: password,
    };
    console.log(user);
    // console.log('DATOS USUARIO LOGIN', user)
    return fetch(this.apiUrl + 'user/login', {
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
