package com.secondbrain.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.secondbrain.model.Link;

@Repository
public interface LinkRepository extends MongoRepository<Link, String> {

    Optional<Link> findByUserId(String userId);

    Optional<Link> findByHash(String hash);

    void deleteByUserId(String userId);
}
