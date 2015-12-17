startBabylonJS = ->
    if (BABYLON.Engine.isSupported())
        canvas = document.getElementById("renderCanvas")
        engine = new BABYLON.Engine(canvas, true)
        scene = new BABYLON.Scene(engine)
        scene.collisionsEnabled = true;

        #Adding a light
        light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene)
        light.position = new BABYLON.Vector3(40, 80, 40)
        light.groundColor = new BABYLON.Color3(0, 0, 0)
        light.intensity = 1

        #Adding an Arc Rotate Camera
        camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 500, BABYLON.Vector3.Zero(), scene)
        camera.attachControl(canvas)
        camera.checkCollisions = true

        ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 32, scene)
        materialground = new BABYLON.StandardMaterial("ground", scene)
        materialground.diffuseTexture = new BABYLON.Texture("./images/textures/ground.jpg", scene)
        materialground.diffuseTexture.uScale = 10
        materialground.diffuseTexture.vScale = 10
        materialground.backFaceCulling = false
        materialground.diffuseColor = new BABYLON.Color3(1, 1, 1)
        materialground.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5)
        ground.material = materialground
        ground.checkCollisions = true

        # Skybox
        skybox = BABYLON.Mesh.CreateBox("wall", 1000.0, scene)
        skyboxMaterial = new BABYLON.StandardMaterial("wall", scene)
        skyboxMaterial.backFaceCulling = false
        skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./images/textures/wall", scene)
        skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE
        skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0)
        skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0)
        skybox.material = skyboxMaterial
        skybox.checkCollisions = true

        #Creation of a cylinder
        #(name, height, diamTop, diamBottom, tessellation, [optional height subdivs], scene, updatable)
        for i in [1..5]
            bot = new RedBot(scene,100*Math.sin(Math.PI/5*i),100*Math.cos(Math.PI/5*i))
            bot.create()
        for i in [1..5]
            bot = new BlueBot(scene,-100*Math.sin(Math.PI/5*i),-100*Math.cos(Math.PI/5*i))
            bot.create()
        for i in [1..4]
            bot = new Obstacle(scene,150*Math.sin(Math.PI/2*i),150*Math.cos(Math.PI/2*i))
            bot.create()

        # Shadows
        shadowGenerator = new BABYLON.ShadowGenerator(1024, light)
        for bot in Bot.bots
            shadowGenerator.getShadowMap().renderList.push(bot.cylinder);
            shadowGenerator.getShadowMap().renderList.push(bot.cylinder_top);
        shadowGenerator.useVarianceShadowMap = true
        shadowGenerator.usePoissonSampling = true;
        ground.receiveShadows = true
        skybox.receiveShadows = true

        scene.registerBeforeRender =>
            for bot in Bot.bots
                bot.move()
        # Once the scene is loaded, just register a render loop to render it
        engine.runRenderLoop =>
            scene.render()


window.addEventListener("resize", ()-> engine.resize())
document.addEventListener("DOMContentLoaded", startBabylonJS, false)
