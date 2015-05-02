(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SmallLight = (function(_super) {
    __extends(SmallLight, _super);

    SmallLight.prototype.sceneObject = null;

    function SmallLight(color, intensity, distance) {
      var pointLight;
      pointLight = new THREE.PointLight(color, intensity, distance);
      this.sceneObject = pointLight;
    }

    SmallLight.prototype.getSceneObject = function() {
      return this.sceneObject;
    };

    SmallLight.prototype.renderSceneObject = function() {};

    return SmallLight;

  })(BaseObject);

}).call(this);
