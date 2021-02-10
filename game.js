// General variables
let canvas;
let ctx;
let character_x = 100;
let character_y = 160;
let character_energy = 100;
let final_boss_energy = 100;
let isMovingRight = false;
let isMovingLeft = false;
let isJumping = false;
let bg_elements = 0;
let lastJumpStarted = 0;
let currentCharacterImage = './img/pepe/I-1.png';
let characterGraphicsRight = ['./img/pepe/W-21.png', './img/pepe/W-22.png', './img/pepe/W-23.png', './img/pepe/W-24.png', './img/pepe/W-25.png', './img/pepe/W-26.png'];
let characterGraphicsLeft = ['./img/pepe/WL-21.png', './img/pepe/WL-22.png', './img/pepe/WL-23.png', './img/pepe/WL-24.png', './img/pepe/WL-25.png', './img/pepe/WL-26.png'];
let characterGraphicsJumpRight = ['./img/pepe/J-31.png', './img/pepe/J-32.png', './img/pepe/J-33.png', './img/pepe/J-34.png', './img/pepe/J-35.png', './img/pepe/J-36.png', './img/pepe/J-37.png', './img/pepe/J-38.png', './img/pepe/J-39.png'];
let characterGraphicsJumpLeft = ['./img/pepe/JL-31.png', './img/pepe/JL-32.png', './img/pepe/JL-33.png', './img/pepe/JL-34.png', './img/pepe/JL-35.png', './img/pepe/JL-36.png', './img/pepe/JL-37.png'];
let characterGraphicIndex = 0;
let bossImage = './img/boss/G1.png';
let bossAlertGraphics = ['./img/boss/G5.png', './img/boss/G6.png', './img/boss/G7.png', './img/boss/G8.png', './img/boss/G9.png', './img/boss/G10.png', './img/boss/G11.png', './img/boss/G12.png'];
let bossWalkLeftGraphics = ['./img/boss/G1.png', './img/boss/G2.png', './img/boss/G3.png', './img/boss/G4.png'];
let bossWalkRightGraphics = ['./img/boss/GR1.png', './img/boss/GR2.png', './img/boss/GR3.png', './img/boss/GR4.png'];
let bossAttackLeftGraphics = ['./img/boss/G13.png', './img/boss/G14.png', './img/boss/G15.png', './img/boss/G16.png', './img/boss/G17.png', './img/boss/G18.png', './img/boss/G19.png', './img/boss/G20.png'];
let bossAttackRightGraphics = ['./img/boss/GR13.png', './img/boss/GR14.png', './img/boss/GR15.png', './img/boss/GR16.png', './img/boss/GR17.png', './img/boss/GR18.png', './img/boss/GR19.png', './img/boss/GR20.png'];
let bossHurtLeftGraphics = ['./img/boss/G21.png', './img/boss/G22.png', './img/boss/G23.png', './img/boss/G21.png', './img/boss/G22.png', './img/boss/G23.png'];
let bossHurtRightGraphics = ['./img/boss/GR21.png', './img/boss/GR22.png', './img/boss/GR23.png', './img/boss/GR21.png', './img/boss/GR22.png', './img/boss/GR23.png'];
let bossDeadLeftGraphics = ['./img/boss/G24.png', './img/boss/G25.png', './img/boss/G26.png'];
let bossDeadRightGraphics = ['./img/boss/GR24.png', './img/boss/GR25.png', './img/boss/GR26.png'];
let bossEnergyGraphics = ['./img/bars/100.png', './img/bars/80.png', './img/bars/60.png', './img/bars/40.png', './img/bars/20.png', './img/bars/0.png'];
let currentBossEnergyImage = './img/bars/100.png';
let bossGraphicIndex = 0;
let bossIsFacingRight = false;
let bossIsFacingLeft = true;
let bossIsWalking = false;
let bossWalksRight = true;
let bossIsAlerted = true;
let bossIsAttacking = false;
let bossIsHurt = false;
let bossIsDead = false;
let index_hurt;
let index_attack;
let cloudOffset = 0;
let chickens = [];
let currentChickenImage = 'Mexicano - Sprites/3.Secuencias_Enemy_b+ísico/Versi+-n_pollito/1.Paso_derecho.png';
let chickenGraphics = ['Mexicano - Sprites/3.Secuencias_Enemy_b+ísico/Versi+-n_pollito/1.Paso_derecho.png',
    'Mexicano - Sprites/3.Secuencias_Enemy_b+ísico/Versi+-n_pollito/2.Centro.png',
    'Mexicano - Sprites/3.Secuencias_Enemy_b+ísico/Versi+-n_pollito/3.Paso_izquierdo.png'];
