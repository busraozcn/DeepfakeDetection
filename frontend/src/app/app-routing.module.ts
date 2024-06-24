import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UploadComponent } from './upload/upload.component';
import { ImageListComponent } from './image-list/image-list.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from './guards/auth.guard';  // AuthGuard'ı içe aktarın

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'upload', component: UploadComponent, canActivate: [AuthGuard] }, // Guard'ı ekleyin
  { path: 'image-list', component: ImageListComponent, canActivate: [AuthGuard] }, // Guard'ı ekleyin
  { path: 'home-page', component: HomePageComponent },
  { path: 'my-account', component: MyAccountComponent, canActivate: [AuthGuard] }, // Guard'ı ekleyin
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] }, // Guard'ı ekleyin
  { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] }, // Guard'ı ekleyin
  { path: '', redirectTo: '/home-page', pathMatch: 'full' }, // Varsayılan olarak home-page'e yönlendir
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
