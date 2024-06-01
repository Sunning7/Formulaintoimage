function renderFormula() {
    const formula = document.getElementById('formulaInput').value;
    const formulaContainer = document.getElementById('formulaContainer');
    const formulaCanvas = document.getElementById('formulaCanvas');
    const resultDiv = document.getElementById('result');

    // Clear previous results
    formulaContainer.innerHTML = '';
    resultDiv.innerHTML = '';

    // Render formula using MathJax
    formulaContainer.innerHTML = `\\[${formula}\\]`;
    MathJax.typesetPromise([formulaContainer]).then(() => {
        // Create image from rendered formula
        const svg = formulaContainer.querySelector('svg');
        const xml = new XMLSerializer().serializeToString(svg);
        const svg64 = btoa(xml);
        const b64Start = 'data:image/svg+xml;base64,';
        const image64 = b64Start + svg64;

        const img = new Image();
        img.onload = function() {
            // Draw the image on the canvas
            formulaCanvas.width = img.width;
            formulaCanvas.height = img.height;
            const ctx = formulaCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // Convert canvas to image
            const imgURL = formulaCanvas.toDataURL('image/png');
            const resultImg = document.createElement('img');
            resultImg.src = imgURL;
            resultDiv.appendChild(resultImg);
        };
        img.src = image64;
    }).catch((err) => console.error('Error rendering formula:', err));
}