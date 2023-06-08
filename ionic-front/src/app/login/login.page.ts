import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  async login() {
    if (this.loginForm.invalid) {
      this.emptyAlert();
      return;
    }

    var f = this.loginForm.value;
    console.log('datos enviados', this.loginForm.value);

    this.authService
      .login(f.email, f.password)
      .then((response) => {
        console.log(response);
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('userId', response.userId);
        console.log('userId', response.userId);
        this.router.navigate(['/tabs']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async emptyAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Debes rellenar todos los campos.',
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;
  }
}
