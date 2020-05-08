class bullet extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        if(gameState.isLookingRight){ 
            var x = gameState.gun.x + 10;   
            var y = gameState.gun.y - 4;     
            } else if(gameState.isLookingLeft){
               var x = gameState.gun.x - 12;
               var y = gameState.gun.y - 2; 
            } 

        super(scene, x, y, "beam");
        gameState.bullets.add(this)
        scene.add.existing(this);
        this.play("shoot");        
        scene.physics.world.enableBody(this)
        this.body.allowGravity = false;

        scene.physics.add.collider(gameState.bullets, gameState.ladders, function (bullet, target) {
            bullet.destroy();
            var explosion = new Explosion(scene, bullet.x, bullet.y);
        }, null, scene);

        scene.physics.add.collider(gameState.bullets, gameState.platforms, function (bullet, target) {
            bullet.destroy();
            var explosion = new Explosion(scene, bullet.x, bullet.y);
        }, null, scene);
    }

    update() {
        if ((gameState.width - gameState.player.x) < ((config.width / 2)) - 16) {
            if ((this.x < ((gameState.width - config.width) + 16)) || (this.x > (gameState.width - 16))){
            this.destroy();
            }
        } else if (gameState.player.x < ((config.width / 2 - 16))){
            if ((this.x < 16) || (this.x > config.width - 16)){
                this.destroy();
                }
        } else if (((gameState.player.x - this.x) > ((config.width / 2) - 16)) || ((this.x - gameState.player.x) > ((config.width / 2) - 16))) {
            this.destroy();
        }
    }
}