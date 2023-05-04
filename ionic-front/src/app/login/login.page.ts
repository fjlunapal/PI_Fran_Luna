import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  Form,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(public fb: FormBuilder, public alertController: AlertController) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  //method to login
  async login() {
    var f = this.loginForm.value;

    if (this.loginForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor rellena todos los campos',
        buttons: ['Aceptar'],
      });

      await alert.present();
      return;
    }
    var user = {
      email: f.email,
      password: f.password,
    };
    console.log('DATOS USUARIO LOGIN', f);
  }
}
