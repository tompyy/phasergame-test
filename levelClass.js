
class level extends Phaser.Scene {
    constructor(key) {
        super({ key });
        this.levelKey = key;
        this.nextLevel = {
            level1: "level2",
            level2: "endScene",
        };
    }

    create() {
        gameState.active = true;
        gameState.gameOver = false;
        gameState.isOnLadder = false;
        gameState.enemyAlive = false;
        gameState.score = 0;

        // Adding the background 
        gameState.background = this.add.image(0, 0, this.theme).setOrigin(0, 0);

        // Adding the platforms 
        gameState.platforms = this.physics.add.staticGroup();
        gameState.platforms.create(400, 568, "ground").setScale(2).refreshBody();
        gameState.platforms.create(1200, 568, "ground").setScale(2).refreshBody();
        gameState.platforms.create(1600, 568, "ground").setScale(2).refreshBody();

        for (var i = 0; i < this.platformX.length; i++) {
            gameState.platformX = this.platformX[i]
            gameState.platformY = this.platformY[i]

            gameState.platforms.create(gameState.platformX, gameState.platformY, "ground");
        }

        // Adding the door 
        gameState.door = this.physics.add.sprite(gameState.width * 0.98, 155, "door");
        gameState.door.body.setSize(gameState.door.width, gameState.door.height, true);

        // Adding the ladder
        gameState.ladders = this.physics.add.group();
        gameState.ladders.enableBody = true;
        gameState.ladder = gameState.ladders.create(275, 376, "ladder");
        gameState.ladder.body.immovable = true;
        gameState.ladder.body.allowGravity = false;

        // Adding the player 
        gameState.player = new player(this, 100, 504).setScale(1.5)

        // Adding a camera to follow player
        gameState.camera = this.cameras.main
        gameState.camera.setBounds(0, 0, gameState.width, gameState.height);
        this.physics.world.setBounds(0, 0, gameState.width, gameState.height);
        gameState.camera.startFollow(gameState.player, true, 1, 1);

        // Adding three lives 
        gameState.lives = this.add.group()
        gameState.player.create();

        // Adding the stars 
        gameState.stars = this.physics.add.group();

        for (var i = 0; i < 12; i++) {
            gameState.star = new star(this, 12 + (i * 70), 0)[i];
        }

        // Adding the bullets group
        gameState.bullets = this.add.group();

        // Adding the enemies group
        gameState.enemies = this.physics.add.group();

        // Adding the enemy bombs group
        gameState.enemyBombs = this.physics.add.group();
        gameState.enemyBombs.enableBody = true;

        // Adding the score text 
        gameState.scoreText = this.add.text(16, 16, "Score: 0", {
            fontSize: "32px",
            fill: "#000",
        });

        gameState.scoreText.setScrollFactor(0);

        // // Adding the cursors 
        gameState.cursors = this.input.keyboard.createCursorKeys();
        gameState.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        gameState.cKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        gameState.vKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);

        // Adding colliders and overlaps
        this.physics.add.collider(gameState.door, gameState.platforms);
        this.physics.add.collider(gameState.enemies, gameState.platforms);
        this.physics.add.overlap(gameState.player, gameState.enemies, hitPlayer, null, this);
        this.physics.add.overlap(gameState.player, gameState.enemyBombs, hitPlayer, null, this);

        // Time events 
        this.time.addEvent({
            delay: 1000,
            callback: createGun,
            callbackScope: this,
            loop: false,
        });

        this.time.addEvent({
            delay: 8000,
            callback: createEnemyBat,
            callbackScope: this,
            repeat: 4
        });

        this.time.addEvent({
            delay: 5000,
            callback: enemyBombThrown,
            callbackScope: this,
            loop: true,
        });

        // Functions 
        function createGun() {
            gameState.weapons = this.physics.add.group();
            gameState.gun = new gun(this).setScale(1.5);
        };

        function createEnemyBat() {
            if (gameState.gameOver == false) {
                gameState.enemyBat = new enemyBat(this).setScale(2);
            }
        }

        function hitPlayer(player, enemy) {
            gameState.enemyBomb.destroy();
            var explosion = new Explosion(this, gameState.player.x, gameState.player.y).setScale(4);
            gameState.life = gameState.lives.getFirstAlive();
            gameState.life.destroy();
            gameState.active = false;
            gameState.score = 0;
            gameState.scoreText.setText("Score: " + gameState.score);
            gameState.player.disableBody(true, true)
            gameState.gun.destroy();

            this.time.addEvent({
                delay: 500,
                callback: resetPlayer,
                callbackScope: this,
                loop: false
            })
        }

