package com.karellehofler;
import static spark.Spark.*;

public class Main {
    public static void main(String[] args) {
        path("/api/v1", () -> {
            path("/test", () -> {
                get("/hello", (req, res) -> "Hello World!");
            });
        });
    }
}