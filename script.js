document.getElementById('searchButton').addEventListener('click', function() {
    const fileInput = document.getElementById('csvFileInput');
    const searchInput = document.getElementById('searchInput').value.trim();
    const resultsDiv = document.getElementById('results');
    
    if (fileInput.files.length === 0) {
        alert('CSV introuvable.');
        return;
    }

    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        const text = event.target.result;
        const rows = text.split('\n').map(row => row.split(';'));
        const headers = rows[0];
        const data = rows.slice(1);

        const result = data.find(row => row[0].trim() === searchInput);
        if (result) {
            const resultHTML = headers.map((header, index) => `<p><strong>${header}:</strong> ${result[index]}</p>`).join('');
            resultsDiv.innerHTML = resultHTML;
        } else {
            resultsDiv.innerHTML = '<p>No results found.</p>';
        }
    };

    reader.readAsText(file);
});
