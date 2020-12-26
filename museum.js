import "./lib/three.min.js" 

var WIDTH = window.innerWidth // TODO cap these to the original PS1 resolutions
var HEIGHT = window.innerHeight

var rd = new THREE.WebGLRenderer({antialias:true}) // creates webgl rendering area
rd.setSize(WIDTH,HEIGHT) // configs area..
rd.setClearColor(0xDDDDDD,1)
window.document.body.appendChild(rd.domElement)

var scene = new THREE.Scene()

var camera = new THREE.PerspectiveCamera(70,WIDTH/HEIGHT) // creates camera
camera.position.y = 3
camera.position.z = 140

scene.add(camera)

var mvmtModifier = -1

/* define functions */
function render() {
    requestAnimationFrame(render)
    if(debugCube.position.y < -20) mvmtModifier = +1
    if(debugCube.position.y > +20) mvmtModifier = -1
    debugCube.position.y += mvmtModifier
    document.onkeydown = function(k) {
        switch (k.code) { // TODO make collisions work
            case "KeyA": // left
                camera.rotation.y += 0.03
                if(camera.rotation.y >= 6 || camera.rotation.y <= -6) camera.rotation.y = 0 // 6 = full rotation
                break
            case "KeyW": // up
                if(camera.position.x - camera.rotation.y <= debugCubeCollision[0] && camera.position.x - camera.rotation.y >= debugCubeCollision[3] || camera.position.z - 0.7 - camera.rotation.y <= debugCubeCollision[2] && camera.rotation.z - 0.7 - camera.rotation.y >= debugCubeCollision[4]) console.log("collision")
                camera.position.x -= 0.0 + (camera.rotation.y)
                camera.position.z -= 0.7 - (camera.rotation.y)
                break
            case "KeyD": // right
                camera.rotation.y -= 0.03
                if(camera.rotation.y >= 6 || camera.rotation.y <= -6) camera.rotation.y = 0 // 6 = full rotation
                break
            case "KeyS": // down
                camera.position.x += 0.0 + (camera.rotation.y)
                camera.position.z += 0.7 - (camera.rotation.y)
                break
            default: break
        }
        // console.log(camera.position)
    }
    rd.render(scene,camera)
}
function getCoords(box,collision) { // Spent way too long trying to make a giant detection for negative/positive, realised i could add a modifier to a "master" return anyways. Think fucking smarter, not harder.
    var collisionModifier = 0 // defines collisionModifier to not return undefined on collision == false
    if(collision == true) collisionModifier = 5 
    return [(box.position.x - box.geometry.parameters.width / 2) - collisionModifier,(box.position.y - box.geometry.parameters.height / 2),(box.position.z - box.geometry.parameters.depth / 2) - collisionModifier,(box.position.x + box.geometry.parameters.width / 2) + collisionModifier,(box.position.y + box.geometry.parameters.height / 2),(box.position.z + box.geometry.parameters.depth / 2 + collisionModifier)]
}

var geometry = new THREE.BoxGeometry( 50, 50, 50 )
var material = new THREE.MeshLambertMaterial( {color: 0x00ff00} )
var debugCube = new THREE.Mesh( geometry, material )
scene.add( debugCube )
var debugCubeCollision = getCoords(debugCube,true)
console.log(debugCubeCollision)

var light = new THREE.PointLight(0xFFFFFF)
light.position.set(-10, 15, 50)

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