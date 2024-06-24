import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:9191/api/users/login', { email: this.email, password: this.password })
      .subscribe(
        response => {
          localStorage.setItem('token', response.token); // Token'i localStorage'a kaydet
          this.router.navigate(['/upload']); // Giriş başarılı olduğunda home-page'e yönlendir
        },
        error => {
          console.error('Login failed', error);
          alert('Login failed');
        }
      );
  }
}
