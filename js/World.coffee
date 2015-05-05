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

        this.camera.position.y = 3000;

        #controls
        controls = new THREE.FirstPersonControls(this.camera);
        controls.movementSpeed = 1000;
        controls.lookSpeed = 0.1;
        controls.target = new THREE.Vector3(0, 0, 0);
        this.camera.lookAt(controls.target);

        this.mainScene.add(this.camera);

        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.$container.append(this.renderer.domElement);

        city = new City(
            15, 15, 50, 5
            25, 40, 
            20, 100, 
            25, 40, 
        );
        this.mainSceneObjects.push(city);
        this.mainScene.add(city.getSceneObject());

        #TEST LIGHT
        light = new THREE.AmbientLight(0x404040);
        this.mainScene.add(light);

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
