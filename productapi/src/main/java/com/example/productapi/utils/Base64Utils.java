package com.example.productapi.utils;

import java.util.Base64;

public class Base64Utils {

    public static String encodeImage(byte[] imageBytes) {
        return Base64.getEncoder().encodeToString(imageBytes);
    }

    public static byte[] decodeImage(String base64Image) {
        return Base64.getDecoder().decode(base64Image);
    }
}
