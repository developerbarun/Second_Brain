package com.secondbrain.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "links")
public class Link {

    @Id
    private String id;

    private String hash;

    @Indexed(unique = true)
    private String userId;

    public Link() {}

    public Link(String hash, String userId) {
        this.hash = hash;
        this.userId = userId;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getHash() { return hash; }
    public void setHash(String hash) { this.hash = hash; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
}
