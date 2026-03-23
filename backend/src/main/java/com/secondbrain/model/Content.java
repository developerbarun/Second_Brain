package com.secondbrain.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "contents")
public class Content {

    @Id
    private String id;

    private String title;

    private String link;

    private String type;

    private List<String> tags;

    private String userId;

    public Content() {}

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getLink() { return link; }
    public void setLink(String link) { this.link = link; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}
