import { getSizes, getState, setSize } from "./database.js"

const sizes = getSizes()

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "size") {
            setSize(parseInt(event.target.value))
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)


export const DiamondSizes = () => {
    let html = "<ul>"
    const state = getState()

    // Use .map() for converting objects to <li> elements
    const listItems = sizes.map((size) => {
        if (size.id === state.sizeId) {
            return `<li>
            <input type="radio" name="size" value="${size.id}" checked /> ${size.carets}
        </li>`
        } else {
            return `<li>
            <input type="radio" name="size" value="${size.id}" /> ${size.carets}
        </li>`
        }
    })

    html += listItems.join("")
    html += "</ul>"

    return html
}

