export default class Npc extends Phaser.Physics.Matter.Sprite{
    constructor(data){
        let {scene,x,y,texture,frame} = data;
        super(scene.matter.world,x,y,texture,frame);
        this.scene.add.existing(this);

        const {Body,Bodies} = Phaser.Physics.Matter.Matter;
        var NpcCollider = Bodies.circle(this.x,this.y,18,{isSensor:false, label:'NpcCollider'});
        var NpcerSensor = Bodies.circle(this.x,this.y,25, {isSensor:true, lable:'NpcerSensor'});
        const compoundBody = Body.create({
            parts:[NpcCollider,NpcerSensor],frictionAir: 0.35,
        });
        this.setExistingBody(compoundBody);
        this.setFixedRotation();
    }

    create(){//สร้างข้อมูล
    }

    preload(){
    }


    update(){

    }
}