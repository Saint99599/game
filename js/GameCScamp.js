import MainScene from "./MainScene.js";

const config = {
    width : 800,
    height : 736,
    backgroundColor : '#999999',
    type : Phaser.AUTO,
    parent : 'GameCScamp',
    scene : [MainScene],
    scale : {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics : {
        default : 'matter',
        matter : {
            debug : true,
            gravity : {y:0},
        }
    },
    Plugins : {
        scene : [
            {
                plugin : PhaserMatterCollisionPlugin,
                key : 'matterCollision',
                mapping : 'matterCollision'
            }
        ]
    } 
}

new Phaser.Game(config);