import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PredictService } from '../services/predict.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  selectedFile: File | undefined;
  previewUrl: string | ArrayBuffer | null = null;
  predictionResult: any = null;
  uploadMessage: string | null = null;

  constructor(
    private router: Router,
    private predictService: PredictService
  ) {}

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    if (this.selectedFile) {
      reader.readAsDataURL(this.selectedFile);
    }
  }

  onDetectClick(): void {
    if (!this.selectedFile) {
      console.log('No file selected');
      return;
    }

    console.log('Selected file:', this.selectedFile);

    this.uploadMessage = 'Uploading photo...'; // Fotoğraf yüklendi mesajını ayarlama

    this.predictService.predict(this.selectedFile).subscribe(
      (res) => {
        this.predictionResult = res;
        console.log('Prediction result:', res);

        // Include the image URL in the prediction result
        this.predictionResult.imageUrl = this.previewUrl;

        this.uploadMessage = 'Photo uploaded successfully!'; // Başarılı yükleme mesajını ayarlama

        // Navigate to image-list and pass the prediction result
        this.router.navigate(['/image-list'], { state: { result: this.predictionResult } });
      },
      (err) => {
        console.error('Error predicting image:', err);
        this.uploadMessage = 'Error uploading photo. Please try again.'; // Hata mesajını ayarlama
      }
    );
  }
}