let chickenGraphicIndex = 0;
let currentHenImage = 'Mexicano - Sprites/3.Secuencias_Enemy_b+ísico/Versi+-n_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png';
let hens = [];
let hensGraphics = ['Mexicano - Sprites/3.Secuencias_Enemy_b+ísico/Versi+-n_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
    'Mexicano - Sprites/3.Secuencias_Enemy_b+ísico/Versi+-n_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
    'Mexicano - Sprites/3.Secuencias_Enemy_b+ísico/Versi+-n_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'];
let hensGraphicIndex = 0;
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

let musicIsOn = true;
let musicIsOff = false;
let soundIsOn = true;
let soundIsOff = false;


// -------- Game config 
let JUMP_TIME = 300; // in ms
let GAME_SPEED = 7;
let BOSS_POSITION_X = 5000;
let BOSS_POSITION_Y = 98;
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
    draw();
}

function loadGame() {
    AUDIO_BACKGROUND_MUSIC.play();
    createChickenList();
    createHensList();
    checkForChicken();
    checkForHens();
    createCoinList();
    checkForSleep();
    requestAnimationFrame(checkForJumping);
    checkForRunning();
    checkForBoss();
    calculateCloudOffset();
    listenForKeys();
    calculateChickenPosition();
    calculateHenPosition();
    checkForCollision();
    checkBossEnergy();
    lastKeyPressed = new Date().getTime();
}
/**
 * close start-button 
 */
function closeStart() {
    document.getElementById('start_button').classList.add('d-none');
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

        // Check hen
        for (let i = 0; i < hens.length; i++) {
            let hen = hens[i];
            let hen_x = hen.position_x + bg_elements;

            if ((hen_x - 40) < character_x && (hen_x + 40) > character_x) {
                if (character_y > 150) {
                    if (character_energy > 0) {
                        character_energy -= 10;
                        //isHurt = true;
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
                    AUDIO_COIN.currentTime = 0;
                    collectedCoins++;
                }
            }
        }

    }, 100);
}

/**
 * check the energy of the final boss
 */
function checkBossEnergy() {
let index = 0;
    setInterval(function () {
        if (thrownBottleX > BOSS_POSITION_X + bg_elements - 100 && thrownBottleX < BOSS_POSITION_X + bg_elements + 100) {
            if (final_boss_energy > 0) {
                final_boss_energy = final_boss_energy - 10;
                AUDIO_GLASS.play();
                bossIsHurt = true;
                index++;
                currentBossEnergyImage = bossEnergyGraphics[index];

            } else if (bossDefeatedAt == 0) {
                bossDefeatedAt = new Date().getTime();
                finishLevel();
            }
        }
    }, 100);
}

/**
 * check if the level is over
 */
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

function calculateHenPosition() {

    setInterval(function () {
        for (let index = 0; index < hens.length; index++) {
            let hen = hens[index];

            // if (!hen.dead) {
            hen.position_x = hen.position_x - hen.speed;
            // }
        }
    }, 50);

}


/**
 * check for the current image of the chicken.
 */
function checkForChicken() {
    setInterval(function () {

        let index = chickenGraphicIndex % chickenGraphics.length; //Infinte loop
        currentChickenImage = chickenGraphics[index];
        chickenGraphicIndex = chickenGraphicIndex + 1;

    }, 125);
}


function createChickenList() {
    chickens = [
        createChicken(1, 700, 330),
        createChicken(2, 1400, 330),
        createChicken(1, 2500, 330),
        createChicken(1, 3000, 330),
        createChicken(1, 3500, 330),
        createChicken(1, 3800, 330),
        createChicken(2, 4000, 330),
    ];
}

function drawHen() {
    for (let i = 0; i < hens.length; i++) {
        let hen = hens[i];
        let image = currentHenImage;

        //   if (hen.dead) {
        //     image = 'Mexicano - Sprites/3.Secuencias_Enemy_b+ísico/Versi+-n_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png';
        //   }

        addBackgroundObject(image, hen.position_x, hen.position_y, hen.scale, 1);
    }
}



function checkForHens() {
    setInterval(function () {

        let index = hensGraphicIndex % hensGraphics.length; //Infinite loop
        currentHenImage = hensGraphics[index];
        hensGraphicIndex = hensGraphicIndex + 1;

    }, 125);
}

