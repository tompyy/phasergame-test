class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {

        super(scene, x, y, "dude");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setBounce(0.2);
        this.setCollideWorldBounds(true);

        // start position of lives
        gameState.lifeX = config.width;
        gameState.lifeY = 32;
        
        // adjusting collision boundaries after 1 second
        scene.time.addEvent({
            delay: 1000,
            callback: delayDone,
            callbackScope: scene,
            loop: true,
        });

        function delayDone() {
            gameState.player.setSize(gameState.player.width, gameState.player.height, true);
        };
    }

    create(){
        for (var i = 0; i < 3; i++) {
            gameState.life = gameState.lives.create(
                gameState.lifeX - 100 + 30 * i,
                gameState.lifeY,
                "lives").setScale(2.5);
            gameState.life.setScrollFactor(0)
        };
    }

    update(){
         // Player movements 
         if (gameState.active == true) {
            if (gameState.cursors.left.isDown && gameState.gameOver == false) {
                gameState.player.setVelocityX(-160);
                gameState.player.anims.play("left", true);
                gameState.isLookingLeft = true;
                gameState.isLookingRight = false;

                if ((gameState.player.body.y < 472) && gameState.isOnLadder) {
                    gameState.player.anims.play("turn", true);
                    gameState.player.anims.stop("left", true);
                    gameState.player.anims.stop("right", true);
                }

            } else if (gameState.cursors.right.isDown && gameState.gameOver == false) {
                gameState.player.setVelocityX(160);
                gameState.player.anims.play("right", true);
                gameState.isLookingLeft = false;
                gameState.isLookingRight = true;

                if ((gameState.player.body.y < 472) && gameState.isOnLadder) {
                    gameState.player.anims.play("turn", true);
                    gameState.player.anims.stop("left", true);
                    gameState.player.anims.stop("right", true);
                }
            } else if ((gameState.cursors.up.isDown || gameState.cursors.down.isDown) && gameState.isOnLadder == true) {
                gameState.player.anims.play("turn", true);
                gameState.player.setVelocityX(0);

            } else {
                gameState.player.setVelocityX(0);
                gameState.player.anims.stop("left", true);
                gameState.player.anims.stop("right", true);

                if (gameState.isLookingLeft == true && gameState.isOnLadder == false) {
                    gameState.player.anims.play("leftangle", true);

                } else if (gameState.isLookingRight == true && gameState.isOnLadder == false) {
                    gameState.player.anims.play("rightangle", true);
                }
            }
        } else if (gameState.active == false) {
            gameState.player.setVelocityX(0)
            gameState.player.anims.stop("left", true);
            gameState.player.anims.stop("right", true);
            gameState.player.anims.play("lookAtMe", true)
        }

        // Climbing ladder 
        if (gameState.isOnLadder == true) {
            if (gameState.hasGun == true){
                gameState.gun.visible = false;
                gameState.spacebar.enabled = false;
            }

            gameState.isOnPlatform = false;

            if (gameState.cursors.up.isDown) {
                gameState.player.body.velocity.y = -160;

            } else if (gameState.cursors.down.isDown) {
                gameState.player.body.velocity.y = 160;

            } else if (!gameState.cursors.up.isDown && !gameState.cursors.down.isDown) {
                gameState.player.body.velocity.y = -5;
                gameState.player.body.gravity.y = 0;
            }
        } else if (gameState.cursors.up.isDown && gameState.isOnPlatform == true && gameState.player.body.touching.down && gameState.isOnLadder == false) {
            gameState.player.setVelocityY(-330);
            gameState.isOnPlatform = false;
        }

        if (gameState.isOnLadder == false && gameState.hasGun == true) {
            gameState.gun.visible = true;
            gameState.spacebar.enabled = true;
        }

        gameState.isOnLadder = false;

        if (gameState.lives.countActive() < 1) {
            gameState.gameOver = true;
        }

    }
}