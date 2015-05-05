(function() {
  var Path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SmallLight = (function(_super) {
    __extends(SmallLight, _super);

    SmallLight.sceneObject;

    SmallLight.distance;

    SmallLight.paths = [];

    function SmallLight(color, intensity, distance, position) {
      var light, sphere;
      this.distance = distance;
      light = new THREE.PointLight(color, intensity, distance);
      sphere = new THREE.Mesh(new THREE.SphereGeometry(2), new THREE.MeshBasicMaterial({
        color: color
      }));
      this.generateRandomPaths(position);
      this.sceneObject = new THREE.Scene();
      this.sceneObject.add(light);
      this.sceneObject.add(sphere);
    }

    SmallLight.prototype.generateRandomPaths = function(position) {
      var dir, dist, from, i, time, to, xOrZ, _i, _results;
      this.paths = [];
      _results = [];
      for (i = _i = 0; _i <= 1000; i = ++_i) {
        dir = Math.round(Math.random()) * -2 + 1;
        xOrZ = Math.round(Math.random());
        time = 60;
        from = i === 0 ? position.clone() : this.paths[i - 1].to.clone();
        dist = 50;
        to = from.clone();
        to.add(new THREE.Vector3(dir * xOrZ * dist, 0, (1 - xOrZ) * dist));
        _results.push(this.paths[i] = new Path(time, from, to));
      }
      return _results;
    };

    SmallLight.prototype.getDirection = function() {
      return this.paths[0].vec;
    };

    SmallLight.prototype.getSceneObject = function() {
      return this.sceneObject;
    };

    SmallLight.prototype.renderSceneObject = function() {
      var path;
      path = this.paths[0];
      path.advance(this.getSceneObject());
      if (path.hasReached && this.paths.length > 1) {
        return this.paths.splice(0, 1);
      }
    };

    return SmallLight;

  })(BaseObject);

  Path = (function() {
    Path.vec;

    Path.to;

    Path.from;

    Path.hasReached;

    function Path(time, from, to) {
      this.to = to;
      this.from = from;
      this.hasReached = false;
      this.vec = to.clone();
      this.vec.sub(from);
      this.vec.divideScalar(time);
      this.hasReached = THREE.MyHelper.checkVec(from, to);
    }

    Path.prototype.advance = function(threeObj) {
      threeObj.position.add(this.vec);
      return this.hasReached = THREE.MyHelper.checkVec(threeObj.position, this.to);
    };

    return Path;

  })();

}).call(this);
