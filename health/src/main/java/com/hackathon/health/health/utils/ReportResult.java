package com.hackathon.health.health.utils;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;

public class ReportResult {
    private String summary;
    private List<String> patterns;

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public List<String> getPatterns() {
        return patterns;
    }

    public void setPatterns(List<String> patterns) {
        this.patterns = patterns;
    }

    public static ReportResult fromJson(String json) {
        try {
            return new ObjectMapper().readValue(json, ReportResult.class);
        } catch (Exception e) {
            throw new RuntimeException("Ошибка парсинга JSON ответа AI", e);
        }
    }
}

