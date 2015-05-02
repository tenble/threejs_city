class @World

    #properties
    WIDTH: $('body').width()
    HEIGHT: $('body').height()
    VIEW_ANGLE: 45
    NEAR: 0.1
    FAR: 10000
    '$container': $('body')

    renderer: null
    camera: null
    mainScene: null

    clock: new THREE.Clock();

    mainSceneObjects: []

    constructor: ()->
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.WIDTH/this.HEIGHT, this.NEAR, this.FAR);
        this.mainScene = new THREE.Scene();

        #controls
        controls = new THREE.FirstPersonControls(this.camera);
        controls.movementSpeed = 100;
        controls.lookSpeed = 0.1;

        this.mainScene.add(this.camera);

        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.$container.append(this.renderer.domElement);

        terrain = new FlatTerrain();
        this.mainSceneObjects.push(terrain);
        this.mainScene.add(terrain.getSceneObject());

        city = new City(
            15, 15, 50, 5
            25, 40, 
            20, 100, 
            25, 40, 
        );
        this.mainSceneObjects.push(city);
        this.mainScene.add(city.getSceneObject());

        #test light
        pointLight = new THREE.PointLight(0xFFFFFF);
        pointLight.position.x = 10;
        pointLight.position.y = 50;
        pointLight.position.z = 150;

        this.mainScene.add(pointLight);

        this.camera.position.y = 150;
        this.camera.lookAt(city.getSceneObject().position);

        objRef = this;
        render = () ->
            requestAnimationFrame(render);

            #render objects
            for object in objRef.mainSceneObjects
                object.renderSceneObject();

            #controls
            controls.update(objRef.clock.getDelta());

            objRef.renderer.render(objRef.mainScene, objRef.camera);

        render();
