package com.javatechie.dto;

public class PhotoDto {
    private double aiPercentage;
    private double realPercentage;
    private Long id;
    private String filename;
    private String uploadTime;
    private String url;
    private String uploadedBy;

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getUploadTime() {
        return uploadTime;
    }

    public void setUploadTime(String uploadTime) {
        this.uploadTime = uploadTime;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUploadedBy() {
        return uploadedBy;
    }

    public void setUploadedBy(String uploadedBy) {
        this.uploadedBy = uploadedBy;
    }

    public double getAiPercentage() {
        return aiPercentage;
    }

    public void setAiPercentage(double aiPercentage) {
        this.aiPercentage = aiPercentage;
    }

    public double getRealPercentage() {
        return realPercentage;
    }

    public void setRealPercentage(double realPercentage) {
        this.realPercentage = realPercentage;
    }
}
