import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController,
    public auth: AuthService) { 
    this.registerForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  async registration() {
    if(this.registerForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor rellena todos los campos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
      }
      console.log('datos enviados', this.registerForm.value)
      this.auth.register(this.registerForm.value['email'], this.registerForm.value['password'], this.registerForm.value['password2']);
    }
  }
