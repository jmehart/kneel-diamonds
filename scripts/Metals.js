import { getMetals, setMetal, getState } from "./database.js"

const metals = getMetals()

document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "metal") {
            setMetal(parseInt(event.target.value))
        }
    }
)

export const Metals = () => {
    let html = "<ul>"
    const state = getState()

    // This is how you have been converting objects to <li> elements
    for (const metal of metals) {
        if (metal.id === state.metalId) {
            html += `<li>
            <input type="radio" name="metal" value="${metal.id}" checked /> ${metal.metal}
        </li>`
        } else {
            html += `<li>
            <input type="radio" name="metal" value="${metal.id}" /> ${metal.metal}
        </li>`
        }
    }

    html += "</ul>"
    return html
}

