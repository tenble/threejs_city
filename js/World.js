(function() {
  this.World = (function() {
    World.prototype.WIDTH = $('body').width();

    World.prototype.HEIGHT = $('body').height();

    World.prototype.VIEW_ANGLE = 45;

    World.prototype.NEAR = 0.1;

    World.prototype.FAR = 10000;

    World.prototype['$container'] = $('body');

    World.prototype.clock = new THREE.Clock();

    World.prototype.renderer = void 0;

    World.prototype.camera = void 0;

    World.prototype.mainScene = void 0;

    World.prototype.city = void 0;

    World.prototype.mainSceneObjects = [];

    function World() {
      var light, objRef, render;
      this.renderer = new THREE.WebGLRenderer();
      this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.WIDTH / this.HEIGHT, this.NEAR, this.FAR);
      this.mainScene = new THREE.Scene();
      this.setPrimaryView();
      this.mainScene.add(this.camera);
      this.renderer.setSize(this.WIDTH, this.HEIGHT);
      this.$container.append(this.renderer.domElement);
      this.city = new City(16, 16, 50, 10, 25, 40, 20, 100, 25, 40, this.camera);
      this.mainSceneObjects.push(this.city);
      this.mainScene.add(this.city.getSceneObject());
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
        return objRef.renderer.render(objRef.mainScene, objRef.camera);
      };
      render();
      this.addListeners();
    }

    World.prototype.setPrimaryView = function() {
      this.camera.position.x = Math.random() * 1000;
      this.camera.position.y = 1300;
      this.camera.position.z = Math.random() * 1000;
      return this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    };

    World.prototype.addListeners = function() {
      var objRef;
      objRef = this;
      return $('body').keypress(function(ev) {
        if (ev.which === 118) {
          if (objRef.city.cameraFollow) {
            objRef.city.setCameraFollow(false);
            return objRef.setPrimaryView();
          } else {
            return objRef.city.setCameraFollow(true);
          }
        }
      });
    };

    return World;

  })();

}).call(this);
