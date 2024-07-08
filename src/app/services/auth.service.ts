import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  constructor(private router: Router) { }

  login(email: string, password: string) {
    console.log(email === 'test@gmail.com')
    console.log(password === 'test@123')
    if (email === 'test@gmail.com' && password === 'test@123') {
      this.router.navigate(['/dashboard']);
    }
    this.isAuthenticated = true;
  }
}
