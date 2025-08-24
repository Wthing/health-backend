// script.js
document.addEventListener('DOMContentLoaded', function() {
    // First chart
    const ctx = document.getElementById('bpChart').getContext('2d');
    const bpChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [
                {
                    label: 'Hemoglobin',
                    data: [11, 13, 15, 17, 16, 16, 14],
                    borderColor: '#FF4500',
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    min: 0,
                    max: 20
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // Second chart
    const ctxsec = document.getElementById('bpChartsec').getContext('2d');
    const bpChartsec = new Chart(ctxsec, {
        type: 'line',
        data: {
            labels: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'],
            datasets: [
                {
                    label: 'Hematocrit',
                    data: [39, 42, 42, 45, 41, 40, 38], // Different data for distinction
                    borderColor: '#FFA500',
                    tension: 0.4,
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    min: 0,
                    max: 50
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
});

// Event Listeners for Page-Specific Buttons
document.addEventListener('DOMContentLoaded', function() {
    // Upload Page: Handle Analyse Button (Demo Navigation)
    const analyseButton = document.getElementById('analyse-button');
    const fileUpload = document.getElementById('file-upload');
    const errorMessage = document.getElementById('error-message');
    const uploadedImage = document.getElementById('uploaded-image');
    if (analyseButton) {
        // Initially disable the analyse button
        analyseButton.disabled = false;

        analyseButton.addEventListener('click', function() {
            if (!fileUpload.files.length) {
                errorMessage.textContent = 'Please upload a file before analysing.';
                errorMessage.style.display = 'block';
                analyseButton.disabled = true; // Ensure button stays disabled if no file
            } else {
                // Proceed with analysis (demo navigation)
                window.location.href = 'results.html';
            }
        });
    }

    if (uploadedImage) {
        const storedFile = localStorage.getItem('uploadedFile');
        if (storedFile) {
            if (storedFile.startsWith('data:image/')) {
                uploadedImage.innerHTML = `<img src="${storedFile}" style="max-width: 200px; max-height: 200px; border-radius: 10px;">`;
            } else if (storedFile.startsWith('data:application/pdf')) {
                uploadedImage.innerHTML = `<embed src="${storedFile}" type="application/pdf" style="width: 200px; height: 200px;">`;
            }
            uploadedImage.style.display = 'block';
        }
    }

    // Results Page: Handle Add to Dashboard Button
    const addButton = document.querySelector('.add-to-dashboard');
    if (addButton) {
        addButton.addEventListener('click', function() {
            // In real app, update dashboard data; for demo, navigate back
            window.location.href = 'hey.html';
        });
    }

    // File Upload and Image Handling

    if (fileUpload && errorMessage && uploadedImage) {
        fileUpload.addEventListener('change', function() {
            if (fileUpload.files.length > 0) {
                errorMessage.style.display = 'none'; // Hide error if file is selected
                if (analyseButton) analyseButton.disabled = false; // Enable analyse button

                // Display image if it's an image file
                const file = fileUpload.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    const fileData = e.target.result;
                    if (file.type.startsWith('image/')) {
                        uploadedImage.innerHTML = `<img src="${fileData}" style="max-width: 200px; max-height: 200px; border-radius: 10px;">`;
                        uploadedImage.style.display = 'block';
                        localStorage.setItem('uploadedFile', fileData); // Store for results page
                    } else if (file.type === 'application/pdf') {
                        uploadedImage.innerHTML = `<embed src="${fileData}" type="application/pdf" style="width: 200px; height: 200px;">`;
                        uploadedImage.style.display = 'block';
                        localStorage.setItem('uploadedFile', fileData); // Store for results page
                    } else {
                        uploadedImage.innerHTML = `<p>File type not supported for preview. Content: ${fileData.substring(0, 50)}...</p>`;
                        uploadedImage.style.display = 'block';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
});
