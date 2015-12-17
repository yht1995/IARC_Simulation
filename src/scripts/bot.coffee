class Bot
    @bots = []
    @bound = 480
    @addBot = (bot) -> @bots.push(bot)

    constructor: (scene,x,y) ->
        @scene = scene
        @x = x
        @y = y
        @angle = Math.random() * Math.PI
        @velocity = 1
        Bot.addBot(@)

    create: ()->
        @cylinder = BABYLON.Mesh.CreateCylinder("bot", 10, 30, 30, 128, 1, @scene, false)
        @cylinder.position = new BABYLON.Vector3(@x,0,@y);
        material = new BABYLON.StandardMaterial("bot_material", @scene)
        @cylinder.material = material

    outOfBoundary: ()->
        return Math.abs(@x)>Bot.bound || Math.abs(@y)>Bot.bound

    isCollisions: ()->
        for bot in Bot.bots
            if bot != @
                if Math.sqrt((@x-bot.x)**2+(@y-bot.y)**2)<35
                    return true
        return false

    move: ()->
        if @outOfBoundary()
            @angle += Math.PI/2
        if @isCollisions()
            @angle += Math.PI/2
        @angle += (Math.random()*2-1)*Math.PI/25
        @x += @velocity * Math.sin(@angle)
        @y += @velocity * Math.cos(@angle)
        @cylinder.position = new BABYLON.Vector3(@x,0,@y);


class RedBot extends Bot
    create: ->
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
        @cylinder_top = BABYLON.Mesh.CreateCylinder("bot_obs", 100, 10, 10, 128, 1, @scene, false)
        @cylinder_top.parent = @cylinder
        @cylinder_top.position = new BABYLON.Vector3(0,50,0);
