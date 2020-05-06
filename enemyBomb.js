class enemyBomb extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        var x = gameState.enemyShooter.x;
        var y = gameState.enemyShooter.y;
    
        super(scene, x, y, "bomb");
        gameState.enemyBombs.add(this)
        scene.add.existing(this);        
        scene.physics.world.enableBody(this)
        this.body.allowGravity = false;  
    }

    update() {
        if (this.x > 780 || this.x < 20) {
            this.destroy();
        } 
    
    }

}
