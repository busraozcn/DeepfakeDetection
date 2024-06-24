import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  changePassword() {
    if (this.newPassword === this.confirmNewPassword) {
      // Şifre değiştirme işlemleri burada gerçekleştirilebilir
      console.log('Change password clicked');
      // Örneğin, servise şifre değiştirme isteği gönderilebilir
    } else {
      alert('New passwords do not match.');
    }
  }
}
