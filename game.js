// General variables
let canvas;
let ctx;
let character_x = 100;
let character_y = 160;
let character_energy = 100;
let final_boss_energy = 100;
let isMovingRight = false;
let isMovingLeft = false;
let bg_elements = 0;
let lastJumpStarted = 0;
let currentCharacterImage = './img/pepe/I-1.png';
let characterGraphicsRight = ['./img/pepe/W-21.png', './img/pepe/W-22.png', './img/pepe/W-23.png', './img/pepe/W-24.png', './img/pepe/W-25.png', './img/pepe/W-26.png'];
let characterGraphicsLeft = ['./img/pepe/WL-21.png', './img/pepe/WL-22.png', './img/pepe/WL-23.png', './img/pepe/WL-24.png', './img/pepe/WL-25.png', './img/pepe/WL-26.png'];
let characterGraphicIndex = 0;
let cloudOffset = 0;
let chickens = [];
let placedBottles = [500, 1000, 1700, 2500, 2800, 3000, 3300];
let collectedBottles = 0;
let bottleThrowTime = 0;
let thrownBottleX = 0;
let thrownBottleY = 0;

// -------- Game config 
let JUMP_TIME = 300; // in ms
let GAME_SPEED = 7;
let AUDIO_RUNNING = new Audio('audio/running.mp3');
let AUDIO_JUMP = new Audio('audio/jump.mp3');
let AUDIO_BOTTLE = new Audio('audio/bottle.mp3');
let AUDIO_THROW = new Audio('audio/throw.mp3');
let AUDIO_CHICKEN = new Audio('audio/chicken.mp3');
let AUDIO_GLASS = new Audio('audio/glass.mp3');
let AUDIO_BACKGROUND_MUSIC = new Audio('audio/music.mp3');
AUDIO_BACKGROUND_MUSIC.loop = true;
AUDIO_BACKGROUND_MUSIC.volume = 0.2;

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
    createChickenList();
    checkForRunning();
    draw();
    calculateCloudOffset();
    listenForKeys();
    calculateChickenPosition();
    checkForCollision();
}

function checkForCollision() {
    setInterval(function () {

        // Check chicken
        for (let i = 0; i < chickens.length; i++) {
            let chicken = chickens[i];
            let chicken_x = chicken.position_x + bg_elements;

            if ((chicken_x - 40) < character_x && (chicken_x + 40) > character_x) {
                if (character_y > 150) {
                    character_energy--;
                }
            }
        }
        // Check bottle
        for (let i = 0; i < placedBottles.length; i++) {
            let bottle_x = placedBottles[i] + bg_elements;

            if ((bottle_x - 40) < character_x && (bottle_x + 40) > character_x) {
                if (character_y > 150) {
                    placedBottles.splice(i, 1);
                    AUDIO_BOTTLE.play();
                    collectedBottles++;
                }
            }
        }

        // Check final Boss 
        if(thrownBottleX > 5000 + bg_elements - 100 && thrownBottleX < 5000 + bg_elements + 100) {
            console.log('Treffer');
            final_boss_energy = final_boss_energy - 10;
            AUDIO_GLASS.play();
        }

    }, 100);
}

function calculateChickenPosition() {
    setInterval(function () {
        for (let i = 0; i < chickens.length; i++) {
            let chicken = chickens[i];
            chicken.position_x = chicken.position_x - chicken.speed;
        }
    }, 50);

}

function createChickenList() {
    chickens = [
        createChicken(1, 700),
        createChicken(2, 1400),
        createChicken(1, 1800),
        createChicken(1, 2500),
        createChicken(1, 3000),
        createChicken(1, 3500)
    ];
}

function calculateCloudOffset() {
    setInterval(function () {
        cloudOffset = cloudOffset + 0.25;
    }, 50);
}

