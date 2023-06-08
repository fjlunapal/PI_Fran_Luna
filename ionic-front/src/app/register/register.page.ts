import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public alertController: AlertController,
    public auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: new FormControl('', Validators.required),
      user: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  async registration() {
    if (this.registerForm.invalid) {
      this.emptyAlert();
      return;
    }

    var f = this.registerForm.value;
    console.log('datos enviados', this.registerForm.value);

    this.auth
      .register(f.email, f.user, f.password)
      .then(() => {
        this.registerAlert();
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        console.log(err);
        this.errorAlert();
      });
  }

  // Alerta de registro correcto
  async registerAlert() {
    const alert = await this.alertController.create({
      header: 'Registro correcto',
      message:
        'Los datos han sido registrados correctamente, ahora puedes iniciar sesión.',
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;
  }

  // Alerta campos vacios
  async emptyAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Debes rellenar todos los campos.',
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;
  }

  // Alerta de error en el registro
  async errorAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Los datos son incorrectos o el usuario ya está registrado.',
      buttons: ['Aceptar'],
    });

    await alert.present();
    return;
  }
}
