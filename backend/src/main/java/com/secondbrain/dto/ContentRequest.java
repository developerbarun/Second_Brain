package com.secondbrain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class ContentRequest {

    @NotBlank
    private String title;

    private String link;

    @NotBlank
    @Pattern(regexp = "image|video|article|audio", message = "Type must be one of: image, video, article, audio")
    private String type;

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
}
