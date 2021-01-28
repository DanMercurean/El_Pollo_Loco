// General variables
let canvas;
let ctx;
let character_x = 0;
let character_y = 250;
let isMovingRight = false;
let isMovingLeft = false;
let bg_elements = 0;
let lastJumpStarted = 0;

// -------- Game config 
let JUMP_TIME = 300; // in ms

let imagePaths = ['grafiken/img/charakter_1.png', 'grafiken/img/bg_elem_1.png', 'grafiken/img/bg_elem_2.png'];

/**
* Preload all images. This function should be executed before starting the game.
* imagePaths should contain all images that will be loaded: ['img/image1.png', 'img/image2.png', 'img/image3.png', ...]
*/
function preloadImages() {
    for (let i = 0; i < imagePaths.length; i++) {
        let image = new Image();
        image.src = imagePaths[i];
        images.push(image); // push image-path to images-array (which contains all image-paths)
    }
}

/**
* Check if background-image is already loaded in cache; if not, create new image 
* @param {string} src_path - scr-path of background-image  
*/
function checkBackgroundImageCache(src_path) {
    // Check if image is found in images-array.
    base_image = images.find(function (img) {
        return img.src.endsWith(src_path.substring(src_path, src_path.length));
    })

    // Create new image if not found in cache
    if (!base_image) {
        base_image = new Image();
        base_image.src = src_path;
    }
}

/**
 * This function defines the canvas from the html tag and creates a context for drawing
 */
function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    draw();
    listenForKeys();
}

function draw() {
    drawBackground();
    updateCharacter();
    requestAnimationFrame(draw);
}

function updateCharacter() {
    let base_image = new Image();
    base_image.src = 'grafiken/img/charakter_1.png';

    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
    if (timePassedSinceJump < JUMP_TIME) {
        character_y = character_y - 10;
    } else {
        // Check falling 
        if (character_y < 250) {
            character_y = character_y + 10;
        }
    }

    if (base_image.complete) {
        ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.35, base_image.height * 0.35);
    };
}

function drawBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawGround();
}

function drawGround() {
   

    if (isMovingRight) {
        bg_elements = bg_elements - 2;
    }

    if (isMovingLeft) {
        bg_elements = bg_elements + 2;
    }

    addBackgroundObject('grafiken/img/bg_elem_1.png', 0, 195, 0.6, 0.4);
    addBackgroundObject('grafiken/img/bg_elem_2.png', 450, 120, 0.6, 0.5);
    addBackgroundObject('grafiken/img/bg_elem_1.png', 700, 255, 0.4, 0.6);
    addBackgroundObject('grafiken/img/bg_elem_2.png', 1100, 260, 0.3, 0.2);

     // Draw ground
     ctx.fillStyle = "#FFE699";
     ctx.fillRect(0, 375, canvas.width, canvas.height - 375);
}

function addBackgroundObject(src, offsetX, offsetY, scale, opacity) {
    if (opacity != undefined) {
        ctx.globalAlpha = opacity;
    }
    let base_image = new Image();
    base_image.src = src;
    if (base_image.complete) {
        ctx.drawImage(base_image, offsetX + bg_elements, offsetY, base_image.width * scale, base_image.height * scale);
    };
    ctx.globalAlpha = 1;
}

/**
 *
 * Show to which keys are being pressed or let go and determines an acction for each key
 *
 */
function listenForKeys() {
    document.addEventListener("keydown", e => {
        const k = e.key;
        if (k == 'ArrowRight') {
            isMovingRight = true;
            character_x = character_x + 5;
        }
        if (k == 'ArrowLeft') {
            isMovingLeft = true;
            character_x = character_x - 5;
        }

        let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
        if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {
            lastJumpStarted = new Date().getTime();
        }

    });

    document.addEventListener("keyup", e => {
        const k = e.key;
        if (k == 'ArrowRight') {
            isMovingRight = false;
            character_x = character_x + 5;
        }

        if (k == 'ArrowLeft') {
            isMovingLeft = false;
            character_x = character_x - 5;
        }

        //if (e.code == 'Space') {
        //  isJumping = false;
        // }
    });
}