package com.hackathon.health.health.services;

import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.stereotype.Service;

@Service
public class HealthService {
    private final OllamaChatModel chatModel;

    public HealthService(OllamaChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String generateReport(String extractedText) {
        String prompt = "You are an AI assistant integrated into a personalized health monitoring software. This software empowers users to track their health progress over time and make informed decisions alongside their healthcare providers. The software features a dashboard that displays health patterns from imported medical reports and user-provided personal details (e.g., age, weight, height, blood type), and an AI analyst feature where users can upload new medical reports for analysis. Your role in the AI analyst feature is to process the uploaded medical report and provide a concise summary in English, focusing only on the hemoglobin and hematocrit levels present in the current report.\n" +
                "The summary should:\n" +
                "\n" +
                "State the current hemoglobin and hematocrit values from the uploaded report.\n" +
                "Provide a brief, general interpretation of these levels in the context of typical health ranges (e.g., whether they fall within normal limits, such as hemoglobin 12-16 g/dL for adults or hematocrit 36-46% for adults, without diagnosing or providing medical advice).\n" +
                "Use a clear, supportive, and user-friendly tone, encouraging the user to consult their healthcare provider for a detailed evaluation.\n" +
                "Base the analysis solely on the data from the uploaded report, without referencing any previous data or trends.\n" +
                "\n" +
                "Start your response with: \"According to the provided report, ....\" and finish with recommendations for nutrition and physical mobility in 2 sentences. dont mention to go see healthcare providers and the fact that you are just AI assistant, as it is already obvious.  \n" +
                "Please process the following medical report data (provide the data in the input when calling the API) and return the summary accordingly. :\n" + extractedText;

        return chatModel.call(prompt);
    }
}
