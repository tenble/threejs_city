class @Test extends BaseObject
    object: null

    constructor: () ->
        radius = 50
        segments = 32
        rings = 32

        sphereMaterial =
            new THREE.MeshLambertMaterial(
                color: 0xCC0000
            )

        sphere = new THREE.Mesh(

          new THREE.SphereGeometry(
            radius,
            segments,
            rings),

          sphereMaterial)

        this.object = sphere

    getSceneObject: () ->
        return this.object

    renderSceneObject: () ->
        this.object.rotation.y += 0.01