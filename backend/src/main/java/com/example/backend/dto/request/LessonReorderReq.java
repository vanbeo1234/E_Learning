package com.example.backend.dto.request;
import lombok.Data;
import java.util.List;
@Data
public class LessonReorderReq {
    private List<Long> lessonIds;
}
