class bootGame extends Phaser.Scene {
    constructor() {
        super("bootGame")
     
    }

    preload() {

        // load all images and sprites
        this.load.image("daylight", "assets/sky2.png");
        this.load.image("night", "assets/night.png");
        this.load.image("ground", "assets/platform.png");
        this.load.image("star", "assets/star.png");
        this.load.image("bomb", "assets/bomb.png");
        this.load.image("ladder", "assets/ladder5.png");
        this.load.image("gun", "assets/smallgun.png");
        this.load.image("lives", "assets/heart.png")
        this.load.spritesheet("bat", "assets/bat.png", {
            frameWidth: 16,
            frameHeight: 16,
        })
        this.load.spritesheet("door", "assets/doors.png", {
            frameWidth: 51,
            frameHeight: 61,
        });
        this.load.spritesheet("dude", "assets/dude2.png", {
            frameWidth: 32,
            frameHeight: 42,
        });
        this.load.spritesheet("dude3", "assets/dude3.png", {
            frameWidth: 32,
            frameHeight: 42,
        })
        this.load.spritesheet("dudewithgun", "assets/dudewithgun.png", {
            frameWidth: 32,
            frameHeight: 42,
        });
        this.load.spritesheet("beam", "assets/beam.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
        this.load.spritesheet("explosion", "assets/explosion.png", {
            frameWidth: 16,
            frameHeight: 16,
        });
    }

    create() {
       
        // initiate leve1
        this.scene.start("level1")

        // create all anims
        this.anims.create({
            key: "bat",
            frames: this.anims.generateFrameNumbers("bat", { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: this.anims.generateFrameNumbers("dude3", { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "lookAtMe",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20
        })


        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "rightangle",
            frames: [{ key: "dude", frame: 5 }],
            frameRate: 20

        });

        this.anims.create({
            key: "leftangle",
            frames: [{ key: "dude", frame: 0 }],
            frameRate: 20
        });

        this.anims.create({
            key: "shoot",
            frames: this.anims.generateFrameNumbers("beam"),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion"),
            frameRate: 20,
            hideOnComplete: true,
            repeat: 0
        });

        this.anims.create({
            key: "open",
            frames: [{ key: "door", frame: 0 }],
            frameRate: 10,
        });

        this.anims.create({
            key: "closed",
            frames: [{ key: "door", frame: 1 }],
            frameRate: 10,
        });

    }
}

