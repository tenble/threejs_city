(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.City = (function(_super) {
    __extends(City, _super);

    City.gridX;

    City.gridZ;

    City.gridSize;

    City.prototype.sceneObject = null;

    City.prototype.lights = [];

    function City(gridX, gridZ, gridSize, gridMargin, minBSizeX, maxBSizeX, minBSizeY, maxBSizeY, minBSizeZ, maxBSizeZ) {
      var i, j, position, size, _i, _j, _ref, _ref1, _ref2, _ref3;
      this.gridX = gridX;
      this.gridZ = gridZ;
      this.gridSize = gridSize;
      this.sceneObject = new THREE.Scene();
      for (i = _i = _ref = -gridX / 2, _ref1 = gridX / 2; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
        for (j = _j = _ref2 = -gridZ / 2, _ref3 = gridZ / 2; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; j = _ref2 <= _ref3 ? ++_j : --_j) {
          position = {
            x: i * gridSize,
            y: 0,
            z: j * gridSize
          };
          size = {
            x: minBSizeX + Math.random() * (maxBSizeX - minBSizeX),
            y: minBSizeY + Math.random() * (maxBSizeY - minBSizeY),
            z: minBSizeZ + Math.random() * (maxBSizeZ - minBSizeZ)
          };
          position.x += Math.random() * (gridSize - gridMargin - size.x);
          position.z += Math.random() * (gridSize - gridMargin - size.z);
          this.sceneObject.add(new Building(position.x, position.y, position.z, size.x, size.y, size.z).getSceneObject());
        }
      }
      this.spawnRandomLight();
      this.spawnRandomLight();
      this.spawnRandomLight();
      this.spawnRandomLight();
      this.spawnRandomLight();
    }

    City.prototype.getSceneObject = function() {
      return this.sceneObject;
    };

    City.prototype.isLightOut = function(light) {
      var pos, rad;
      pos = light.getSceneObject().position;
      rad = light.distance;
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

    City.prototype.renderSceneObject = function() {
      var light, _i, _len, _ref, _results;
      _ref = this.lights;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        light = _ref[_i];
        light.renderSceneObject();
        if (this.isLightOut(light)) {
          _results.push(this.createRandomLight(light));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
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

    City.prototype.getRandomVelocity = function() {
      return new THREE.Vector3(Math.random() * this.gridX, 0, 0);
    };

    City.prototype.createRandomLight = function(light) {
      var newPos;
      newPos = this.getRandomStart();
      if (light === void 0) {
        console.log("New light created.");
        light = new SmallLight(new THREE.Color(Math.random() * 0xFFFFFF), 20, 2 * this.gridSize, newPos, this.getRandomVelocity());
      } else {
        light.getSceneObject().position.set(newPos.x, newPos.y, newPos.z);
        light.generateRandomPaths(newPos);
      }
      return light;
    };

    return City;

  })(BaseObject);

}).call(this);
