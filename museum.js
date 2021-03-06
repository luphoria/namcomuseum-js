import * as THREE from "./lib/three.module.js"
import { OBJLoader} from "./lib/OBJLoader.js"
import { MTLLoader } from './lib/MTLLoader.js'
import "./lib/keydrown.min.js"
import { SelectedLevel } from "./levels/selected.js"

let WIDTH = 320 // original PSX size
let HEIGHT = 224

let manager = new THREE.LoadingManager()
let rd = new THREE.WebGLRenderer({antialias:false}) // creates webgl rendering area
let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(60,WIDTH/HEIGHT) // creates camera
let dir = new THREE.Vector3()
let debugMaterial = new THREE.MeshPhongMaterial({color: 0x0000FF}) // TODO make this dynamic for FRO

rd.setSize(WIDTH,HEIGHT) // configs area..
rd.setClearColor(SelectedLevel("clr"),1)
document.getElementById("gameContainer").appendChild(rd.domElement)

camera.rotation.y = 1.5

const spd = 1
scene.add(camera)

/* define functions */
function render() {
    requestAnimationFrame(render)
    player.getWorldDirection(dir)

    if(!kd.E.isDown()) player.rotation.x -= spd / 50
    if(player.rotation.x < 0) player.rotation.x = 0 // Reverts rotation to 0 if it looks down any more.

    camera.position.x = player.position.x // + 40 for debugging purposes
    camera.position.y = player.position.y
    camera.position.z = player.position.z
    camera.rotation.y = player.rotation.y

    camera.rotation.x = player.rotation.x

    rd.render(scene,camera)
}

function collisionCheck() {
    let inc = 0
    while(col.length > inc) {
        // The increment is per collision cube, it checks for collision on each coordinate for a cube, and if it does not return true then it will keep going to the next collision cube. //
        if(player.position.x > col[inc][0] && player.position.x < col[inc][3] && player.position.z > col[inc][2] && player.position.z < col[inc][5]) return true
        inc += 1
    }
    return false
}

let playergeo = new THREE.BoxGeometry(3,3,3)
let player = new THREE.Mesh(playergeo,debugMaterial)
scene.add(player)

const light = new THREE.AmbientLight( 0xFFFFFF, 2 ) // This should be 200% gamma? Looks like original game
scene.add( light )


player.position.x = SelectedLevel("pos")[0]
player.position.y = SelectedLevel("pos")[1]
player.position.z = SelectedLevel("pos")[2]

player.rotation.y = SelectedLevel("pos")[3]

let col = SelectedLevel("col")
let mtlLoader = new MTLLoader( manager )
mtlLoader.load( SelectedLevel("obj") + "OBJ.mtl", function ( materials ) {
    materials.preload()
    let objLoader = new OBJLoader( manager ) // use objLoader over objLoader2 for MTL support
    objLoader.setMaterials( materials )
    objLoader.load( SelectedLevel("obj") + "OBJ.obj", function ( levelobj ) {
        levelobj.scale.set(0.01,0.01,0.01)
        levelobj.position.y =- 42
        scene.add(levelobj)
    })
} )
function move(type,speed) {
    switch(type) {
        case "move":
            if(kd.Q.isDown()) speed *= 1.7
            player.getWorldDirection(dir)
            // Could applyScaledVector, however splitting X and Z application allows for collision detection to "slide" you down walls.
            player.position.x += dir.x * (speed/2)
            if(!collisionCheck()) player.position.x -= dir.x * (speed/2)
            player.position.z += dir.z * (speed/2)
            if(!collisionCheck()) player.position.z -= dir.z * (speed/2)
            break
        case "rotate":
            player.rotation.y += speed/54
            break
        case "lookup":
            /*
                TODO FIX THIS
                Currently broken.
                Ideas:
                - Rotate in general using z and y both, might allow for rotation.x to not only go one way.
                - Use three.js built in rotation functions. These will definitely be a learning curve.
            */
            camera.getWorldDirection(dir)
            player.rotation.x += speed / 100
            if(player.rotation.x > 0.6) player.rotation.x = 0.6 // lock lookup like in original game
            break
        default: // fallback
            throw "fuck u and your nonexistent move type: " + type // theoretically this should never be called
    }
}

// key input checks
kd.W.down(function(){move("move",-spd)})
kd.A.down(function(){move("rotate",spd)})
kd.S.down(function(){move("move",spd)})
kd.D.down(function(){move("rotate",-spd)})
kd.E.down(function(){move("lookup",spd)})

let bgm = new Audio('./assets/sfx/' + SelectedLevel("sfx") + '.mp3') // reference museum.mp3 -- TODO make this dynamic and changeable per room
bgm.addEventListener('ended', function() { // Thanks @kingjeffrey on stackoverflow for FF loop support!
    this.currentTime = 0
    this.play()
}, false)
bgm.play()

kd.run(function(){kd.tick()}) // KD refreshing for input detection
render()
