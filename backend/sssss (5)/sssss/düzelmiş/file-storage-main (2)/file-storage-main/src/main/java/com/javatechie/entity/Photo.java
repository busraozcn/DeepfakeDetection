package com.javatechie.entity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String filename;

    @Lob
    private byte[] data;

    private LocalDateTime uploadTime;

    private Double aiPercentage;

    private Double realPercentage;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }

    public LocalDateTime getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(LocalDateTime uploadTime) {
        this.uploadTime = uploadTime;
    }

    public Double getAiPercentage() {
        return aiPercentage;
    }

    public void setAiPercentage(Double aiPercentage) {
        this.aiPercentage = aiPercentage;
    }

    public Double getRealPercentage() {
        return realPercentage;
    }

    public void setRealPercentage(Double realPercentage) {
        this.realPercentage = realPercentage;
    }
}
