class enemyBat extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {

        var x = Phaser.Math.Between(0, 200)
        var y = Phaser.Math.Between(20, 100)

        super(scene, x, y, "bat")

        gameState.enemies.add(this);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);

        gameState.enemyAlive = true
        this.anims.play("bat")
        this.body.allowGravity = false

        scene.physics.add.collider(gameState.bullets, this, function (bullet, target) {
            bullet.destroy()
            target.destroy()
            gameState.score += 10;
            var explosion = new Explosion(scene, bullet.x, bullet.y);
        }, null, scene)

        var xTween = Phaser.Math.Between(600, 800)

        gameState.batTween = scene.tweens.add({
            targets: this,
            x: xTween,
            ease: 'Linear',
            duration: 5000,
            repeat: -1,
            yoyo: true
        })

    }
}