function createHensList() {
    hens = [
        createChicken(1, 1000, 322),
        createChicken(1, 1800, 322),
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
 * is checking for the current image if the character is jumping
 */
function checkForJumping() {
    let index;
    setInterval(() => {
        if (isJumping && isFacingRight) {
            if (index == 6) {
                isJumping = false;
                index = 0;
                characterGraphicIndex = 0;
            }
            index = characterGraphicIndex % characterGraphicsJumpRight.length;
            currentCharacterImage = characterGraphicsJumpRight[index];
            characterGraphicIndex = characterGraphicIndex + 1;

        }
        if (isJumping && isFacingLeft) {
            if (index == 6) {
                isJumping = false;
                index = 0;
                characterGraphicIndex = 0;
            }
            index = characterGraphicIndex % characterGraphicsJumpLeft.length;
            currentCharacterImage = characterGraphicsJumpLeft[index];
            characterGraphicIndex = characterGraphicIndex + 1;

        }
    }, 125);
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
        drawHen();
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
    AUDIO_BACKGROUND_MUSIC.muted = true;
    let msg = 'You won!';

    if (character_lost_at > 0) {
        msg = 'You lost!';
    }
    ctx.fillText(msg, 210, 200);
}

/**
 * draw the final boss
 */
function drawFinalBoss() {
    let chicken_x = BOSS_POSITION_X;
    let chicken_y = 98;
    // let bossImage = './img/boss/G1.png';
    //let index = 0;

    if (bossIsWalking && bossIsFacingLeft) {
        BOSS_POSITION_X = BOSS_POSITION_X - 5;
    }
    if (bossIsWalking && bossIsFacingRight) {
        BOSS_POSITION_X = BOSS_POSITION_X + 5;
    }

    let difference = character_x - (BOSS_POSITION_X + bg_elements);

    if (bossIsFacingLeft && difference > 500) {
        bossIsFacingLeft = false;
        bossIsFacingRight = true;
    }
    if (bossIsFacingRight && difference < -500) {
        bossIsFacingLeft = true;
        bossIsFacingRight = false;
    }

    if (bossDefeatedAt > 0) {
        let timePassed = new Date().getTime() - bossDefeatedAt;
        chicken_x = chicken_x + timePassed * 0.2;
        chicken_y = chicken_y - timePassed * 0.15;
        // index++;
        // bossImage = bossDeadLeftGraphics[index];
    }
    addBackgroundObject(bossImage, chicken_x, 65, 0.3, 1);
    bossEnergyBar();
}

/**
 * Check for the current image of the chicken boss.
 */
function checkForBoss() {
    setInterval(function () {
        bossWalksRight = !bossWalksRight;
        // BOSS_POSITION_X -= 15;
    }, 500);

    setInterval(function () {
  
      bossAlerted();
      bossWalking();
      bossAttacks();
      bossHurt();
      bossDead();
  
    }, 125);
  
  }
  
  /**
   * Check for the current image if the chicken boss is alerted.
   */
  function bossAlerted() {
    if (bossIsAlerted) {
      let index = bossGraphicIndex % bossAlertGraphics.length;
      currentBossImage = bossAlertGraphics[index];
      bossGraphicIndex++;
  
      if (bg_elements < -4500) {
        setTimeout(function () {
          bossIsWalking = true;
          bossIsAlerted = false;
          bossGraphicIndex = 0;
        }, 1000);
      }
    }
  }

  /**
     * Animate boss-graphics in walking mode  
     * @param {number} index - index of current boss-graphic
     */
function bossWalking(index) {
    if (final_boss_energy == 100) {
        index = bossGraphicIndex % bossWalkLeftGraphics.length;
        currentBossImage = bossWalkLeftGraphics[index];
        bossGraphicIndex++;
    }
}
  
  /**
   * Check for the current image if the chicken boss is walking.
   */
//   function bossWalking() {
//     if (bossIsWalking && bossIsFacingLeft) {
//       let index = bossGraphicIndex % bossWalkLeftGraphics.length;
//       currentBossImage = bossWalkLeftGraphics[index];
//       bossGraphicIndex++;
//     }
  
//     if (bossIsWalking && bossIsFacingRight) {
//       let index = bossGraphicIndex % bossWalkRightGraphics.length;
//       currentBossImage = bossWalkRightGraphics[index];
//       bossGraphicIndex = bossGraphicIndex + 1;
//     }
//   }
  
  /**
   * Check for the current image if the chicken boss is attacking.
   */
  function bossAttacks() {
    if (bossIsAttacking && bossIsFacingLeft) {
      index_attack = bossGraphicIndex % bossAttackLeftGraphics.length;
      currentBossImage = bossAttackLeftGraphics[index_attack];
      bossGraphicIndex = bossGraphicIndex + 1
  
      setTimeout(function () {
        bossIsAttacking = false;
        bossIsWalking = true;
        bossGraphicIndex = 0;
        index_attack = 0;
      }, 1000);
    }
  
    if (bossIsAttacking && bossIsFacingRight) {
      index_attack = bossGraphicIndex % bossAttackRightGraphics.length;
      currentBossImage = bossAttackRightGraphics[index_attack];
      bossGraphicIndex = bossGraphicIndex + 1
  
      setTimeout(function () {
        bossIsAttacking = false;
        bossIsWalking = true;
        bossGraphicIndex = 0;
        index_attack = 0;
      }, 1000);
    }
  }
  
  /**
   * Check for the current image if the chicken boss is hurt.
   */
  function bossHurt() {
    if (bossIsHurt && bossIsFacingLeft) {
      bossIsAlerted = false;
      bossIsWalking = false;
      bossIsAttacking = false;
  
      if (index_hurt == 5) {
        bossIsAttacking = true;
        bossIsHurt = false;
        index_hurt = 0;
        bossGraphicIndex = 0;
  
      } else {
        index_hurt = bossGraphicIndex % bossHurtLeftGraphics.length;
        currentBossImage = bossHurtLeftGraphics[index_hurt];
        bossGraphicIndex = bossGraphicIndex + 1;
      }
    }
  
    if (bossIsHurt && bossIsFacingRight) {
      bossIsAlerted = false;
      bossIsWalking = false;
      bossIsAttacking = false;
  
      if (index_hurt == 5) {
        bossIsAttacking = true;
        bossIsHurt = false;
        index_hurt = 0;
        bossGraphicIndex = 0;
  
      } else {
        index_hurt = bossGraphicIndex % bossHurtRightGraphics.length;
        currentBossImage = bossHurtRightGraphics[index_hurt];
        bossGraphicIndex = bossGraphicIndex + 1;
      }
    }
  }
  
  /**
   * Check for the current image if the chicken boss is dead.
   */
  function bossDead() {
    if (bossIsDead && bossIsFacingLeft) {
      bossIsAlerted = false;
      bossIsWalking = false;
      bossIsAttacking = false;
      bossIsHurt = false;
      let index = bossGraphicIndex % bossDeadLeftGraphics.length;
      currentBossImage = bossDeadLeftGraphics[index];
      bossGraphicIndex = bossGraphicIndex + 1;
    }
  
    if (bossIsDead && bossIsFacingRight) {
      bossIsAlerted = false;
      bossIsWalking = false;
      bossIsAttacking = false;
      bossIsHurt = false;
      let index = bossGraphicIndex % bossDeadRightGraphics.length;
      currentBossImage = bossDeadRightGraphics[index];
      bossGraphicIndex = bossGraphicIndex + 1;
    }
  }
  



/**
 * energy bar of the chicken boss
 */
function bossEnergyBar() {
    if (bossDefeatedAt == 0) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "red";
        ctx.fillRect(BOSS_POSITION_X - 30 + bg_elements, 95, 2 * final_boss_energy, 10);
        ctx.globalAlpha = 0.2;

        ctx.fillStyle = "black";
        ctx.fillRect(BOSS_POSITION_X - 32 + bg_elements, 92, 205, 15);
        ctx.globalAlpha = 1;
    }
}

/**
 * draw the bottles 
 */
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
 * draw the chicken 
 */
function drawChicken() {
    for (i = 0; i < chickens.length; i = i + 1) {
        let chicken = chickens[i];
        let image = currentChickenImage;
        addBackgroundObject(image, chicken.position_x, chicken.position_y, chicken.scale, 1);
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
        lastKeyPressed = new Date().getTime();
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
            lastKeyPressed = new Date().getTime();
            let timePassed = new Date().getTime() - bottleThrowTime;
            if (timePassed > 1000) {
                collectedBottles--;
                bottleThrowTime = new Date().getTime();
                AUDIO_THROW.play();
            }
        }

        let timePassedSinceJump = new Date().getTime() - lastJumpStarted;
        if (e.code == 'Space' && timePassedSinceJump > JUMP_TIME * 2) {
            isJumping = true;
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

/**
 * turn off the music.
 */
function turnMusicOff() {

    document.addEventListener("keydown", e => {

        if (e.key == 'm' && musicIsOn) {
            AUDIO_BACKGROUND_MUSIC.muted = true;

            setTimeout(function () {
                musicIsOn = false;
                musicIsOff = true;
            }, 100);
        }

        if (e.key == 'm' && musicIsOff) {
            AUDIO_BACKGROUND_MUSIC.muted = false;

            setTimeout(function () {
                musicIsOn = true;
                musicIsOff = false;
            }, 100);
        }

    });
}