function checkForRunning() {
    setInterval(function () {
        if (isMovingRight) {
            AUDIO_RUNNING.play();
            let index = characterGraphicIndex % characterGraphicsRight.length
            currentCharacterImage = characterGraphicsRight[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }

        if (isMovingLeft) {
            AUDIO_RUNNING.play();
            let index = characterGraphicIndex % characterGraphicsLeft.length
            currentCharacterImage = characterGraphicsLeft[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }

        if (!isMovingRight && !isMovingLeft) {
            AUDIO_RUNNING.pause();
        }
    }, 100);
}

function draw() {
    drawBackground();
    updateCharacter();
    drawChicken();
    drawBottles();
    requestAnimationFrame(draw);
    drawEnergyBar();
    drawInformation();
    drawThrowBottle();
    drawFinalBoss();
}

function drawFinalBoss() {
    let chicken_x = 5000;
    addBackgroundObject('./img/boss/G1.png', chicken_x, 65, 0.3, 1);

    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "red";
    ctx.fillRect(5000 + bg_elements, 95, 2 * final_boss_energy, 10);
    ctx.globalAlpha = 0.2;

    ctx.fillStyle = "black";
    ctx.fillRect(4997 + bg_elements, 92, 205, 15);
    ctx.globalAlpha = 1;
}

function drawThrowBottle() {
    if (bottleThrowTime) {
        let timePassed = new Date().getTime() - bottleThrowTime;
        let gravity = Math.pow(9.81, timePassed / 300);
        thrownBottleX = 125 + (timePassed * 0.6);
        thrownBottleY = 300 - (timePassed * 0.5 - gravity);

        let base_image = new Image();
        base_image.src = './Mexicano - Sprites/6.botella/1.Marcador.png';
        if (base_image.complete) {
            ctx.drawImage(base_image, thrownBottleX, thrownBottleY, base_image.width * 0.1, base_image.height * 0.1);
        }
    }
}

function drawInformation() {
    let base_image = new Image();
    base_image.src = './Mexicano - Sprites/6.botella/1.Marcador.png';
    if (base_image.complete) {
        ctx.drawImage(base_image, 10, 5, base_image.width * 0.1, base_image.height * 0.1);
    }

    ctx.font = '30px Bradley Hand ITC';
    ctx.fillText('x' + collectedBottles, 45, 35);
}

function drawBottles() {
    for (let i = 0; i < placedBottles.length; i++) {
        let bottle_x = placedBottles[i];
        addBackgroundObject('./Mexicano - Sprites/6.botella/1.Marcador.png', bottle_x, 320, 0.2, 1);
    }
}

function drawEnergyBar() {
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = "blue";
    ctx.fillRect(500, 15, 2 * character_energy, 30);
    ctx.globalAlpha = 0.2;

    ctx.fillStyle = "black";
    ctx.fillRect(495, 10, 210, 40);
    ctx.globalAlpha = 1;
}

function drawChicken() {


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
        "speed": (Math.random() * 5)
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
        if (character_y < 160) {
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
    addBackgroundObject('./img/background/cloud2.png', 3900 - cloudOffset, 10, 0.4, 1);
    addBackgroundObject('./img/background/cloud2.png', 4700 - cloudOffset, 10, 0.4, 1);
    addBackgroundObject('./img/background/cloud2.png', 5500 - cloudOffset, 10, 0.4, 1);
    addBackgroundObject('./img/background/cloud2.png', 6500 - cloudOffset, 10, 0.4, 1);
    addBackgroundObject('./img/background/cloud2.png', 7000 - cloudOffset, 10, 0.4, 1);
}

function drawGround() {
    if (isMovingRight) {
        bg_elements = bg_elements - GAME_SPEED;
    }

    if (isMovingLeft && bg_elements < 500) {
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
        addBackgroundObject('./img/background/ground3.png', i * (canvas.width + 1417), -200, 0.56, 1);
        addBackgroundObject('./img/background/ground2.png', i * (canvas.width + 1417), -100, 0.56, 1);
        addBackgroundObject('./img/background/ground1.png', i * (canvas.width + 1417), -125, 0.56, 1);
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
        console.log(k);
        if (k == 'ArrowRight') {
            isMovingRight = true;
            // character_x = character_x + 5;
        }
        if (k == 'ArrowLeft') {
            isMovingLeft = true;
            //character_x = character_x - 5;
        }

        if(k == 'd' && collectedBottles > 0) {
            let timePassed = new Date().getTime() - bottleThrowTime;
            if(timePassed > 1000) {
                collectedBottles--;
                bottleThrowTime = new Date().getTime();
                AUDIO_THROW.play();
            }
        }

        let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
        if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {
            AUDIO_JUMP.play();
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