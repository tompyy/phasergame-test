class star extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y){

        super(scene, x, y, "star")

        scene.add.existing(this);
        scene.physics.add.existing(this);
        scene.physics.world.enableBody(this);
        gameState.stars.add(this)
        
        gameState.stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

        scene.physics.add.collider(gameState.stars, gameState.platforms);
        scene.physics.add.overlap(gameState.player, gameState.stars, collectStar, null, scene);

        function collectStar(player, star) {
            star.disableBody(true, true);
            gameState.score += 10;

            if (gameState.stars.countActive() === 0) {
                gameState.stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true);
                });
            }
        }
    }
}