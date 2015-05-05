class @World

    #properties
    WIDTH: $('body').width()
    HEIGHT: $('body').height()
    VIEW_ANGLE: 45
    NEAR: 0.1
    FAR: 10000
    '$container': $('body')

    clock: new THREE.Clock()

    renderer: undefined
    camera: undefined
    mainScene: undefined
    city: undefined
    mainSceneObjects: []

    constructor: ()->
        this.renderer = new THREE.WebGLRenderer();
        this.camera = new THREE.PerspectiveCamera(this.VIEW_ANGLE, this.WIDTH/this.HEIGHT, this.NEAR, this.FAR);
        this.mainScene = new THREE.Scene();

        this.setPrimaryView();

        #controls
        #controls = new THREE.FirstPersonControls(this.camera);
        #controls.movementSpeed = 1000;
        #controls.lookSpeed = 0.1;
        #controls.target = new THREE.Vector3(0, 0, 0);
        #this.camera.lookAt(controls.target);

        this.mainScene.add(this.camera);

        this.renderer.setSize(this.WIDTH, this.HEIGHT);
        this.$container.append(this.renderer.domElement);

        this.city = new City(
            16, 16, 50, 10
            25, 40, 
            20, 100, 
            25, 40,
            this.camera
        );
        this.mainSceneObjects.push(this.city);
        this.mainScene.add(this.city.getSceneObject());

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
            #controls.update(objRef.clock.getDelta());

            objRef.renderer.render(objRef.mainScene, objRef.camera);

        render();

        this.addListeners();

    setPrimaryView: () ->
        this.camera.position.x = Math.random()*1000;
        this.camera.position.y = 1300;
        this.camera.position.z = Math.random()*1000;
        this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    addListeners: () ->
        objRef = this;
        $('body').keypress((ev) ->
            if (ev.which == 118) #v key
                if objRef.city.cameraFollow
                    objRef.city.setCameraFollow(false);
                    objRef.setPrimaryView();
                else
                    objRef.city.setCameraFollow(true);
        );