        function resetPlayer() {
            if (gameState.lives.countActive() >= 1) {
                gameState.player.enableBody(true, gameState.player.x = 100, gameState.player.y = 300, true, true)
                gameState.hasGun = false;
                gameState.playerTween = this.tweens.add({
                    targets: gameState.player,
                    y: 490,
                    ease: 'Linear',
                    duration: 1500,
                    yoyo: false,
                    onComplete: function () {
                        gameState.active = true,
                            gameState.isLookingRight = true,
                            gameState.isLookingLeft = false
                        this.time.addEvent({
                            delay: 1000,
                            callback: createGun,
                            callbackScope: this,
                            loop: false,
                        });
                    },
                    onCompleteScope: this,
                })
            }
        }

        function enemyBombThrown() {
            gameState.livingEnemies = [];
            gameState.enemies.getChildren().forEach(function (enemy) {
                gameState.livingEnemies.push(enemy)
            }, this)

            if (gameState.livingEnemies.length > 0) {
                var randomIndex = Phaser.Math.Between(0, gameState.livingEnemies.length - 1);
                gameState.enemyShooter = gameState.livingEnemies[randomIndex];
                gameState.enemyBomb = new enemyBomb(this);
                this.physics.moveToObject(gameState.enemyBomb, gameState.player, 250);
            }
        }
    }

    update() {
        // Update score text 
        gameState.scoreText.setText("Score: " + gameState.score);

        // Including update from Player.js
        gameState.player.update();

        // Gun position  
        if (gameState.hasGun == true && gameState.isLookingRight) {
            gameState.gun.flipX = false;
            gameState.gun.x = gameState.player.x + 16;
            gameState.gun.y = gameState.player.y + 16;

        } else if (gameState.hasGun == true && gameState.isLookingLeft) {
            gameState.gun.flipX = true;
            gameState.gun.x = gameState.player.x - 16;
            gameState.gun.y = gameState.player.y + 16;
        }

        // Disable/enable gun 
        if (Phaser.Input.Keyboard.JustDown(gameState.cKey) && gameState.hasGun == true) {
            gameState.hasGunInPocket = true;
            gameState.hasGun = false;
            gameState.gun.disableBody(true, true);

        } else if (
            Phaser.Input.Keyboard.JustDown(gameState.vKey) && gameState.hasGunInPocket == true) {
            gameState.hasGun = true;
            if (gameState.isLookingLeft) {
                gameState.gun.enableBody(true, gameState.player.x - 16, gameState.player.y + 16, true, true);
            } else if (gameState.isLookingRight) {
                gameState.gun.enableBody(true, gameState.player.x + 16, gameState.player.y + 16, true, true);
            }
        }

        // Friendly bullet
        if (Phaser.Input.Keyboard.JustDown(gameState.spacebar) && gameState.hasGun == true) {
            var projectile = new bullet(this);

            if (gameState.cursors.left.isDown || gameState.isLookingLeft == true) {
                projectile.angle += 270;
                projectile.body.velocity.x = -300;

            } else if (gameState.cursors.right.isDown || gameState.isLookingRight == true) {
                projectile.angle += 90;
                projectile.body.velocity.x = 300;
            }
        }

        // Including update from beam.js
        for (var i = 0; i < gameState.bullets.getChildren().length; i++) {
            var friendlyProjectiles = gameState.bullets.getChildren()[i];
            friendlyProjectiles.update();
        }

        // Including update from enemyBombs.js 
        for (var i = 0; i < gameState.enemyBombs.getChildren().length; i++) {
            var enemyProjectiles = gameState.enemyBombs.getChildren()[i];
            enemyProjectiles.update();
        }

        // Restart level 
        if (gameState.isOnDoor == true) {

            if (gameState.score >= 150) {
                gameState.door.anims.play("open");
                this.time.addEvent({
                    delay: 1000,
                    callback: restart,
                    callbackScope: this,
                    loop: true,
                });
            }
            gameState.isOnDoor = false;

        } else {
            gameState.door.anims.play("closed");
        }

        function restart() {
            gameState.hasGun = false
            this.scene.stop(this.levelKey);
            gameState.isLookingRight = true;
            gameState.isLookingLeft = false;
            this.scene.start(this.nextLevel[this.levelKey]);
        }

        // Game over
        if (gameState.gameOver == true) {
            gameState.hasGun = false;
            this.physics.pause();
            this.anims.pauseAll();
            this.tweens.pauseAll();
            gameState.player.setTint(0xff0000);

            if (gameState.hasGun == true) {
                gameState.gun.setTint(0xff0000);
            }
            this.time.addEvent({
                delay: 2000,
                callback: setgameOver,
                callbackScope: this,
                loop: false,
            })
        }

        function setgameOver() {
            this.scene.stop(gameState.levelKey);
            gameState.isLookingRight = true;
            gameState.isLookingLeft = false;
            this.scene.start("gameOverScene");
        }
    }
}

const gameState = {
    width: 2000,
    height: 600
}