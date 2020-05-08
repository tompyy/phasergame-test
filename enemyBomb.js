class enemyBomb extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        var x = gameState.enemyShooter.x;
        var y = gameState.enemyShooter.y;
    
        super(scene, x, y, "bomb");
        gameState.enemyBombs.add(this)
        scene.add.existing(this);        
        scene.physics.world.enableBody(this)
        this.body.allowGravity = false;  

        scene.physics.add.collider(gameState.enemyBombs, gameState.platforms, function (bomb, target) {
            bomb.destroy();
            var explosion = new Explosion(scene, bomb.x, bomb.y).setScale(2);
        }, null, scene);
    }

    update() {
        if (this.x > (gameState.width - 16) || this.x < 16) {
            this.destroy();
        } 
    
    }

}
