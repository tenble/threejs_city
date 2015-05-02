(function() {
  this.World = (function() {
    World.prototype.WIDTH = $('body').width();

    World.prototype.HEIGHT = $('body').height();

    World.prototype.VIEW_ANGLE = 45;

    World.prototype.NEAR = 0.1;

    World.prototype.FAR = 10000;

    World.prototype['$container'] = $('body');

    World.prototype.renderer = null;

    World.prototype.camera = null;

    World.prototype.mainScene = null;

    World.prototype.clock = new THREE.Clock();

    World.prototype.mainSceneObjects = [];

    function World() {
      var city, controls, light, objRef, render;
      this.renderer = new THREE.WebGLRenderer();
      this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.WIDTH / this.HEIGHT, this.NEAR, this.FAR);
      this.mainScene = new THREE.Scene();
      this.camera.position.y = 3000;
      controls = new THREE.FirstPersonControls(this.camera);
      controls.movementSpeed = 100;
      controls.lookSpeed = 0.1;
      controls.target = new THREE.Vector3(0, 0, 0);
      this.camera.lookAt(controls.target);
      this.mainScene.add(this.camera);
      this.renderer.setSize(this.WIDTH, this.HEIGHT);
      this.$container.append(this.renderer.domElement);
      city = new City(30, 30, 50, 5, 25, 40, 20, 100, 25, 40);
      this.mainSceneObjects.push(city);
      this.mainScene.add(city.getSceneObject());
      light = new THREE.AmbientLight(0x404040);
      this.mainScene.add(light);
      objRef = this;
      render = function() {
        var object, _i, _len, _ref;
        requestAnimationFrame(render);
        _ref = objRef.mainSceneObjects;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          object = _ref[_i];
          object.renderSceneObject();
        }
        controls.update(objRef.clock.getDelta());
        return objRef.renderer.render(objRef.mainScene, objRef.camera);
      };
      render();
    }

    return World;

  })();

}).call(this);
