import {FRO_entry_1} from "./1/FRO/script.js"
import {OPT_entry_1} from "./1/OPT/script.js"
import {OPT_entry_2} from "./2/OPT/script.js"
import {GB_entry_2} from "./2/GB/script.js"
import {MAPY_entry_2} from "./2/MAPY/script.js"
import {CQ_entry_2} from "./2/CQ/script.js"

const selected = prompt("Enter level (e.g. \"FRO1\")")

switch(selected) {
    case "FRO1":
        var selected_level_entry = FRO_entry_1
        break
    case "OPT1":
        var selected_level_entry = OPT_entry_1
        break
    case "OPT2":
        var selected_level_entry = OPT_entry_2
        break
    case "GB2":
        var selected_level_entry = GB_entry_2
        break
    case "MAPY2":
        var selected_level_entry = MAPY_entry_2
        console.warn("WARN: collision not implemented")
        break
    case "CQ2":
        var selected_level_entry = CQ_entry_2
        console.warn("WARN: music not implemented")
        console.warn("WARN: collision not implemented")
        break
    default:
        console.error("unimplemented level \"" + selected + "\", defaulting FRO1")
        var selected_level_entry = FRO_entry_1
        break
}

export const SelectedLevel = (request) => {
    switch(request) {
        case "pos":
            return selected_level_entry[0]
        case "col":
            return selected_level_entry[1]
        case "obj":
            return selected_level_entry[2]
        case "sfx":
            return selected_level_entry[3]
        case "clr":
            return selected_level_entry[4]
        default:
            throw "unimplemented request " + request
    }
}