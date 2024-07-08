import { Component } from '@angular/core';
import { flush } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  isIncorrectCredentials = false;
  constructor(private fb: FormBuilder, private auth: AuthService) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: [null, Validators.required]
    })
  }

  onLogin() {
    console.log(this.loginForm);
    const { email, password } = this.loginForm.value
    this.auth.login(email, password);
    if (this.loginForm.value.email !== 'test@gmail.com' || this.loginForm.value.password !== 'test@123') {
      this.isIncorrectCredentials = true;
    }
  }
}
