import { getState, getTypes, setType } from "./dataAccess.js"

const types = getTypes()


document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "type") {
            setType(parseInt(event.target.value))
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)

export const Types = () => {
    let html = "<div>"

    const state = getState()

    const typeItems = types.map((type) => {
        if (type.id === state.typeId) {
            return `
            <input type="radio" name="type" value="${type.id}" checked /> ${type.type} `
        } else {
            return `
            <input type="radio" name="type" value="${type.id}" /> ${type.type} `
        }
        
    })

    html += typeItems.join("")
    html += "</div>"

    return html
}
