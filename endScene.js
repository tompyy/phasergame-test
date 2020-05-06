class endScene extends Phaser.Scene {
    constructor() {
        super("endScene")
    }

    create() {
        this.add.text(345, 290, "YOU WON!", {
            fontSize: "32px",
            fill: "#000",
        });
        this.add.text(315, 390,
            "Click here to play again", {
            fontSize: "16px",
            fill: "#000",
        })

        this.input.on("pointerdown", () => {
            this.scene.stop("endScene")
            this.scene.start("level1")
            this.anims.resumeAll();
        })
    }
}
