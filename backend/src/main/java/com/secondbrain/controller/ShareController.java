package com.secondbrain.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.secondbrain.dto.ShareRequest;
import com.secondbrain.model.Content;
import com.secondbrain.model.Link;
import com.secondbrain.model.User;
import com.secondbrain.repository.ContentRepository;
import com.secondbrain.repository.LinkRepository;
import com.secondbrain.repository.UserRepository;
import com.secondbrain.util.RandomUtil;

@RestController
@RequestMapping("/api/v1/brain")
public class ShareController {

    @Autowired
    private LinkRepository linkRepository;

    @Autowired
    private ContentRepository contentRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/share")
    public ResponseEntity<?> share(@RequestBody ShareRequest request, Authentication auth) {
        String userId = (String) auth.getPrincipal();

        if (request.isShare()) {
            Link existing = linkRepository.findByUserId(userId).orElse(null);
            if (existing != null) {
                return ResponseEntity.ok(Map.of("hash", existing.getHash()));
            }
            String hash = RandomUtil.random(10);
            linkRepository.save(new Link(hash, userId));
            return ResponseEntity.ok(Map.of("hash", hash));
        } else {
            linkRepository.deleteByUserId(userId);
            return ResponseEntity.ok(Map.of("message", "Removed Link"));
        }
    }

    @GetMapping("/{shareLink}")
    public ResponseEntity<?> getSharedContent(@PathVariable String shareLink) {
        Link link = linkRepository.findByHash(shareLink).orElse(null);
        if (link == null) {
            return ResponseEntity.status(411).body(Map.of("message", "Incorrect input"));
        }

        List<Content> content = contentRepository.findByUserId(link.getUserId());
        User user = userRepository.findById(link.getUserId()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(411).body(Map.of("message", "User not found"));
        }

        return ResponseEntity.ok(Map.of(
                "username", user.getUsername(),
                "content", content
        ));
    }
}
