class gameOverScene extends Phaser.Scene {
    constructor() {
        super("gameOverScene")
    }

    create() {
        this.add.text(345, 290, "YOU LOSE!", {
            fontSize: "32px",
            fill: "#000",
        });
        this.add.text(315, 390,
            "Click here to play again", {
            fontSize: "16px",
            fill: "#000",
        })

        this.input.on("pointerdown", () => {
            this.scene.stop("gameOverScene")
            this.scene.start("Level1")
            this.anims.resumeAll();
        })

    }
}