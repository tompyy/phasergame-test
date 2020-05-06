class Beam extends Phaser.GameObjects.Sprite {
    constructor(scene) {

        // var x = scene.gun.x + 10;
        // var y = scene.gun.y - 4;

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
    }

    update() {
        if (this.x > 784 || this.x < 16) {
            this.destroy();
        }

        
    }
}