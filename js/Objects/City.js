(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.City = (function(_super) {
    __extends(City, _super);

    City.prototype.gridX = void 0;

    City.prototype.gridZ = void 0;

    City.prototype.gridSize = void 0;

    City.prototype.camera = void 0;

    City.prototype.cameraFollow = false;

    City.prototype.sceneObject = null;

    City.prototype.lights = [];

    function City(gridX, gridZ, gridSize, gridMargin, minBSizeX, maxBSizeX, minBSizeY, maxBSizeY, minBSizeZ, maxBSizeZ, camera) {
      var i, j, position, size, _i, _j, _k, _ref, _ref1, _ref2, _ref3;
      this.gridX = gridX;
      this.gridZ = gridZ;
      this.gridSize = gridSize;
      this.camera = camera;
      this.sceneObject = new THREE.Scene();
      for (i = _i = _ref = -gridX / 2, _ref1 = gridX / 2; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
        for (j = _j = _ref2 = -gridZ / 2, _ref3 = gridZ / 2; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; j = _ref2 <= _ref3 ? ++_j : --_j) {
          position = {
            x: i * gridSize + gridSize / 2,
            y: 0,
            z: j * gridSize + gridSize / 2
          };
          size = {
            x: minBSizeX + Math.random() * (maxBSizeX - minBSizeX),
            y: minBSizeY + Math.random() * (maxBSizeY - minBSizeY),
            z: minBSizeZ + Math.random() * (maxBSizeZ - minBSizeZ)
          };
          this.sceneObject.add(new Building(position.x, position.y, position.z, size.x, size.y, size.z).getSceneObject());
        }
      }
      for (i = _k = 0; _k <= 100; i = ++_k) {
        this.spawnRandomLight();
      }
    }

    City.prototype.getSceneObject = function() {
      return this.sceneObject;
    };

    City.prototype.isLightOut = function(light) {
      var pos, rad;
      pos = light.getSceneObject().position;
      rad = light.distance / 4;
      if (pos.x > (this.gridX / 2) * this.gridSize + rad) {
        return true;
      }
      if (pos.z > (this.gridZ / 2) * this.gridSize + rad) {
        return true;
      }
      if (pos.x < -1 * (this.gridX / 2) * this.gridSize - rad) {
        return true;
      }
      if (pos.z < -1 * (this.gridZ / 2) * this.gridSize - rad) {
        return true;
      }
      return false;
    };

    City.prototype.CAMERA_HEIGHT_OFFSET = 10;

    City.prototype.INTERP_FRAMES = 30;

    City.prototype.interpFrames = 0;

    City.prototype.prevVec = new THREE.Vector3(0, 0, 0);

    City.prototype.posMoveVec = new THREE.Vector3(0, 0, 0);

    City.prototype.renderSceneObject = function() {
      var finalLightPos, light, lightMoveVec, lightPos, _i, _len, _ref;
      _ref = this.lights;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        light = _ref[_i];
        light.renderSceneObject();
        if (this.isLightOut(light)) {
          this.createRandomLight(light);
        }
      }
      if (this.cameraFollow) {
        lightPos = this.lights[0].getSceneObject().position.clone();
        lightMoveVec = this.lights[0].getDirection().clone();
        if (this.interpFrames === 0 && !THREE.MyHelper.checkVec(lightMoveVec, this.prevVec)) {
          this.interpFrames = this.INTERP_FRAMES;
          finalLightPos = lightPos.clone().add(lightMoveVec.clone().multiplyScalar(this.INTERP_FRAMES));
          finalLightPos.sub(lightMoveVec.clone().multiplyScalar(60));
          this.posMoveVec = finalLightPos.clone().sub(this.camera.position).divideScalar(this.interpFrames);
        }
        if (this.interpFrames > 0) {
          this.camera.position.add(this.posMoveVec);
          this.camera.position.setY(this.CAMERA_HEIGHT_OFFSET);
          this.camera.lookAt(this.camera.position.clone().add(this.prevVec.clone().multiplyScalar(this.interpFrames - 1).add(lightMoveVec.clone().multiplyScalar(this.INTERP_FRAMES - this.interpFrames + 1))));
          this.interpFrames--;
          if (this.interpFrames === 0) {
            return this.prevVec = lightMoveVec;
          }
        } else {
          this.camera.position.set(lightPos.x, this.CAMERA_HEIGHT_OFFSET, lightPos.z);
          return this.camera.position.sub(lightMoveVec.setY(0).clone().multiplyScalar(60));
        }
      }
    };

    City.prototype.setCameraFollow = function(bool) {
      var lightMoveVec, lightPos;
      this.cameraFollow = bool;
      if (bool) {
        this.prevVec = this.lights[0].getDirection().clone();
        lightPos = this.lights[0].getSceneObject().position.clone();
        lightMoveVec = this.lights[0].getDirection().clone();
        this.camera.position.set(lightPos.x, this.CAMERA_HEIGHT_OFFSET, lightPos.z);
        this.camera.position.sub(lightMoveVec.setY(0).clone().multiplyScalar(60));
        return this.camera.lookAt(lightPos.clone().setY(this.CAMERA_HEIGHT_OFFSET));
      }
    };

    City.prototype.spawnRandomLight = function() {
      var newLight;
      newLight = this.createRandomLight();
      this.lights.push(newLight);
      return this.sceneObject.add(newLight.getSceneObject());
    };

    City.prototype.getRandomStart = function() {
      var vec;
      vec = new THREE.Vector3(this.gridSize * (Math.floor(Math.random() * (this.gridX - 2)) - (this.gridX - 2) / 2), 0, this.gridSize * (Math.floor(Math.random() * (this.gridZ - 2)) - (this.gridZ - 2) / 2));
      return vec;
    };

    City.prototype.createRandomLight = function(light) {
      var newPos;
      newPos = this.getRandomStart();
      if (light === void 0) {
        light = new SmallLight(new THREE.Color(Math.random() * 0xFFFFFF), 1, 2 * this.gridSize, newPos);
        console.log("New light created at " + newPos.x + ", " + newPos.y + ", " + newPos.z + ".");
      } else {
        light.getSceneObject().position.set(newPos.x, newPos.y, newPos.z);
        light.generateRandomPaths(newPos);
      }
      return light;
    };

    return City;

  })(BaseObject);

}).call(this);
