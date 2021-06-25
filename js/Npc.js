export default class Npc extends Phaser.Physics.Matter.Sprite{
    constructor(data){
        let {scene,x,y,texture,frame} = data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);

        const {Body,Bodies} = Phaser.Physics.Matter.Matter;
        var NpcCollider = Bodies.circle(this.x,this.y,18,{isSensor:false, label:'NpcCollider'});
        var NpcerSensor = Bodies.circle(this.x,this.y,25, {isSensor:true, lable:'NpcerSensor'});
        const compoundBody = Body.create({
            parts:[NpcCollider,NpcerSensor],frictionAir: 0.35
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }


    static preload(scene){
        scene.load.atlas('archer','assets/images/npc/archer.png','assets/images/npc/archer_atlas.json');
        scene.load.animation('archer_anim','assets/images/npc/archer_anim.json');
    }

    get velocity(){
        return this.body.velocity;
    }


    update(){
        const speed = 1.5;//ความเร็วการเดิน
        let npcVelocity = new Phaser.Math.Vector2();//ทิศทางการเดิน,ความเร็ว
        npcVelocity.normalize();//ให้ตัวละครเดินอย่างสมูท
        npcVelocity.scale(speed);
        if(Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1){
            this.anims.play('walk',true);//นำเข้ารูปตัวผู้เล่นเดิน
        }else{
            this.anims.play('idle',true);//นำเข้ารูปตัวผู้เล่นยืนนิ่ง
        }
    }
}