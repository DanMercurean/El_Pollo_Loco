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
let bossImage = './img/boss/G5.png';
let bossAlertGraphics = ['./img/boss/G5.png', './img/boss/G6.png', './img/boss/G7.png', './img/boss/G8.png', './img/boss/G9.png', './img/boss/G10.png', './img/boss/G11.png', './img/boss/G12.png'];
let bossWalkLeftGraphics = ['./img/boss/G1.png', './img/boss/G2.png', './img/boss/G3.png', './img/boss/G4.png'];
let bossWalkRightGraphics = ['./img/boss/GR1.png', './img/boss/GR2.png', './img/boss/GR3.png', './img/boss/GR4.png'];
let bossAttackLeftGraphics = ['./img/boss/G13.png', './img/boss/G14.png', './img/boss/G15.png', './img/boss/G16.png', './img/boss/G17.png', './img/boss/G18.png', './img/boss/G19.png', './img/boss/G20.png'];
let bossAttackRightGraphics = ['./img/boss/GR13.png', './img/boss/GR14.png', './img/boss/GR15.png', './img/boss/GR16.png', './img/boss/GR17.png', './img/boss/GR18.png', './img/boss/GR19.png', './img/boss/GR20.png'];
let bossHurtLeftGraphics = ['./img/boss/G21.png', './img/boss/G22.png', './img/boss/G23.png', './img/boss/G21.png', './img/boss/G22.png', './img/boss/G23.png'];
let bossHurtRightGraphics = ['./img/boss/GR21.png', './img/boss/GR22.png', './img/boss/GR23.png', './img/boss/GR21.png', './img/boss/GR22.png', './img/boss/GR23.png'];
let bossDeadLeftGraphics = ['./img/boss/G24.png', './img/boss/G25.png', './img/boss/G26.png'];
let bossDeadRightGraphics = ['./img/boss/GR24.png', './img/boss/GR25.png', './img/boss/GR26.png'];
let bossEnergyGraphics = ['./img/bars/bossenergy1.png', './img/bars/bossenergy2.png', './img/bars/bossenergy3.png', './img/bars/bossenergy4.png', './img/bars/bossenergy5.png', './img/bars/bossenergy6.png'];
let currentBossEnergyImage = './Mexicano - Sprites/7.Marcadores/Marcadorvida_enemy/Naranja.png';
let bossGraphicIndex = 0;
let bossIsFacingRight = false;
let bossIsFacingLeft = true;
let bossIsWalking = false;
let bossIsAlerted = true;
let bossIsAttacking = false;
let bossIsHurt = false;
let bossIsDead = false;
let cloudOffset = 0;
let chickens = [];
let placedBottles = [500, 1000, 1700, 2500, 2800, 3000, 3300];
let collectedBottles = 0;
let bottleThrowTime = 0;
let thrownBottleX = 0;
let thrownBottleY = 0;
let bossDefeatedAt = 0;
let game_finished = false;
let character_lost_at = 0;
let coinGraphics = ['./img/coins/Moneda1.png', './img/coins/Moneda2.png'];
let currentCoinImage = './img/coins/Moneda1.png';
let coinGraphicIndex = 0;
let placedCoins = [];
let collectedCoins = 0;
let lastKeyPressed = 0;
let characterGraphicsSleepRight = ['./img/pepe/I-11.png', './img/pepe/I-12.png', './img/pepe/I-13.png',
    './img/pepe/I-14.png', './img/pepe/I-15.png', './img/pepe/I-16.png', './img/pepe/I-17.png',
    './img/pepe/I-18.png', './img/pepe/I-19.png', './img/pepe/I-20.png'];
let characterGraphicsSleepLeft = ['./img/pepe/IL-11.png', './img/pepe/IL-12.png', './img/pepe/IL-13.png',
    './img/pepe/IL-14.png', './img/pepe/IL-15.png', './img/pepe/IL-16.png', './img/pepe/IL-17.png',
    './img/pepe/IL-18.png', './img/pepe/IL-19.png', './img/pepe/IL-20.png'];
let isFacingRight = true;
let isFacingLeft = false;
let sleeping = false;

// -------- Game config 
let JUMP_TIME = 300; // in ms
let GAME_SPEED = 7;
let BOSS_POSITION = 5000;
let AUDIO_RUNNING = new Audio('audio/running.mp3');
let AUDIO_JUMP = new Audio('audio/jump.mp3');
let AUDIO_BOTTLE = new Audio('audio/bottle.mp3');
let AUDIO_COIN = new Audio('audio/coin.mp3');
let AUDIO_THROW = new Audio('audio/throw.mp3');
let AUDIO_CHICKEN = new Audio('audio/chicken.mp3');
let AUDIO_GLASS = new Audio('audio/glass.mp3');
let AUDIO_WIN = new Audio('audio/win.mp3');
let AUDIO_BACKGROUND_MUSIC = new Audio('audio/music.mp3');
AUDIO_BACKGROUND_MUSIC.loop = true;
AUDIO_BACKGROUND_MUSIC.volume = 0.2;


