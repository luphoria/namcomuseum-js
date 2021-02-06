import * as THREE from "./lib/three.module.js"
import { OBJLoader} from "./lib/OBJLoader.js"
import { MTLLoader } from './lib/MTLLoader.js'
import "./lib/keydrown.min.js"

var WIDTH = 320 // original PSX size
var HEIGHT = 224

var manager = new THREE.LoadingManager();
var rd = new THREE.WebGLRenderer({antialias:false}) // creates webgl rendering area
var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(60,WIDTH/HEIGHT) // creates camera
var dir = new THREE.Vector3()
var material = new THREE.MeshBasicMaterial({visible: false})
var debugMaterial = new THREE.MeshPhongMaterial({color: 0x0000FF})

rd.setSize(WIDTH,HEIGHT) // configs area..
rd.setClearColor(0x930000,1)
document.getElementById("gameContainer").appendChild(rd.domElement)

camera.rotation.y = 1.5

var spd = 0.5
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
    var inc = 0
    while(col.length > inc) {
        // The increment is per collision cube, it checks for collision on each coordinate for a cube, and if it does not return true then it will keep going to the next collision cube. //
        if(player.position.x > col[inc][0] && player.position.x < col[inc][3] && player.position.z > col[inc][2] && player.position.z < col[inc][5]) return true
        inc += 1
    }
    return false
}

var playergeo = new THREE.BoxGeometry(3,3,3)
var player = new THREE.Mesh(playergeo,debugMaterial)
scene.add(player)

const ambientLight = new THREE.AmbientLight( 0xFFFFFF, 1 ); // This should be 100% gamma.
scene.add( ambientLight );

/*opt
player.position.x = 160
player.position.z = 145
player.rotation.y = 1.57
*/
// fro
player.position.y = -28

player.position.x = 0
player.position.z = 0
player.rotation.y = 1.57 // TODO make it a bit more accurate
/* OPT
var geometry = new THREE.BoxGeometry( 220, 100, 290 )
var colCube1 = new THREE.Mesh( geometry, material )
scene.add( colCube1 )
colCube1.position.x -= 20
colCube1.position.z += 10
var colCube1_c = getCoords(colCube1,false)

var geometry = new THREE.BoxGeometry(100,100,25)
var colCube2 = new THREE.Mesh(geometry,material)
scene.add(colCube2)
colCube2.position.x += 120
colCube2.position.z += 140
var colCube2_c = getCoords(colCube2,true)

var geometry = new THREE.BoxGeometry(75,100,55)
var colCube3 = new THREE.Mesh(geometry,material)
scene.add(colCube3)
colCube3.position.x += 100
colCube3.position.z -= 140
var colCube3_c = getCoords(colCube3,true)

var col = [colCube1_c,colCube2_c,colCube3_c]
*/
// At the moment, the way I am creating collision is with actual cubes ingame. TODO remove them because all it is doing is generating coordinates anyways.

let col = [[-12,-45,-27,22,-15,27],[-37.5,-50,-7,49.5,-10,7]] // master collision object, uses nested arrays e.g. `col[0][0]` -- surprisingly usable
console.log(col)
var mtlLoader = new MTLLoader( manager )
mtlLoader.setPath( './assets/obj/1/FRO/' )
mtlLoader.load( 'FRO.mtl', function ( materials ) {

    materials.preload();

    var objLoader = new OBJLoader( manager ); // use objLoader over objLoader2 for MTL support
        objLoader.setMaterials( materials );
        objLoader.setPath( './assets/obj/1/FRO/' );
        objLoader.load( 'FRO.obj', function ( object ) {
            object.scale.set(0.01,0.01,0.01) // TODO accirate scaling
            object.position.y =- 42
            scene.add( object );

        });

} );

function move(type,speed) {
    switch(type) {
        case "move":
            if(kd.Q.isDown()) speed *= 1.7
            player.getWorldDirection(dir)
            // Could applyScaledVector, however splitting X and Z application allows for collision detection to "slide" you down walls.
            player.position.x += dir.x * speed
            if(!collisionCheck()) player.position.x -= dir.x * speed
            player.position.z += dir.z * speed
            if(!collisionCheck()) player.position.z -= dir.z * speed
            break
        case "rotate":
            player.rotation.y += speed/27
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
            player.rotation.x += speed / 50
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

var bgm = new Audio('./assets/sfx/museum.mp3'); // reference museum.mp3 -- TODO make this dynamic and changeable per room
bgm.addEventListener('ended', function() { // Thanks @kingjeffrey on stackoverflow for FF loop support!
    this.currentTime = 0;
    this.play();
}, false);
bgm.play();

kd.run(function(){kd.tick()}) // KD refreshing for input detection
render()
