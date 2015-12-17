class Bot
    constructor: (scene) ->
        @scene = scene
        @x = (Math.random()*2-1) * 400
        @y = (Math.random()*2-1) * 400
        @angle = Math.random() * Math.PI
        @velocity = 1;

    create: ()->
        @cylinder = BABYLON.Mesh.CreateCylinder("bot", 10, 30, 30, 128, 1, @scene, false)
        @cylinder.position = new BABYLON.Vector3(@x,0,@y);
        @cylinder.applyGravity = true;
        @cylinder.checkCollisions = true;
        material = new BABYLON.StandardMaterial("bot_material", @scene)
        @cylinder.material = material

    move: ()->
        @angle += (Math.random()*2-1)*Math.PI/25
        @x += @velocity * Math.sin(@angle)
        @y += @velocity * Math.cos(@angle)
        @cylinder.position = new BABYLON.Vector3(@x,0,@y);

class RedBot extends Bot
    create:  ->
        super
        material = new BABYLON.StandardMaterial("bot_material", @scene)
        material.diffuseColor = new BABYLON.Color3(1.0,0,0)
        @cylinder.material = material

class BlueBot extends Bot
    create:  ->
        super
        material = new BABYLON.StandardMaterial("bot_material", @scene)
        material.diffuseColor = new BABYLON.Color3(0,0,1.0)
        @cylinder.material = material

class Obstacle extends Bot
    create:  ->
        super
        @cylinder_top = BABYLON.Mesh.CreateCylinder("bot_obs", 200, 10, 10, 128, 1, @scene, false)
        @cylinder_top.parent = @cylinder
