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
        /*let tomatoLayer;
        let tomato;
        let tomatoNum = 0;*/

        //tomato
        /*this.tomato = this.physics.add.Group()
        tomatoLayer.forEach(object => {
        let obj = tomato.create(object.x, object.y, "coin"); 
            obj.setScale(object.width/16, object.height/16); 
            obj.setOrigin(0); 
            obj.body.width = object.width; 
            obj.body.height = object.height; 
        });

        //collisons
        map.setCollisionBetween(0, 923, true, 'ground');
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(player, ground);
        this.physics.add.overlap(player, tomato, collecttomato, null, this);

        //score
        text = this.add.text(570, 70, `Coins: ${tomatoNum}x`, {
        fontSize: '20px',
        fill: '#ffffff'
        });
        text.setScrollFactor(0);*/

        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('map-rpg','maprpg',32,32,0,0);
        const ground = map.createStaticLayer('ground',tileset,0,0);
        const forest = map.createStaticLayer('forest',tileset,0,0);
        const home01 = map.createStaticLayer('home01',tileset,0,0);
        const home02 = map.createStaticLayer('home02',tileset,0,0);
        const vegetableplot01 = map.createStaticLayer('vegetableplot01',tileset,0,0);
        const vegetableplot02 = map.createStaticLayer('vegetableplot02',tileset,0,0);
        const vegetableplot03 = map.createStaticLayer('vegetableplot03',tileset,0,0);
        const vegetableplot04 = map.createStaticLayer('vegetableplot04',tileset,0,0);
        //this.tomatoLayer = map.getObjectLayer('tomatoLayer')['objects'];
        /*const pumpkin = map.createStaticLayer('pumpkin',maphomeset,0,0);
        const cauliflower = map.createStaticLayer('cauliflower',maphomeset,0,0);
        const carrot = map.createStaticLayer('carrot',maphomeset,0,0);*/
        forest.setCollisionByProperty({collides:true});
        home01.setCollisionByProperty({collides:true});
        home02.setCollisionByProperty({collides:true});
        vegetableplot01.setCollisionByProperty({collidess:true});
        vegetableplot02.setCollisionByProperty({collides:true});
        vegetableplot03.setCollisionByProperty({collides:true});
        vegetableplot04.setCollisionByProperty({collides:true});
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
            enter : Phaser.Input.Keyboard.KeyCodes.ENTER,
        })
        
        
    }
    
    update(){
        this.player.update();
        this.Npc.update();
        this.interactive();
    }

    interactive(){
        if((Math.abs(this.Npc.x - this.player.x) <= 75) & ((Math.abs(this.Npc.y - this.player.y) <= 75))){
            if(this.player.inputKeys.enter.isDown){
                console.log("Complete Interactive")
                this.ready_to_talk();
            }
        }
        
    }
    ready_to_talk(){
        var text = this.add.text(this.Npc.x, this.Npc.y + 25, 'test', {font: '15px Courier', fill: ' #000000'})
        text.setOrigin(0.5);
    }
    /*collecttomato(player, tomato) {
        tomato.destroy(tomato.x, tomato.y); // remove the tile/coin
        tomatoNum ++; // increment the score
        text.setText(`tomato: ${tomatoNum}x`); // set the text to show the current score
        return false;
    }*/
}