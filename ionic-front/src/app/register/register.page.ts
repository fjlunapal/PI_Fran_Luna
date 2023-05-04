import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(public fb: FormBuilder,
    public alertController: AlertController) { 
    this.registerForm = this.fb.group({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  async registration() {
    var f = this.registerForm.value;

    if(this.registerForm.invalid) {
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Por favor rellena todos los campos',
        buttons: ['Aceptar']
      });

      await alert.present();
      return;
      }

      var user = {
        email: f.email,
        password: f.password
      }
      console.log('DATOS USUARIO REGISTRO', f);

      // localStorage.setItem('user', JSON.stringify(user));
    }
  }
