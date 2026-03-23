package com.secondbrain.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.secondbrain.model.Content;

@Repository
public interface ContentRepository extends MongoRepository<Content, String> {

    List<Content> findByUserId(String userId);

    void deleteByIdAndUserId(String id, String userId);
}
