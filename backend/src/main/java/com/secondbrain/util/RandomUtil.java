package com.secondbrain.util;

import java.util.Random;

public class RandomUtil {

    private static final String CHARS =
            "asqweqrretuyriyuuiplkjhggfssazcxn9746552771534399sbxvvxfcttwuwioppldjgdfdbcnmmzvdaewteuitoyplughsfscxbnvdnsmmzbzvxccvdsklaoqowurtfrdvsh";

    private static final Random RANDOM = new Random();

    public static String random(int n) {
        int length = CHARS.length();
        StringBuilder sb = new StringBuilder(n);
        for (int i = 0; i < n; i++) {
            sb.append(CHARS.charAt(RANDOM.nextInt(length)));
        }
        return sb.toString();
    }

    private RandomUtil() {}
}
