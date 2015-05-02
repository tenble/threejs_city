class @SmallLight extends BaseObject

    sceneObject: null

    constructor: (color, intensity, distance) ->
        pointLight = new THREE.PointLight(color, intensity, distance);

        this.sceneObject = pointLight;

    getSceneObject: () ->
        return this.sceneObject;

    renderSceneObject: () ->
