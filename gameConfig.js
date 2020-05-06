const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: "b9eaff",
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
        }
    },
    scene: [bootGame, level1, level2, endScene, gameOverScene]
    
};

const game = new Phaser.Game(config);

