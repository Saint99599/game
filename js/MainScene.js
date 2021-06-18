import Player from "./Player.js";
import Npc from "./Npc.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super("MainScene");
    }

    

    preload(){//ใส่ข้อมูล
        Player.preload(this);
        this.load.image('maprpg','assets/images/map-rpg.png');
        this.load.tilemapTiledJSON('map','assets/images/home.json');
    }
    
    create(){//สร้างข้อมูล
        const map = this.make.tilemap({key: 'map'});
        const maphomeset = map.addTilesetImage('map-rpg','maprpg',32,32,0,0);
        const ground = map.createStaticLayer('ground',maphomeset,0,0);
        const forest = map.createStaticLayer('forest',maphomeset,0,0);

        this.player = new Player({scene:this,x:0,y:0,texture:'blacksmith',frame:'townsfolk_f_idle_1'});//กำหนดตัวplayer
        
        this.Npc = new Npc({scene:this,x:30,y:30,texture:'blacksmith',frame:'townsfolk_f_idle_1'});

        this.player.inputKeys = this.input.keyboard.addKeys({//รับข้อมูลการเดินทางkeyboard
            up : Phaser.Input.Keyboard.KeyCodes.W,
            down : Phaser.Input.Keyboard.KeyCodes.S,
            left : Phaser.Input.Keyboard.KeyCodes.A,
            right : Phaser.Input.Keyboard.KeyCodes.D,
        })
    }

    update(){
        this.player.update();
    }
}