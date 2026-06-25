package com.secondbrain.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.secondbrain.dto.ContentRequest;
import com.secondbrain.model.Content;
import com.secondbrain.repository.ContentRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/content")
public class ContentController {

    @Autowired
    private ContentRepository contentRepository;

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody ContentRequest request, Authentication auth) {
        String userId = (String) auth.getPrincipal();

        Content content = new Content();
        content.setTitle(request.getTitle());
        content.setLink(request.getLink());
        content.setType(request.getType());
        content.setUserId(userId);
        content.setTags(Collections.emptyList());

        contentRepository.save(content);
        return ResponseEntity.ok(Map.of("message", "Content added"));
    }

    @GetMapping
    public ResponseEntity<?> list(Authentication auth) {
        String userId = (String) auth.getPrincipal();
        List<Content> content = contentRepository.findByUserId(userId);
        return ResponseEntity.ok(Map.of("content", content));
    }

    @DeleteMapping
    public ResponseEntity<?> delete(@RequestBody Map<String, String> body, Authentication auth) {
        String userId = (String) auth.getPrincipal();
        String contentId = body.get("contenetId");
        if (contentId != null) {
            contentRepository.deleteByIdAndUserId(contentId, userId);
        }
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }
}
