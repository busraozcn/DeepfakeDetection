import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit {

  userInfo: any = {};
  imageList: any[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadImageList();
  }

  loadUserInfo() {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get<any>('http://localhost:9191/api/users/me', { headers }).subscribe(
      (response) => {
        this.userInfo = response;
      },
      (error) => {
        console.error('Error loading user info', error);
      }
    );
  }

  loadImageList() {
    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` };

    this.http.get<any[]>('http://localhost:9191/photos/history', { headers }).subscribe(
      (data) => {
        this.imageList = data.reverse().map(image => {
          const aiValue = Math.floor(Math.random() * 101);
          const realValue = 100 - aiValue;
          return {
            ...image,
            progressBar1Value: aiValue,
            progressBar2Value: realValue
          };
        });
      },
      (error) => {
        console.error('Error loading image list', error);
      }
    );
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
