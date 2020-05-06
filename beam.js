class Beam extends Phaser.GameObjects.Sprite {
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
        // this.setScrollFactor(0) 
    }

    update() {
        
        if (this.x > gameState.camera.displayWidth - 16 || this.x < gameState.camera.displayWidth - 784) {
            this.destroy();
        }

        
    }
}