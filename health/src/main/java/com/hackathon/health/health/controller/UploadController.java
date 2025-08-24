package com.hackathon.health.health.controller;

import com.hackathon.health.health.services.HealthService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@Controller
@RequestMapping("/upload")
public class UploadController {

    private final HealthService reportService;
    public UploadController(HealthService reportService) {
        this.reportService = reportService;
    }

    @PostMapping("/add")
    public String handleFileUpload(MultipartFile file, Model model) throws IOException {
        if (file.isEmpty()) {
            model.addAttribute("message", "Файл не выбран!");
            return "upload";
        }

        Path tempPath = Files.createTempFile("analysis-", file.getOriginalFilename());
        file.transferTo(tempPath.toFile());

        String extractedText = "Данные из документа " + file.getOriginalFilename();

        String report = reportService.generateReport(extractedText);

        model.addAttribute("message", "Файл успешно загружен!");
        model.addAttribute("report", report);

        return "results";
    }

}
