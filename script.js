// 1. Initialize the Canvas
const canvas = new fabric.Canvas('canvas');

// 2. Function to add editable text
function addText() {
    const text = new fabric.IText('Type something...', {
        left: 100,
        top: 100,
        fontFamily: 'arial',
        fill: '#333'
    });
    canvas.add(text);
}

// 3. Handle Local Image Uploads
document.getElementById('upload').onchange = function(e) {
    const reader = new FileReader();
    reader.onload = function(event) {
        fabric.Image.fromURL(event.target.result, function(img) {
            img.scaleToWidth(200); // Prevent massive images
            canvas.add(img);
            canvas.renderAll();
        });
    };
    reader.readAsDataURL(e.target.files[0]);
};

// 4. Delete Function
function deleteSelected() {
    const activeObjects = canvas.getActiveObjects();
    canvas.discardActiveObject();
    canvas.remove(...activeObjects);
}

const UNSPLASH_KEY = 'YOUR_UNSPLASH_ACCESS_KEY';

async function searchUnsplash() {
    const query = document.getElementById('imageSearch').value;
    const url = `https://api.unsplash.com{query}&client_id=${Z-a_ubE9NWNeF8tLL7QM4LjHdrIW7_RE0ZHUWAUi_zU}&per_page=5`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        console.error("Error fetching from Unsplash:", error);
    }
}

function displayResults(images) {
    const container = document.getElementById('searchResults');
    container.innerHTML = ''; // Clear old results

    images.forEach(img => {
        const thumb = document.createElement('img');
        thumb.src = img.urls.thumb;
        thumb.style.height = "80px";
        thumb.style.cursor = "pointer";
        
        // When user clicks a thumbnail, add high-res version to canvas
        thumb.onclick = () => {
            fabric.Image.fromURL(img.urls.regular, function(fabricImg) {
                fabricImg.scaleToWidth(200);
                canvas.add(fabricImg);
                canvas.centerObject(fabricImg);
                canvas.renderAll();
            }, { crossOrigin: 'anonymous' }); // Required for saving images later
        };
        container.appendChild(thumb);
    });
}
function downloadDesign() {
    // 1. Deselect everything so the "selection boxes" don't show up in the print
    canvas.discardActiveObject();
    canvas.renderAll();

    // 2. Convert canvas to a high-res Data URL (PNG)
    const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1.0,
        multiplier: 2 // This doubles the resolution for better print quality
    });

    // 3. Create a temporary link to "click" and trigger download
    const link = document.createElement('a');
    link.download = 'custom-design.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}



