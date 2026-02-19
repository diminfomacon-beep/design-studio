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

