class @SmallLight extends BaseObject

    this.sceneObject;
    this.distance;

    this.paths = [];

    constructor: (color, intensity, distance, position) ->
    	this.distance = distance;
    	light = new THREE.PointLight(color, intensity, distance);
    	sphere = new THREE.Mesh(new THREE.SphereGeometry(2), new THREE.MeshBasicMaterial(
    		color: color
    	));
    	this.generateRandomPaths(position);

    	this.sceneObject = new THREE.Scene();
    	this.sceneObject.add(light);
    	this.sceneObject.add(sphere);

    generateRandomPaths: (position) ->
    	this.paths = [];

    	for i in [0..100]
    		dir = Math.round(Math.random()) * -2 + 1;
    		xOrZ = Math.round(Math.random());
    		time = 15;
    		from = if i == 0 then position.clone() else this.paths[i-1].to.clone();
    		dist = 50;

    		to = from.clone();
    		to.add(new THREE.Vector3(dir*(xOrZ)*dist, 0, (1-xOrZ)*dist));

    		this.paths[i] = new Path(time, from, to);


    getSceneObject: () ->
        return this.sceneObject;

    renderSceneObject: () ->
    	#this.sceneObject.position.add(this.velocity);
    	path = this.paths[0];
    	#null check

    	path.advance(this.getSceneObject());
    	if path.hasReached and this.paths.length > 1
    		this.paths.splice(0, 1);


class Path
	this.vec;
	this.to;

	this.from; #DELETE DIS

	this.hasReached;

	#time measured in frames
	constructor: (time, from, to) ->
		this.to = to;
		this.from = from; #DELETE DIS
		this.hasReached = false;

		this.vec = to.clone();
		this.vec.sub(from);
		this.vec.divideScalar(time);

		this.hasReached = this.checkVec(from, to);

	advance: (threeObj) ->
		threeObj.position.add(this.vec);
		this.hasReached = this.checkVec(threeObj.position, this.to)

	checkVec: (vec1, vec2) ->
		EPSILON = 0.00001; 

		diff = vec2.clone();
		diff.sub(vec1);

		if Math.abs(diff.x) < EPSILON and Math.abs(diff.y) < EPSILON and Math.abs(diff.z) < EPSILON
			return true

		return false