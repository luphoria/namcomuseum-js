import "./lib/three.min.js" 

/* Shoutout to MDN for letting me steal all the skeleton instead of actually work */

var WIDTH = window.innerWidth
var HEIGHT = window.innerHeight

var rd = new THREE.WebGLRenderer({antialias:true})
rd.setSize(WIDTH,HEIGHT)
rd.setClearColor(0xDDDDDD,1)
window.document.body.appendChild(rd.domElement)

var scene = new THREE.Scene()

var camera = new THREE.PerspectiveCamera(70,WIDTH/HEIGHT)
camera.position.z = 50

scene.add(camera)

/* define functions */
function abs(number) {
    number = "" + number
    number = number.replace(/-/g,"")
    return parseFloat(number)
}
function render() {
    requestAnimationFrame(render)
    debugCube.rotation.z += 0.01
    debugCube.rotation.y += 0.005
    document.onkeydown = function(k) {
        switch (k.code) { // TODO collisions
            case "KeyA": // left
                camera.rotation.y += 0.03
                if(camera.rotation.y >= 6 || camera.rotation.y <= -6) camera.rotation.y = 0 // 6 = full rotation
                break
            case "KeyW": // up
                if(camera.position.x - camera.rotation.y <= debugCubeCollision[0] && camera.position.x - camera.rotation.y >= debugCubeCollision[3] || camera.position.z - 0.7 - camera.rotation.y <= debugCubeCollision[2] && camera.rotation.z - 0.7 - camera.rotation.y >= debugCubeCollision[4]) console.log("collision")
                camera.position.x -= 0.0 + abs(camera.rotation.y)
                camera.position.z -= 0.7 - abs(camera.rotation.y)
                break
            case "KeyD": // right
                camera.rotation.y -= 0.03
                if(camera.rotation.y >= 6 || camera.rotation.y <= -6) camera.rotation.y = 0 // 6 = full rotation
                break
            case "KeyS": // down
                camera.position.x += 0.0 + abs(camera.rotation.y)
                camera.position.z += 0.7 - abs(camera.rotation.y)
                break
            default: break
        }
        console.log(camera.position)
        console.log(camera.rotation.y)
    }
    rd.render(scene,camera)
}
function getCoords(box,collision) {
    var collisionModifier = 0
    if(collision == true) collisionModifier = 5 
    return [(box.position.x - box.geometry.parameters.width / 2) - collisionModifier,(box.position.y - box.geometry.parameters.height / 2),(box.position.z - box.geometry.parameters.depth / 2) - collisionModifier,(box.position.x + box.geometry.parameters.width / 2) + collisionModifier,(box.position.y + box.geometry.parameters.height / 2),(box.position.z + box.geometry.parameters.depth / 2 + collisionModifier)]
}

var geometry = new THREE.BoxGeometry( 50, 50, 50 )
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} )
var debugCube = new THREE.Mesh( geometry, material )
scene.add( debugCube )
var debugCubeCollision = getCoords(debugCube,true)
console.log(debugCubeCollision)
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