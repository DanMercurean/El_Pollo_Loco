/**
 * check the energy of the final boss
 */
function checkBossEnergy() {
    let index = 0;

    setInterval(function () {
        if (thrownBottleX > BOSS_POSITION_X + bg_elements - 100 && thrownBottleX < BOSS_POSITION_X + bg_elements + 100) {
            if (final_boss_energy > 0) {
                final_boss_energy = final_boss_energy - 12;
                AUDIO_GLASS.play();
                bossIsHurt = true;
                currentBossEnergyImage = bossEnergyGraphics[index];
                index++;

            } else if (bossDefeatedAt == 0) {
                bossDefeatedAt = new Date().getTime();
                bossIsDead = true;
                finishLevel();
            }
        }
    }, 100);
}

// /**
//  * draw the final boss
//  */
function drawFinalBoss() {
    let energyBarImage = resolveEndbossEnergyImage();

    addBackgroundObject(bossImage, BOSS_POSITION_X, BOSS_POSITION_Y, 0.26, 1);
    addBackgroundObject(energyBarImage, BOSS_POSITION_X, BOSS_POSITION_Y - 10, 0.26, 1);

}

/**
* Returns image 0, 1, 2, 3.png depending on the energy "endboss_energy"
*/
function resolveEndbossEnergyImage() {
    if (final_boss_energy < 0) {
        return bossEnergyGraphics[5];
    } else if (final_boss_energy < 25) {
        return bossEnergyGraphics[3];
    } else if (final_boss_energy < 50) {
        return bossEnergyGraphics[2];
    } else if (final_boss_energy < 75) {
        return bossEnergyGraphics[1];
    } else {
        return bossEnergyGraphics[0];
    }
}


function calculateBossPosition() {
    let updateBossInterval = setInterval(() => {
        updateBossMovements();
        currentBossIndex++;
    }, 70);
    updateIntervals.push(updateBossInterval);
}

function updateBossMovements() {
    if (final_boss_energy == 100) {
        // if boss enery is intact, he is moving around his initial spot
        calculateWalkingBoss();
    } else if (final_boss_energy < 100) {
        // if boss_energy is reduced, he will attack
        BOSS_POSITION_X -= 15;
    } else if (final_boss_energy < 60) {
        // if boss_energy is reduced, he will attack
        BOSS_POSITION_X -= 20;
    }
}

function calculateWalkingBoss() {
    bossWalkingForward();
    bossWalkingBackward();
}

function bossWalkingForward() {
    if (BOSS_POSITION_X > 4100 && !bossTurning) {
        BOSS_POSITION_X -= 10;
    }
    if (BOSS_POSITION_X <= 4100) {
        bossTurning = true;
    }
}

function bossWalkingBackward() {
    if (BOSS_POSITION_X <= 4300 && bossTurning) {
        BOSS_POSITION_X += 10;
    }
    if (BOSS_POSITION_X >= 4300) {
        bossTurning = false;
    }
}

function changeBossAnimations() {
    let index;
    setInterval(() => {
        animateWalkingBoss(index);
        animateAttackingBoss(index);
        animateHurtBoss(index);
        animateBossDefeat(index);
    }, 125);
}

function animateWalkingBoss(index) {
    if (final_boss_energy <= 100) {
        index = currentBossIndex % bossWalkLeftGraphics.length;
        bossImage = bossWalkLeftGraphics[index];
    }
}

function animateAttackingBoss(index) {
    if (final_boss_energy <= 60 && final_boss_energy > 0) {
        index = currentBossIndex % bossAttackLeftGraphics.length;
        bossImage = bossAttackLeftGraphics[index];
    }
}

function animateHurtBoss(index) {
    if (bossIsHurt) {
        index = currentBossIndex % bossHurtLeftGraphics.length;
        bossImage = bossHurtLeftGraphics[index];
    }
}

function animateBossDefeat(index) {
    if (bossIsDead == true) {
        let timePassed = new Date().getTime() - bossDefeatedAt;
        BOSS_POSITION_X += timePassed * 0.20;
        BOSS_POSITION_Y -= timePassed * 0.54;
        index = currentBossIndex % bossDeadLeftGraphics.length;
        bossImage = bossDeadLeftGraphics[index];
    }
}