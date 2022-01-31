import { getTypes, setType } from "./dataAccess.js"

const types = getTypes()


document.addEventListener(
    "change",
    (event) => {
        if (event.target.name === "type") {
            setType(parseInt(event.target.value))
        }
    }
)

export const Types = () => {
    let html = "<div>"


    const typeItems = types.map((type) => {
        return `
            <input type="radio" name="type" value="${type.id}" /> ${type.type}
        `
    })

    html += typeItems.join("")
    html += "</div>"

    return html
}
