import Player from "./Player.js";
import Npc from "./Npc.js";

export default class MainScene extends Phaser.Scene {
    constructor(){
        super("MainScene");
    }

    preload(){//ใส่ข้อมูล
        Npc.preload(this);
        Player.preload(this);
        
        this.load.image('maprpg','assets/images/map/map-rpg.png');
        this.load.tilemapTiledJSON('map','assets/images/map/home.json');
    }
    
    create(){//สร้างข้อมูล
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('map-rpg','maprpg',32,32,0,0);
        const ground = map.createStaticLayer('ground',tileset,0,0);
        const forest = map.createStaticLayer('forest',tileset,0,0);
        const home01 = map.createStaticLayer('home01',tileset,0,0);
        const home02 = map.createStaticLayer('home02',tileset,0,0);
        
        /*const vegetableplot = map.createStaticLayer('vegetable plot',maphomeset,0,0);
        const tomato01 = map.createStaticLayer('tomato01',maphomeset,0,0);
        const tomato02 = map.createStaticLayer('tomato02',maphomeset,0,0);
        const pumpkin01 = map.createStaticLayer('pumpkin01',maphomeset,0,0);
        const pumpkin02 = map.createStaticLayer('pumpkin02',maphomeset,0,0);
        const cauliflower01 = map.createStaticLayer('cauliflower01',maphomeset,0,0);
        const cauliflower02 = map.createStaticLayer('cauliflower02',maphomeset,0,0);
        const carrot01 = map.createStaticLayer('carrot01',maphomeset,0,0);
        const carrot02 = map.createStaticLayer('carrot02',maphomeset,0,0);*/
        forest.setCollisionByProperty({collides:true});
        home01.setCollisionByProperty({collides:true});
        this.matter.world.convertTilemapLayer(forest);
        this.matter.world.convertTilemapLayer(home01);

        this.player = new Player({scene:this,x:615,y:220,texture:'blacksmith',frame:'townsfolk_f_idle_1'});//
        this.player.setScale(1.5);

        this.Npc = new Npc({scene:this,x:780,y:400,texture:'archer',frame:'townsfolk_f_idle_1'});
        this.Npc.setScale(1.5);
        this.player.inputKeys = this.input.keyboard.addKeys({//รับข้อมูลการเดินทางkeyboard
            up : Phaser.Input.Keyboard.KeyCodes.W,
            down : Phaser.Input.Keyboard.KeyCodes.S,
            left : Phaser.Input.Keyboard.KeyCodes.A,
            right : Phaser.Input.Keyboard.KeyCodes.D,
        })
    }

    update(){
        this.player.update();
        this.Npc.update();

    }

   
}