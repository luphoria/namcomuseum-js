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
function render() {
    requestAnimationFrame(render)
    dodecahedron.rotation.x += 0.01
    dodecahedron.rotation.y -= 0.02
    document.onkeydown = function(k) {
        switch (k.code) {
            case "KeyA": // left
                camera.position.x -= 0.4
                break
            case "KeyW": // up
                camera.position.z -= 0.4
                break
            case "KeyD": // right
                camera.position.x += 0.4
                break
            case "KeyS": // down
                camera.position.z += 0.4
                break
            default: break
        }
    }
    rd.render(scene,camera)
}

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

render()