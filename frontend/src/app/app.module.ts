import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { ImageListComponent } from './image-list/image-list.component';
import { UploadComponent } from './upload/upload.component';
import { LoginComponent } from './login/login.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HomePageComponent } from './home-page/home-page.component';
import { MyAccountComponent } from './my-account/my-account.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';  // AuthService'i içe aktarın

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ImageListComponent,
    UploadComponent,
    LoginComponent,
    HomePageComponent,
    MyAccountComponent,
    EditProfileComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    MatSnackBarModule, // animations module
  ],
  providers: [AuthService], // AuthService'i providers'a ekleyin
  bootstrap: [AppComponent],
})
export class AppModule {}
