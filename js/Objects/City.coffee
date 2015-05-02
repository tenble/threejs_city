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
        this.spawnRandomLight();
        this.spawnRandomLight();
        this.spawnRandomLight();
        this.spawnRandomLight();

    getSceneObject: () ->
        return this.sceneObject;

    renderSceneObject: () ->
        for light in this.lights
            light.getSceneObject().position.x += Math.random() * (10*this.gridSize/60);
            if light.getSceneObject().position.x > (this.gridX/2) * this.gridSize + light.getSceneObject().distance
                this.createRandomLight(light)


    spawnRandomLight: () ->
        newLight = this.createRandomLight();
        this.lights.push(newLight);
        this.sceneObject.add(newLight.getSceneObject());

    #reconfigures light if light param is specified
    createRandomLight: (light) ->
        if light == undefined
            light = new SmallLight();
        light.getSceneObject().color = new THREE.Color(Math.random() * 0xFFFFFF);
        light.getSceneObject().intensity = 1;
        light.getSceneObject().distance = 4*this.gridSize;

        light.getSceneObject().position.x = this.gridSize * (-this.gridX/2);
        light.getSceneObject().position.z = this.gridSize * Math.floor((Math.random() * this.gridZ) - this.gridZ/2);

        return light;



