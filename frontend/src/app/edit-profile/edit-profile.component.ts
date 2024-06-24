import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';

  constructor() { }

  ngOnInit(): void {
    // Kullanıcı bilgilerini burada yükleyebilirsiniz
    this.loadUserInfo();
  }

  loadUserInfo() {
    // Örnek: Servisten kullanıcı bilgilerini yükleme işlemi
    // Örneğin, API'den kullanıcı bilgilerini alarak form alanlarını doldurabilirsiniz
    // this.firstName = ...
    // this.lastName = ...
    // this.email = ...
  }

  editProfile() {
    // Profil düzenleme işlemlersi burada gerçekleştirilebilir
    console.log('Edit profile clicked');
    // Örneğin, servise kullanıcı profili güncelleme isteği gönderilebilir
  }
}
