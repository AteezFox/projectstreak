package com.example.productapi.utils;

import hidden_gems.Decryptor;
import hidden_gems.Encryptor;

public class FUNCTIONS {
    private static FUNCTIONS instance = null;

    public final Encryptor ENCRYPT;
    public final Decryptor DECRYPT;

    private FUNCTIONS() {
        ENCRYPT = new Encryptor();
        DECRYPT = new Decryptor();
    }

    public static synchronized FUNCTIONS DO() {
        if (instance == null) {
            instance = new FUNCTIONS();
        }
        return instance;
    }



}
