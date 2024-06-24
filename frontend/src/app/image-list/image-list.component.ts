import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
})
export class ImageListComponent implements OnInit {
  progressBar1Value: number = 0;
  progressBar2Value: number = 0;
  imageList: any[] = [];
  detectionResult: any;

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.detectionResult = history.state.result;
    this.loadImageList();
  }

  loadImageList() {
    this.http.get<any[]>('/api/photos/history').subscribe(
      (data) => {
        this.imageList = data.reverse();
        if (this.detectionResult) {
          this.progressBar1Value = parseFloat((this.detectionResult.confidences.fake * 100).toFixed(2));
          this.progressBar2Value = parseFloat((this.detectionResult.confidences.real * 100).toFixed(2));
  
          // Add the detection result to the image list
          this.imageList.unshift({
            url: this.detectionResult.imageUrl, // Use imageUrl instead of image_url
            uploadedBy: 'You',
            uploadTime: new Date(),
            aiPercentage: this.progressBar1Value,
            realPercentage: this.progressBar2Value
          });
        } else if (this.imageList.length > 0) {
          this.randomizeProgress();
        }
      },
      (error) => {
        console.error('Error loading image list', error);
      }
    );
  }
  

  randomizeProgress() {
    this.progressBar1Value = Math.floor(Math.random() * 101);
    this.progressBar2Value = 100 - this.progressBar1Value;
  }
}