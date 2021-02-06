import {FRO_entry_1} from "./1/FRO/script.js"
import {OPT_entry_1} from "./1/OPT/script.js"
import {OPT_entry_2} from "./2/OPT/script.js"

const selected = prompt("Enter level (e.g. \"FRO1\")")

export const SelectedLevel = (request) => {
    switch(request) {
        case "pos":
            switch(selected) {
                case "FRO1":
                    return FRO_entry_1[0]
                case "OPT1":
                    console.warn("OPT1 is fucked")
                    return OPT_entry_1[0]
                case "OPT2":
                    return OPT_entry_2[0]
                default:
                    throw "unimplemented level " + selected
            }
        case "col":
            switch(selected) {
                case "FRO1":
                    return FRO_entry_1[1]
                case "OPT1":
                    console.warn("OPT1 is fucked")
                    return OPT_entry_1[1]
                case "OPT2":
                    return OPT_entry_2[1]
                default:
                    throw "unimplemented level " + selected
            }
        case "obj":
            switch(selected) {
                case "FRO1":
                    return FRO_entry_1[2]
                case "OPT1":
                    console.warn("OPT1 is fucked")
                    return OPT_entry_1[2]
                case "OPT2":
                    return OPT_entry_2[2]
                default:
                    throw "unimplemented level " + selected
            }
        case "scl":
            switch(selected) {
                case "FRO1":
                    return FRO_entry_1[3]
                case "OPT1":
                    console.warn("OPT1 is fucked")
                    return OPT_entry_1[3]
                case "OPT2":
                    return OPT_entry_2[3]
                default:
                    throw "unimplemented level " + selected
            }
        default:
            throw "unimplemented request " + request
    }

}