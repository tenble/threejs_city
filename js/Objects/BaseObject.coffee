#abstract class which every object extends

class @BaseObject

    #returns an THREE object
    getSceneObject: () ->
        console.warn(this.name + ": getObject not overriden.")

    #rendering loop function for the specific object
    renderSceneObject: () ->
        console.warn(this.name + ": renderObject not overidden.")
