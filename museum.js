import "./lib/three.min.js" 

var WIDTH = 320
var HEIGHT = 224

var rd = new THREE.WebGLRenderer({antialias:true}) // creates webgl rendering area
rd.setSize(WIDTH,HEIGHT) // configs area..
rd.setClearColor(0x00C0DD,1)
window.document.body.appendChild(rd.domElement)

var scene = new THREE.Scene()

var camera = new THREE.PerspectiveCamera(70,WIDTH/HEIGHT) // creates camera
camera.position.y = 3
camera.position.z = 140

scene.add(camera)

//var mvmtModifier = -1

/* define functions */
function render() {
    requestAnimationFrame(render)
    //if(debugCube.position.y < -20) mvmtModifier = +1
    //if(debugCube.position.y > +20) mvmtModifier = -1
    //debugCube.position.y += mvmtModifier
    if(camera.rotation.x < 0) camera.rotation.x = 0
    document.onkeydown = function(k) {
        if(k.code != "KeyE") camera.rotation.x -= 0.05
        switch (k.code) { // TODO fix negative position camera rotation movement
            case "KeyA": // left
                camera.rotation.y += 0.2
                if(camera.rotation.y >= 6 || camera.rotation.y <= -6) camera.rotation.y = 0 // 6 = full rotation
                else if(Math.round(camera.rotation.y) == 3) 
                break
            case "KeyW": // up
                var originalPosX = camera.position.x
                var originalPosZ = camera.position.z
                camera.position.x -= (0.0 + (camera.rotation.y*5/6))
                camera.position.z -= 1.0 - Math.abs(camera.rotation.y/6)
                if(camera.position.x > debugCubeCollision[0] && camera.position.x < debugCubeCollision[3] && camera.position.z > debugCubeCollision[2] && camera.position.z < debugCubeCollision[5]) {
                    camera.position.x += 0.0 + (camera.rotation.y*5/6)
                    camera.position.z += 1.0 - Math.abs(camera.rotation.y/6)
                }
                console.log("Units moved GOAL: 1\nUnits moved: " + ((Math.abs(camera.position.x) - Math.abs(originalPosX)) + (Math.abs(camera.position.z) - Math.abs(originalPosZ))) + "\nRotation: " + camera.rotation.y)
                break
            case "KeyD": // right
                camera.rotation.y -= 0.2
                if(camera.rotation.y >= 6 || camera.rotation.y <= -6) camera.rotation.y = 0 // 6 = full rotation
                break
            case "KeyS": // down
                var originalPosX = camera.position.x
                var originalPosZ = camera.position.z
                camera.position.x += (0.0 + (camera.rotation.y*5/6))
                camera.position.z += 1.0 - Math.abs(camera.rotation.y/6)
                if(camera.position.x > debugCubeCollision[0] && camera.position.x < debugCubeCollision[3] && camera.position.z > debugCubeCollision[2] && camera.position.z < debugCubeCollision[5]) {
                    camera.position.x -= 0.0 + (camera.rotation.y*5/6)
                    camera.position.z -= 1.0 - Math.abs(camera.rotation.y/6)
                }
                console.log("Units moved GOAL: 1\nUnits moved: " + ((Math.abs(camera.position.x) - Math.abs(originalPosX)) + (Math.abs(camera.position.z) - Math.abs(originalPosZ))))
                break
            case "KeyE": // triangle/look up
                camera.rotation.x += 0.05
                if(camera.rotation.x > 0.6) camera.rotation.x = 0.6
                break
            default: break
        }
    }
    rd.render(scene,camera)
}
function getCoords(box,collision) { // Spent way too long trying to make a giant detection for negative/positive, realised i could add a modifier to a "master" return anyways. Think fucking smarter, not harder.
    var collisionModifier = 0 // defines collisionModifier to not return undefined on collision == false
    if(collision == true) collisionModifier = 5 
    return [(box.position.x - box.geometry.parameters.width / 2) - collisionModifier,(box.position.y - box.geometry.parameters.height / 2),(box.position.z - box.geometry.parameters.depth / 2) - collisionModifier,(box.position.x + box.geometry.parameters.width / 2) + collisionModifier,(box.position.y + box.geometry.parameters.height / 2),(box.position.z + box.geometry.parameters.depth / 2 + collisionModifier)]
}

var geometry = new THREE.BoxGeometry( 50, 50, 50 )
var material = new THREE.MeshLambertMaterial( {color: 0xFF00FF} )
var debugCube = new THREE.Mesh( geometry, material )
scene.add( debugCube )
var debugCubeCollision = getCoords(debugCube,true)
console.log(debugCubeCollision)

var light = new THREE.PointLight(0xFFFFFF)
var light2 = new THREE.PointLight(0xFFFFFF)
light.position.set(30, 30, 30)
light2.position.set(-30,-30,-30)

scene.add(light)
/*
// TUTORIAL IN RENDERING OBJECTS //
var dodecahedronGeometry = new THREE.DodecahedronGeometry(14)
var lambertMaterial = new THREE.MeshLambertMaterial({color: 0xEAEFF2})
var dodecahedron = new THREE.Mesh(dodecahedronGeometry, lambertMaterial)
dodecahedron.position.x = 0

var light = new THREE.PointLight(0xFFFFFF)
light.position.set(-10, 15, 50)

scene.add(light)
scene.add(dodecahedron)
// END TUTORIAL //
*/
render()