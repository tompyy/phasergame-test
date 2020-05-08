class gun extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {

        var x = Phaser.Math.Between(20, 780);
        var y = Phaser.Math.Between(0, 5);

        super(scene, x, y, "gun")
        gameState.weapons.add(this)
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);
        this.setBounce(0.4);
    
        scene.physics.add.collider(this, gameState.platforms);

        scene.physics.add.overlap(this, gameState.player, function (gun, target) {
            gameState.hasGun = true;
            gun.x = target.x + 16
            gun.y = target.y + 16
            gameState.gun.body.allowGravity = false;
        }, null, scene);
    }



}