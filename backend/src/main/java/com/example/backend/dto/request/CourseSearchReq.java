package com.example.backend.dto.request;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class CourseSearchReq {
    private String courseName;
    private String instructorName;
    private LocalDate createdDate;
    private String statusCode;
}
