export default class Player extends Phaser.Physics.Matter.Sprite{
    constructor(data){
        let {scene,x,y,texture,frame} = data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);

        const {Body,Bodies} = Phaser.Physics.Matter.Matter;
        var playerCollider = Bodies.circle(this.x,this.y,18,{isSensor:false, label:'playerCollider'});
        var playerSensor = Bodies.circle(this.x,this.y,25, {isSensor:true, lable:'playerSensor'});
        const compoundBody = Body.create({
            parts:[playerCollider,playerSensor],frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    static preload(scene){
        scene.load.atlas('blacksmith','assets/images/player/blacksmith.png','assets/images/player/blacksmith_atlas.json');
        scene.load.animation('blacksmith_anim','assets/images/player/blacksmith_anim.json');
    }

    create(){
        scene.setScale(2);
    }

    get velocity(){
        return this.body.velocity;
    }

    update(){
        const speed = 1.5;//ความเร็วการเดิน
        let playerVelocity = new Phaser.Math.Vector2();//ทิศทางการเดิน,ความเร็ว
        if(this.inputKeys.left.isDown) {
            playerVelocity.x = -1;
        } else if(this.inputKeys.right.isDown) {
            playerVelocity.x = 1;
        }
        if(this.inputKeys.up.isDown) {
            playerVelocity.y = -1;
        } else if(this.inputKeys.down.isDown) {
            playerVelocity.y = 1;
        }

        playerVelocity.normalize();//ให้ตัวละครเดินอย่างสมูท
        playerVelocity.scale(speed);
        this.setVelocity(playerVelocity.x,playerVelocity.y);
        
        if(Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1){
            this.anims.play('blacksmith_walk',true);//นำเข้ารูปตัวผู้เล่นเดิน
        }else{
            this.anims.play('blacksmith_idle',true);//นำเข้ารูปตัวผู้เล่นยืนนิ่ง
        }
 
    }
}