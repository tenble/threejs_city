(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.City = (function(_super) {
    __extends(City, _super);

    City.prototype.sceneObject = null;

    function City(gridX, gridY, gridSize, gridMargin, minBSizeX, maxBSizeX, minBSizeY, maxBSizeY, minBSizeZ, maxBSizeZ) {
      var i, j, position, size, _i, _j, _ref, _ref1, _ref2, _ref3;
      this.sceneObject = new THREE.Scene();
      for (i = _i = _ref = -gridX / 2, _ref1 = gridX / 2; _ref <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = _ref <= _ref1 ? ++_i : --_i) {
        for (j = _j = _ref2 = -gridY / 2, _ref3 = gridY / 2; _ref2 <= _ref3 ? _j <= _ref3 : _j >= _ref3; j = _ref2 <= _ref3 ? ++_j : --_j) {
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
    }

    City.prototype.getSceneObject = function() {
      return this.sceneObject;
    };

    City.prototype.renderSceneObject = function() {};

    return City;

  })(BaseObject);

}).call(this);
