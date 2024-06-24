package com.javatechie.service;

import com.javatechie.dto.PhotoDto;
import com.javatechie.entity.Photo;
import com.javatechie.entity.User;
import com.javatechie.repository.PhotoRepository;
import com.javatechie.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PhotoService {

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RestTemplate restTemplate;

    public PhotoDto uploadPhoto(Long userId, MultipartFile file) throws IOException {
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

            Photo photo = new Photo();
            photo.setUser(user);
            photo.setData(file.getBytes());
            photo.setFilename(file.getOriginalFilename());
            photo.setUploadTime(LocalDateTime.now());

            // AI modeli ile yüzdeleri hesapla
            Map<String, Double> percentages = getAiPercentage(file);
            photo.setAiPercentage(percentages.get("ai_percentage"));
            photo.setRealPercentage(percentages.get("real_percentage"));

            photo = photoRepository.save(photo);

            return mapToDto(photo);
        } catch (IOException e) {
            e.printStackTrace();
            throw new IOException("Error while uploading photo", e);
        }
    }

    public List<PhotoDto> getPhotosByUserId(Long userId) {
        try {
            return photoRepository.findByUserId(userId).stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error retrieving photos by user id", e);
        }
    }

    public List<PhotoDto> getAllPhotos() {
        try {
            return photoRepository.findAll().stream()
                    .map(this::mapToDto)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error retrieving all photos", e);
        }
    }

    public Photo findPhotoById(Long photoId) {
        try {
            return photoRepository.findById(photoId).orElseThrow(() -> new RuntimeException("Photo not found"));
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error retrieving photo by id", e);
        }
    }

    private PhotoDto mapToDto(Photo photo) {
        PhotoDto dto = new PhotoDto();
        dto.setId(photo.getId());
        dto.setFilename(photo.getFilename());
        dto.setUploadTime(photo.getUploadTime().toString());
        dto.setUrl("/api/photos/" + photo.getId());
        dto.setUploadedBy(photo.getUser().getFirstName() + " " + photo.getUser().getLastName());
        dto.setAiPercentage(photo.getAiPercentage());
        dto.setRealPercentage(photo.getRealPercentage());
        return dto;
    }

    private Map<String, Double> getAiPercentage(MultipartFile file) throws IOException {
        try {
            String apiUrl = "http://localhost:8000/predict/"; // AI model API URL'si

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            Map<String, Object> body = new HashMap<>();
            body.put("file", file.getResource());

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            Map<String, Object> response = restTemplate.postForObject(apiUrl, requestEntity, Map.class);
            Map<String, Double> confidences = (Map<String, Double>) response.get("confidences");
            double aiPercentage = confidences.get("fake") * 100;
            double realPercentage = confidences.get("real") * 100;

            return Map.of("ai_percentage", aiPercentage, "real_percentage", realPercentage);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error calling AI model API", e);
        }
    }
}
