import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  Form,
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

  //method to login
  async login() {
    var f = this.loginForm.value;

    console.log('datos enviados', this.loginForm.value);
    this.authService.login(f.email, f.password).then((f) => {
      +console.log(f);
      if (this.loginForm.invalid) {
        console.log('datos enviados', this.loginForm.value);
      } else {
        localStorage.setItem('token', f.access_token);
        localStorage.setItem('userId', f.userId);
        console.log('userId', f.userId);
        this.router.navigate(['/tabs']);
      }
    });
  }
}
