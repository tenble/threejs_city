class @City extends BaseObject

    this.gridX;
    this.gridZ;
    this.gridSize;

    sceneObject: null

    lights: []

    constructor: (gridX, gridZ, gridSize, gridMargin, minBSizeX, maxBSizeX, minBSizeY, maxBSizeY, minBSizeZ, maxBSizeZ) ->
        this.gridX = gridX;
        this.gridZ = gridZ;
        this.gridSize = gridSize;

        this.sceneObject = new THREE.Scene();

        for i in [-gridX/2..gridX/2]
            for j in [-gridZ/2..gridZ/2]
                position = 
                    x: i*gridSize
                    y: 0
                    z: j*gridSize
                size =
                    x: minBSizeX + Math.random()*(maxBSizeX-minBSizeX);
                    y: minBSizeY + Math.random()*(maxBSizeY-minBSizeY);
                    z: minBSizeZ + Math.random()*(maxBSizeZ-minBSizeZ);

                position.x += Math.random()*(gridSize-gridMargin-size.x);
                position.z += Math.random()*(gridSize-gridMargin-size.z);

                this.sceneObject.add(new Building(position.x, position.y, position.z, size.x, size.y, size.z).getSceneObject());

        this.spawnRandomLight();
        this.spawnRandomLight();
        this.spawnRandomLight();
        this.spawnRandomLight();
        this.spawnRandomLight();

    getSceneObject: () ->
        return this.sceneObject;

    isLightOut: (light) ->
        pos = light.getSceneObject().position;
        rad = light.distance;
        if pos.x > (this.gridX/2) * this.gridSize + rad
            return true;
        if pos.z > (this.gridZ/2) * this.gridSize + rad
            return true;
        if pos.x < -1 * (this.gridX/2) * this.gridSize - rad
            return true;
        if pos.z < -1 * (this.gridZ/2) * this.gridSize - rad
            return true;

        return false;

    renderSceneObject: () ->
        for light in this.lights
            light.renderSceneObject();
            if (this.isLightOut(light))
                this.createRandomLight(light);


    spawnRandomLight: () ->
        newLight = this.createRandomLight();
        this.lights.push(newLight);
        this.sceneObject.add(newLight.getSceneObject());

    getRandomStart: () ->
        vec = new THREE.Vector3(
            this.gridSize * (Math.floor(Math.random() * (this.gridX-2)) - (this.gridX-2)/2),
            0,
            this.gridSize * (Math.floor(Math.random() * (this.gridZ-2)) - (this.gridZ-2)/2),
        );
        return vec;

    getRandomVelocity: () ->
        #new THREE.Vector3(Math.random() * (10*this.gridSize/60), 0, 0);
        new THREE.Vector3(Math.random() * (this.gridX), 0, 0);

    #reconfigures light if light param is specified
    createRandomLight: (light) ->
        newPos = this.getRandomStart();

        if light == undefined
            console.log("New light created.");
            light = new SmallLight(new THREE.Color(Math.random() * 0xFFFFFF), 20, 2*this.gridSize, newPos, this.getRandomVelocity());
        else
            light.getSceneObject().position.set(newPos.x, newPos.y, newPos.z);
            light.generateRandomPaths(newPos);

        return light;



