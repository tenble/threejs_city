(function() {
  var Path,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  this.SmallLight = (function(_super) {
    __extends(SmallLight, _super);

    function SmallLight(color, intensity, distance, position, cityInstance) {
      var light, sphere;
      this.paths = [];
      this.distance = distance;
      this.cityInstance = cityInstance;
      light = new THREE.PointLight(color, intensity, distance);
      sphere = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({
        color: color
      }));
      this.sceneObject = new THREE.Scene();
      this.sceneObject.add(light);
      this.sceneObject.add(sphere);
      this.sceneObject.position.set(position.x, position.y, position.z);
      this.generateRandomPaths(position);
    }

    SmallLight.prototype.generateRandomPaths = function(position) {
      var dirVec, dist, from, i, rotRadians, time, to, x, z, _i, _results;
      this.paths = [];
      _results = [];
      for (i = _i = 0; _i <= 100000; i = ++_i) {
        from = i === 0 ? position : this.paths[i - 1].to;
        time = 60 + (Math.floor(Math.random() * 30));
        dist = (Math.floor(Math.random() * 3) + 1) * 50;
        dirVec = i === 0 ? new THREE.Vector3(1, 0, 0) : this.paths[i - 1].getMoveVec().clone().normalize();
        rotRadians = (Math.round(Math.random() * 2) - 1) * (Math.PI / 2);
        x = dirVec.x * Math.cos(rotRadians) - dirVec.z * Math.sin(rotRadians);
        z = dirVec.x * Math.sin(rotRadians) + dirVec.z * Math.cos(rotRadians);
        dirVec.setX(x);
        dirVec.setZ(z);
        dirVec.multiplyScalar(dist);
        to = from.clone();
        to.add(dirVec);
        this.paths[i] = new Path(time, from, to);
        if (this.cityInstance.isLightOut(to, this.distance)) {
          break;
        } else {
          _results.push(void 0);
        }
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

    Path.prototype.getMoveVec = function() {
      return this.vec;
    };

    return Path;

  })();

}).call(this);
