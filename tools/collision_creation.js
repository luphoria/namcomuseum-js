function BoxGeometry(x,y,z) { 
    console.log([x/2,y/2,z/2,-(x/2),-(y/2),-(z/2)])
    return [x/2,y/2,z/2,-(x/2),-(y/2),-(z/2)]
}
function modPos(input,dir,amount) { 
    console.log(input)
    output = input
    switch(dir) {
        case "x":
            output[0] += amount
            output[3] += amount
            break
        case "y":
            output[1] += amount
            output[4] += amount
            break
        case "z":
            output[2] += amount
            output[5] += amount
            break
    }
    console.log(output)
    return output
}
function getPos(input,dir) {
    console.log("getPos(" + input + ",\"" + dir + "\")")
    console.log(input)
    switch(dir) {
        case "x":
            output = input[0] - input[3]
            break
        case "y":
            output = input[1] - input[4]
            break
        case "z":
            output = input[2] - input[5]
            break
    }
    console.log(output)
    return output
}
/* DEFINE YOUR COLLISION CUBES HERE */

let colCube1 = BoxGeometry( 40, 30, 60 )
colCube1 = modPos(colCube1,"y",-30)
colCube1 = modPos(colCube1,"x",5)

let colCube2 = BoxGeometry( 93, 40, 20 )
colCube2 = modPos(colCube2,"y",-30)
colCube2 = modPos(colCube2,"x",6)

/* DO NOT DEFINE COLLISION CUBES BEYOND THIS POINT */

let cubes = [colCube1,colCube2] // Array with all of the cubes
console.log(cubes)
let col = true // Modifies collision to be LESS accurate so that it is more like the game.


function getCoords(box,collision) { // Spent way too long trying to make a giant detection for negative/positive, realised i could add a modifier to a "master" return anyways. Think fucking smarter, not harder.
    collisionModifier = 0 // defines collisionModifier to not return undefined on collision == false
    if(collision == true) collisionModifier = -3
    console.log(box[0])
    console.log(box[1])
    console.log(box[2])
    console.log(box[3])
    console.log(box[4])
    console.log(box[5])
    return [
        (getPos(box,"x") - (Math.abs(box[0]) + Math.abs(box[3]))) - collisionModifier,
        (getPos(box,"y") - (Math.abs(box[1]) + Math.abs(box[4]))),
        (getPos(box,"z") - (Math.abs(box[2]) + Math.abs(box[5]))) - collisionModifier,
        (getPos(box,"x") + (Math.abs(box[0]) + Math.abs(box[3]))) + collisionModifier,
        (getPos(box,"y") + (Math.abs(box[1]) + Math.abs(box[4]))),
        (getPos(box,"z") + (Math.abs(box[2]) + Math.abs(box[5]))) + collisionModifier
    ]
}

let inc = 0
let toReturn = "let col = [" // defining string it will return

while(cubes.length - 1 >= inc) {
    toReturn = toReturn + "[" + getCoords(cubes[inc],col) + "]"
    if(cubes.length - 1 > inc) toReturn += ","
    inc++
}
toReturn = toReturn + "]"

console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n========================================\n" + toReturn + "\n========================================\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n")