/**
 * This function defines the canvas from the html tag and creates a context for drawing
 */
function init() {
    preloadImages();
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext("2d");
    createChickenList();
    createCoinList();
    checkForSleep();
    checkForRunning();
    draw();
    calculateCloudOffset();
    listenForKeys();
    calculateChickenPosition();
    checkForCollision();
    lastKeyPressed = new Date().getTime();
}

/**
 * This function checks for collision of the characters.
 */
function checkForCollision() {
    setInterval(function () {

        // Check chicken
        for (let i = 0; i < chickens.length; i++) {
            let chicken = chickens[i];
            let chicken_x = chicken.position_x + bg_elements;

            if ((chicken_x - 40) < character_x && (chicken_x + 40) > character_x) {
                if (character_y > 150) {
                    if (character_energy > 0) {
                        character_energy -= 10;
                    } else {
                        character_lost_at = new Date().getTime();
                        game_finished = true;
                    }

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

        // Check coins

        for (let i = 0; i < placedCoins.length; i++) {
            let coin_x = placedCoins[i]['position_x'] + bg_elements;
            let coin_y = placedCoins[i]['position_y'];
            if ((coin_x - 40) < character_x && (coin_x + 40) > character_x) {
                if ((character_y + 150) > coin_y && character_y < (coin_y + 20)) {
                    placedCoins.splice(i, 1);
                    AUDIO_COIN.play();
                    collectedCoins++;
                }
            }
        }

        // Check final Boss 
        if (thrownBottleX > BOSS_POSITION + bg_elements - 100 && thrownBottleX < BOSS_POSITION + bg_elements + 100) {
            if (final_boss_energy > 0) {
                final_boss_energy = final_boss_energy - 10;
                AUDIO_GLASS.play();
            } else if (bossDefeatedAt == 0) {
                bossDefeatedAt = new Date().getTime();
                finishLevel();
            }
        }
    }, 100);
}

function finishLevel() {
    AUDIO_CHICKEN.play();
    setTimeout(function () {
        AUDIO_WIN.play();
    }, 500);
    game_finished = true;
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
        createChicken(1, 700, 322),
        createChicken(2, 1400, 330),
        createChicken(1, 1800, 322),
        createChicken(1, 2500, 322),
        createChicken(1, 3000, 322),
        createChicken(1, 3500, 322),
        createChicken(1, 3800, 322),
        createChicken(2, 4000, 330),
        createChicken(1, 4500, 322),
        createChicken(1, 4800, 322),
    ];
}

function calculateCloudOffset() {
    setInterval(function () {
        cloudOffset = cloudOffset + 0.25;
    }, 50);
}

/**
 * This function checks for the current image if the character is sleeping.
 */
function checkForSleep() {
    setInterval(function () {

        let timePassed = (new Date().getTime() - lastKeyPressed);

        if (lastKeyPressed != 0 && timePassed > 3000) {
            sleeping = true;
            if (isFacingRight) {
                let index = characterGraphicIndex % characterGraphicsSleepRight.length;
                currentCharacterImage = characterGraphicsSleepRight[index];
                characterGraphicIndex = characterGraphicIndex + 1;
            } else if (isFacingLeft) {
                let index = characterGraphicIndex % characterGraphicsSleepLeft.length;
                currentCharacterImage = characterGraphicsSleepLeft[index];
                characterGraphicIndex = characterGraphicIndex + 1;
            }
        } else {
            sleeping = false;
        }

    }, 200);
}

/**
 * This function is checking for the current image if the character is running.
 */
function checkForRunning() {
    setInterval(function () {
        if (isMovingRight) {
            isFacingRight = true;
            isFacingLeft = false;
            sleeping = false;
            AUDIO_RUNNING.play();
            let index = characterGraphicIndex % characterGraphicsRight.length
            currentCharacterImage = characterGraphicsRight[index];
            characterGraphicIndex = characterGraphicIndex + 1;
        }

        if (isMovingLeft) {
            isFacingRight = false;
            isFacingLeft = true;
            sleeping = false;
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

/**
 * This function initializes the necesary drawings for the canvas
 *  */
function draw() {
    drawBackground();
    if (game_finished) {
        drawFinalScreen();
        // Draw success screen
    } else {
        updateCharacter();
        drawChicken();
        drawBottles();
        drawCoins();
        requestAnimationFrame(draw);
        drawEnergyBar();
        drawInformation();
        drawCoinInformation();
        drawThrowBottle();
    }
    drawFinalBoss();
}

/**
 * This function shows the screen when the game is finished.
 */
function drawFinalScreen() {
    ctx.font = '80px Bradley Hand ITC';
    let msg = 'You won!';

    if (character_lost_at > 0) {
        msg = 'You lost!';
    }
    ctx.fillText(msg, 210, 200);
}

/**
 * This function draws the final boss
 */
function drawFinalBoss() {
    let chicken_x = BOSS_POSITION;
    let chicken_y = 98;
    let bossImage = './img/boss/G1.png';

    if (bossDefeatedAt > 0) {
        let timePassed = new Date().getTime() - bossDefeatedAt;
        chicken_x = chicken_x + timePassed * 0.7;
        chicken_y = chicken_y + timePassed * 0.3;
        bossImage = './img/boss/GR26.png';
    }
    addBackgroundObject(bossImage, chicken_x, 65, 0.3, 1);

    if (bossDefeatedAt == 0) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "red";
        ctx.fillRect(BOSS_POSITION - 30 + bg_elements, 95, 2 * final_boss_energy, 10);
        ctx.globalAlpha = 0.2;

        ctx.fillStyle = "black";
        ctx.fillRect(BOSS_POSITION - 32 + bg_elements, 92, 205, 15);
        ctx.globalAlpha = 1;
    }
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

/**
 * draw information on the canvas about the collected bottels 
 */
function drawInformation() {
    let base_image = new Image();
    base_image.src = './Mexicano - Sprites/6.botella/1.Marcador.png';
    if (base_image.complete) {
        ctx.drawImage(base_image, 10, 5, base_image.width * 0.1, base_image.height * 0.1);
    }

    ctx.font = '30px Bradley Hand ITC';
    ctx.fillText('x' + collectedBottles, 45, 35);
}

/**
 * draw information about the collected coins.
 */
function drawCoinInformation() {
    let base_image = new Image();
    base_image.src = './img/coins/Moneda1.png';
    if (base_image.complete) {
        ctx.drawImage(base_image, 60, -32, base_image.width * 0.4, base_image.height * 0.4);
        ctx.globalAlpha = 1;
    }

    ctx.font = '30px Bradley Hand ITC';
    ctx.fillText('x' + collectedCoins, 145, 35);
}


/**
 * draw the bottles 
 */
function drawBottles() {
    for (let i = 0; i < placedBottles.length; i++) {
        let bottle_x = placedBottles[i];
        addBackgroundObject('./Mexicano - Sprites/6.botella/1.Marcador.png', bottle_x, 320, 0.2, 1);
    }
}

/**
 * draw the coins
 */
function drawCoins() {
    for (let i = 0; i < placedCoins.length; i++) {
        let coin_x = placedCoins[i]['position_x'];
        let coin_y = placedCoins[i]['position_y'];
        addBackgroundObject('./img/coins/Moneda1.png', coin_x, coin_y, 0.5, 1);
    }
}

/**
 * Generate a list of coins.
 */
function createCoinList() {
    placedCoins = [
        placedCoin(600, 150),
        placedCoin(700, 100),
        placedCoin(800, 80),
        placedCoin(900, 100),
        placedCoin(1000, 150),
        placedCoin(2600, 150),
        placedCoin(2700, 100),
        placedCoin(2800, 80),
        placedCoin(2900, 100),
        placedCoin(3000, 150),
        placedCoin(3600, 150),
        placedCoin(3700, 100),
        placedCoin(3800, 80),
        placedCoin(3900, 100),
        placedCoin(4000, 150),
        placedCoin(3600, 150),
        placedCoin(3700, 100),
        placedCoin(3800, 80),
        placedCoin(3900, 100),
        placedCoin(4000, 150),
    ];
}

/**
* This function generates the position of a coin.
* 
* 
* @param {integer} coin_x - Position on the x-axis. 
* @param {integer} coin_y - Positioin on the y-axis.
*/
function placedCoin(coin_x, coin_y) {
    return {
        'position_x': coin_x,
        'position_y': coin_y,
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

/**
 * 
 */
function drawChicken() {
    for (i = 0; i < chickens.length; i = i + 1) {
        let chicken = chickens[i];
        addBackgroundObject(chicken.img, chicken.position_x, chicken.position_y, chicken.scale, 1);
    }
}

function createChicken(type, position_x, position_y) {
    return {
        "img": "img/enemy/chicken" + type + ".png",
        "position_x": position_x,
        "position_y": position_y,
        "scale": 0.3,
        "speed": (Math.random() * 5)
    };
}

function updateCharacter() {
    let base_image = new Image();
    base_image.src = currentCharacterImage;

    let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
    if (timePassedSinceJump < JUMP_TIME) {
        character_y = character_y - 15;
    } else {
        // Check falling 
        if (character_y < 160) {
            character_y = character_y + 15;
        }
    }

    if (base_image.complete) {
        ctx.drawImage(base_image, character_x, character_y, base_image.width * 0.20, base_image.height * 0.20);
    };
}

/**
 * This function draws the background.
 */
function drawBackground() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawSky();
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

/**
 * draw the sky
 */
function drawSky() {
    for (let i = -1; i < 10; i++) {
        addBackgroundObject('./img/background/sky.png', i * 1900, 0, 1, 1);
    }
}

/**
 * draw the ground 
 */
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

/**
 * 
 * @param {string} src - image path 
 * @param {integer} offsetX - position on the x-asis
 * @param {integer} offsetY - position on the y-asis 
 * @param {integer} scale - scalation
 * @param {integer} opacity - opacity
 */
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

        if (k == 'd' && collectedBottles > 0) {
            let timePassed = new Date().getTime() - bottleThrowTime;
            if (timePassed > 1000) {
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