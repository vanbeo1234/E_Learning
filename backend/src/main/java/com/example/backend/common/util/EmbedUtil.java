package com.example.backend.common.util;

public class EmbedUtil {

    public static String convertYoutubeUrlToEmbed(String url) {
        // Ví dụ: https://youtube.com/watch?v=abc123 hoặc https://youtu.be/abc123
        if (url == null || url.isBlank())
            return null;

        if (url.contains("watch?v=")) {
            String videoId = url.substring(url.indexOf("watch?v=") + 8);
            return "https://www.youtube.com/embed/" + videoId;
        } else if (url.contains("youtu.be/")) {
            String videoId = url.substring(url.indexOf("youtu.be/") + 9);
            return "https://www.youtube.com/embed/" + videoId;
        }

        return url; // fallback nếu là link khác
    }

    public static String convertImageToFullPath(String filename) {
        return "/image/" + filename;
    }

    public static String convertResourceLink(String url) {
        // Có thể xử lý sau nếu muốn nhúng Google Docs, Slides, PDF viewer...
        return url;
    }
}
