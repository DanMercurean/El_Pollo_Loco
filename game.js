// General variables
let canvas;
let ctx;
let character_x = 100;
let character_y = 150;
let isMovingRight = false;
let isMovingLeft = false;
let bg_elements = 0;
let lastJumpStarted = 0;
let currentCharacterImage = './img/pepe/I-1.png';
let characterGraphicsRight = ['./img/pepe/W-21.png', './img/pepe/W-22.png', './img/pepe/W-23.png', './img/pepe/W-24.png', './img/pepe/W-25.png', './img/pepe/W-26.png'];
let characterGraphicsLeft = ['./img/pepe/WL-21.png', './img/pepe/WL-22.png', './img/pepe/WL-23.png', './img/pepe/WL-24.png', './img/pepe/WL-25.png', './img/pepe/WL-26.png'];
let characterGraphicIndex = 0;
let cloudOffset = 0;

// -------- Game config 
let JUMP_TIME = 300; // in ms
let GAME_SPEED = 7;

let imagePaths = ['./img/pepe/I-1.png', 'grafiken/img/bg_elem_1.png', 'grafiken/img/bg_elem_2.png'];

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
    checkForRunning();
    draw();
    calculateCloudOffset();
    listenForKeys();
}

function calculateCloudOffset() {
    setInterval(function () {
        cloudOffset = cloudOffset + 0.25;
    }, 50);
}

function checkForRunning() {
    setInterval(function () {
        if (isMovingRight) {
            let index = characterGraphicIndex % characterGraphicsRight.length
            currentCharacterImage = characterGraphicsRight[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }

        if (isMovingLeft) {
            let index = characterGraphicIndex % characterGraphicsLeft.length
            currentCharacterImage = characterGraphicsLeft[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }
        // MovingLeft;
    }, 100);
}

function draw() {
    drawBackground();
    updateCharacter();
    drawChicken();
    requestAnimationFrame(draw);
}

function drawChicken() {
    let chickens = [
        createChicken(1, 300),
        createChicken(2, 400),
        createChicken(1, 500)
    ];

    for (i = 0; i < chickens.length; i = i + 1) {
        let chicken = chickens[i];
        addBackgroundObject(chicken.img, chicken.position_x, chicken.position_y, chicken.scale, 1);
    }
}

function createChicken(type, position_x) {
    return {
        "img": "img/enemy/chicken" + type + ".png",
        "position_x": position_x,
        "position_y": 322,
        "scale": 0.3,
    };
}

function updateCharacter() {
    let base_image = new Image();
    base_image.src = currentCharacterImage;

    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
    if (timePassedSinceJump < JUMP_TIME) {
        character_y = character_y - 10;
    } else {
        // Check falling 
        if (character_y < 150) {
            character_y = character_y + 10;
        }
    }

    if (base_image.complete) {
        ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.20, base_image.height * 0.20);
    };
}

function drawBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawGround();

    //Draw clouds
    addBackgroundObject('./img/background/cloud1.png', 200 - cloudOffset, 20, 0.4, 1);
    addBackgroundObject('./img/background/cloud2.png', 1500 - cloudOffset, 10, 0.4, 1);
    addBackgroundObject('./img/background/cloud1.png', 2200 - cloudOffset, 20, 0.4, 1);
    addBackgroundObject('./img/background/cloud2.png', 3000 - cloudOffset, 10, 0.4, 1);
}

function drawGround() {
    if (isMovingRight) {
        bg_elements = bg_elements - GAME_SPEED;
    }

    if (isMovingLeft) {
        bg_elements = bg_elements + GAME_SPEED;
    }

    addBackgroundObject('grafiken/img/bg_elem_1.png', 0, 195, 0.6, 0.4);
    addBackgroundObject('grafiken/img/bg_elem_2.png', 450, 120, 0.6, 0.5);
    addBackgroundObject('grafiken/img/bg_elem_1.png', 700, 255, 0.4, 0.6);
    addBackgroundObject('grafiken/img/bg_elem_2.png', 1100, 260, 0.3, 0.2);

    addBackgroundObject('grafiken/img/bg_elem_1.png', 1300, 195, 0.6, 0.4);
    addBackgroundObject('grafiken/img/bg_elem_2.png', 1450, 120, 0.6, 0.5);
    addBackgroundObject('grafiken/img/bg_elem_1.png', 1700, 255, 0.4, 0.6);
    addBackgroundObject('grafiken/img/bg_elem_2.png', 2000, 260, 0.3, 0.2);

    // Draw ground
    ctx.fillStyle = "#FFE699";
    ctx.fillRect(0, 375, canvas.width, canvas.height - 375);

    for (let i = -1; i < 10; i++) {
        addBackgroundObject('./img/background/ground1.png', i * (canvas.width + 1392), -125, 0.55, 0.9);
    }
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
            // character_x = character_x + 5;
        }
        if (k == 'ArrowLeft') {
            isMovingLeft = true;
            //character_x = character_x - 5;
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
            //   character_x = character_x + 5;
        }

        if (k == 'ArrowLeft') {
            isMovingLeft = false;
            // character_x = character_x - 5;
        }

        //if (e.code == 'Space') {
        //  isJumping = false;
        // }
    });
}