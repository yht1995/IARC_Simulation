var BlueBot, Bot, Obstacle, RedBot,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Bot = (function() {
  Bot.bots = [];

  Bot.bound = 480;

  Bot.addBot = function(bot) {
    return this.bots.push(bot);
  };

  function Bot(scene, x, y) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.angle = Math.random() * Math.PI;
    this.velocity = 1;
    Bot.addBot(this);
  }

  Bot.prototype.create = function() {
    var material;
    this.cylinder = BABYLON.Mesh.CreateCylinder("bot", 10, 30, 30, 128, 1, this.scene, false);
    this.cylinder.position = new BABYLON.Vector3(this.x, 0, this.y);
    material = new BABYLON.StandardMaterial("bot_material", this.scene);
    return this.cylinder.material = material;
  };

  Bot.prototype.outOfBoundary = function() {
    return Math.abs(this.x) > Bot.bound || Math.abs(this.y) > Bot.bound;
  };

  Bot.prototype.isCollisions = function() {
    var bot, i, len, ref;
    ref = Bot.bots;
    for (i = 0, len = ref.length; i < len; i++) {
      bot = ref[i];
      if (bot !== this) {
        if (Math.sqrt(Math.pow(this.x - bot.x, 2) + Math.pow(this.y - bot.y, 2)) < 35) {
          return true;
        }
      }
    }
    return false;
  };

  Bot.prototype.move = function() {
    if (this.outOfBoundary()) {
      this.angle += Math.PI / 2;
    }
    if (this.isCollisions()) {
      this.angle += Math.PI / 2;
    }
    this.angle += (Math.random() * 2 - 1) * Math.PI / 25;
    this.x += this.velocity * Math.sin(this.angle);
    this.y += this.velocity * Math.cos(this.angle);
    return this.cylinder.position = new BABYLON.Vector3(this.x, 0, this.y);
  };

  return Bot;

})();

RedBot = (function(superClass) {
  extend(RedBot, superClass);

  function RedBot() {
    return RedBot.__super__.constructor.apply(this, arguments);
  }

  RedBot.prototype.create = function() {
    var material;
    RedBot.__super__.create.apply(this, arguments);
    material = new BABYLON.StandardMaterial("bot_material", this.scene);
    material.diffuseColor = new BABYLON.Color3(1.0, 0, 0);
    return this.cylinder.material = material;
  };

  return RedBot;

})(Bot);

BlueBot = (function(superClass) {
  extend(BlueBot, superClass);

  function BlueBot() {
    return BlueBot.__super__.constructor.apply(this, arguments);
  }

  BlueBot.prototype.create = function() {
    var material;
    BlueBot.__super__.create.apply(this, arguments);
    material = new BABYLON.StandardMaterial("bot_material", this.scene);
    material.diffuseColor = new BABYLON.Color3(0, 0, 1.0);
    return this.cylinder.material = material;
  };

  return BlueBot;

})(Bot);

Obstacle = (function(superClass) {
  extend(Obstacle, superClass);

  function Obstacle() {
    return Obstacle.__super__.constructor.apply(this, arguments);
  }

  Obstacle.prototype.create = function() {
    Obstacle.__super__.create.apply(this, arguments);
    this.cylinder_top = BABYLON.Mesh.CreateCylinder("bot_obs", 100, 10, 10, 128, 1, this.scene, false);
    this.cylinder_top.parent = this.cylinder;
    return this.cylinder_top.position = new BABYLON.Vector3(0, 50, 0);
  };

  return Obstacle;

})(Bot);

var startBabylonJS;

startBabylonJS = function() {
  var bot, camera, canvas, engine, ground, i, j, k, l, len, light, m, materialground, ref, scene, shadowGenerator, skybox, skyboxMaterial;
  if (BABYLON.Engine.isSupported()) {
    canvas = document.getElementById("renderCanvas");
    engine = new BABYLON.Engine(canvas, true);
    scene = new BABYLON.Scene(engine);
    scene.collisionsEnabled = true;
    light = new BABYLON.DirectionalLight("dir01", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(40, 80, 40);
    light.groundColor = new BABYLON.Color3(0, 0, 0);
    light.intensity = 1;
    camera = new BABYLON.ArcRotateCamera("Camera", 0, 0.8, 500, BABYLON.Vector3.Zero(), scene);
    camera.attachControl(canvas);
    camera.checkCollisions = true;
    ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 32, scene);
    materialground = new BABYLON.StandardMaterial("ground", scene);
    materialground.diffuseTexture = new BABYLON.Texture("./images/textures/ground.jpg", scene);
    materialground.diffuseTexture.uScale = 10;
    materialground.diffuseTexture.vScale = 10;
    materialground.backFaceCulling = false;
    materialground.diffuseColor = new BABYLON.Color3(1, 1, 1);
    materialground.specularColor = new BABYLON.Color3(0.5, 0.5, 0.5);
    ground.material = materialground;
    ground.checkCollisions = true;
    skybox = BABYLON.Mesh.CreateBox("wall", 1000.0, scene);
    skyboxMaterial = new BABYLON.StandardMaterial("wall", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("./images/textures/wall", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;
    skybox.checkCollisions = true;
    for (i = j = 1; j <= 5; i = ++j) {
      bot = new RedBot(scene, 100 * Math.sin(Math.PI / 5 * i), 100 * Math.cos(Math.PI / 5 * i));
      bot.create();
    }
    for (i = k = 1; k <= 5; i = ++k) {
      bot = new BlueBot(scene, -100 * Math.sin(Math.PI / 5 * i), -100 * Math.cos(Math.PI / 5 * i));
      bot.create();
    }
    for (i = l = 1; l <= 4; i = ++l) {
      bot = new Obstacle(scene, 150 * Math.sin(Math.PI / 2 * i), 150 * Math.cos(Math.PI / 2 * i));
      bot.create();
    }
    shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    ref = Bot.bots;
    for (m = 0, len = ref.length; m < len; m++) {
      bot = ref[m];
      shadowGenerator.getShadowMap().renderList.push(bot.cylinder);
      shadowGenerator.getShadowMap().renderList.push(bot.cylinder_top);
    }
    shadowGenerator.useVarianceShadowMap = true;
    shadowGenerator.usePoissonSampling = true;
    ground.receiveShadows = true;
    skybox.receiveShadows = true;
    scene.registerBeforeRender((function(_this) {
      return function() {
        var len1, n, ref1, results;
        ref1 = Bot.bots;
        results = [];
        for (n = 0, len1 = ref1.length; n < len1; n++) {
          bot = ref1[n];
          results.push(bot.move());
        }
        return results;
      };
    })(this));
    return engine.runRenderLoop((function(_this) {
      return function() {
        return scene.render();
      };
    })(this));
  }
};

window.addEventListener("resize", function() {
  return engine.resize();
});

document.addEventListener("DOMContentLoaded", startBabylonJS, false);
