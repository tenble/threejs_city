class @City extends BaseObject

    sceneObject: null

    constructor: (gridX, gridY, gridSize, gridMargin, minBSizeX, maxBSizeX, minBSizeY, maxBSizeY, minBSizeZ, maxBSizeZ) ->
        this.sceneObject = new THREE.Scene();

        #50 by 50
        #

        for i in [-gridX/2..gridX/2]
            for j in [-gridY/2..gridY/2]
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

    getSceneObject: () ->
        return this.sceneObject;
    renderSceneObject: () ->
