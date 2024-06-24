import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // AuthService'i içe aktarın

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = "Don't Fake Me";

  constructor(private router: Router, public authService: AuthService) { }

  navigateToDetect() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/upload']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    this.authService.logout();
  }
}
