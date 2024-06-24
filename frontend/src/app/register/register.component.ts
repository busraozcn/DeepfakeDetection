import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      this.snackBar.open('Şifreler eşleşmiyor.', 'Kapat', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'center',
      });
      return;
    }

    const user = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
    };

    this.http
      .post<any>('http://localhost:9191/api/users/register', user)
      .subscribe(
        (res) => {
          this.snackBar.open('Kayıt başarılı!', 'Kapat', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
          this.router.navigate(['/login']);
        },
        (err) => {
          console.error('Kayıt hatası:', err);
          if (err.error && err.error.error) {
            this.snackBar.open('Kayıt başarısız: ' + err.error.error, 'Kapat', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          } else {
            this.snackBar.open('Kayıt başarısız: ' + err.message, 'Kapat', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          }
        }
      );
  }
}