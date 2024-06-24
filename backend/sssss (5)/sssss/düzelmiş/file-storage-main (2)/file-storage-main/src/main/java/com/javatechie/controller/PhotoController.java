package com.javatechie.controller;

import com.javatechie.dto.PhotoDto;
import com.javatechie.entity.Photo;
import com.javatechie.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/photos")
public class PhotoController {

    @Autowired
    private PhotoService photoService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadPhoto(@RequestParam("image") MultipartFile image, @RequestParam("userId") Long userId) {
        try {
            PhotoDto photoDto = photoService.uploadPhoto(userId, image);
            return ResponseEntity.ok(photoDto);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Photo upload failed: " + e.getMessage());
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body("User not found: " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PhotoDto>> getPhotosByUserId(@PathVariable Long userId) {
        try {
            List<PhotoDto> photos = photoService.getPhotosByUserId(userId);
            return ResponseEntity.ok(photos);
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<PhotoDto>> getAllPhotos() {
        try {
            List<PhotoDto> photos = photoService.getAllPhotos();
            return ResponseEntity.ok(photos);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{photoId}")
    public ResponseEntity<Resource> getPhotoById(@PathVariable Long photoId) {
        try {
            Photo photo = photoService.findPhotoById(photoId);
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + photo.getFilename() + "\"")
                    .body(new ByteArrayResource(photo.getData()));
        } catch (NoSuchElementException e) {
            e.printStackTrace();
            return ResponseEntity.status(404).body(null);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }

    // Global exception handler
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
    }
}

