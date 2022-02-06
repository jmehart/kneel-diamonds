import { getMetals, setMetal, getState } from "./dataAccess.js"

const metals = getMetals()

// event listener on the whole document that listens for an event change when there is a selection in metal container
// invoking setMetal function and takes a string and turns into a number with parseInt
// dispatching the event to broadcast that state is changed and to rerender custom state changed in main

document.addEventListener(
    "change",
    (event) => {
        // conditional to match the clicked item name that is equal to metal
        if (event.target.name === "metal") {
            //invoking setMetal function and takes a string and turns into a number with parseInt
            setMetal(parseInt(event.target.value))
            // dispatching the event to broadcast that state is changed and to rerender custom state changed in main
            document.dispatchEvent(new CustomEvent("stateChanged"))
        }
    }
)

// function that creates metals list in HTML
// backticks include a template literal
// dollar sign with curly braces is an expression and is using string interpolation to put an expression in a template literal

export const Metals = () => {
    // identifying/starting html string as an unordered list and adding to later
    // let instead of const because html will be changed
    let html = "<ul>"
    // invoking the getState function to access transient state
    const state = getState()

    // This is how you have been converting objects to <li> elements
    // iterating the metals array with a for() loop
    for (const metal of metals) {
        // conditional to match the metal id with the property metalId in the transient state
        if (metal.id === state.metalId) {
            //adding a list item to the html if metal.id is in state
            //creates a radio button that is checked
            html += `<li>
            <input type="radio" name="metal" value="${metal.id}" checked /> ${metal.metal}
        </li>`
        } else {
            //conditional that updates the radio button to appear unchecked if it's not in state (if false)
            html += `<li>
            <input type="radio" name="metal" value="${metal.id}" /> ${metal.metal}
        </li>`
        }
    }
    // plus equals to add on to html that was invoked in 26, also doing this in if else statements
    // plus equals symbol/addition assignment operator concatenating a string that contains a closing element for unordered list
    html += "</ul>"
    // outputting html 
    return html
}



