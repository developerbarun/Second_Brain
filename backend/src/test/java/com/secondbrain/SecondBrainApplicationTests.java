package com.secondbrain;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(properties = {
    "spring.data.mongodb.uri=mongodb://localhost:27017/secondbrain-test",
    "jwt.secret=test-secret-key-that-is-long-enough-for-hmac"
})
class SecondBrainApplicationTests {

    @Test
    void contextLoads() {
    }
}
