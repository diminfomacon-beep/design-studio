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


