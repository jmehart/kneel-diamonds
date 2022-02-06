import { addCustomOrder, getOrders, getMetals, getStyles, getSizes, getTypes } from "./dataAccess.js"

const metals = getMetals()
const styles = getStyles()
const sizes = getSizes()
const types = getTypes()

// create a function that creates an order html element that outputs the total cost of an order
// returns a string that represents html

const buildOrderListItem = (order) => {

    // finding the metal id and storing the value in a function - comparing id of metals array to transient state of metalId property
    //repeats for style, size, and type below
    const foundMetal = metals.find( // gives you first thing that it finds that is true/first thing that satisfies the condition
        (metal) => {
            //outputting a single object
            return metal.id === order.metalId
        }
    )
 
    const foundStyle = styles.find(
        (style) => {
            return style.id === order.styleId
        }
    )

    const foundSize = sizes.find(
        (size) => {
            return size.id === order.sizeId
        }
    )

    const foundType = types.find(
        (type) => {
            return type.id === order.typeId
        }
    )

    // getting the sum of the cost for metal, size, and style and storing the value
    let totalCost = foundMetal.price + foundStyle.price + foundSize.price

    // getting the value for the found type by taking the totalCost above and multiplying by the vslue of the priceMultiplier property
    totalCost *= foundType.priceMultiplier

        // function that creates a us dollar output
        //toLocalString is getting the english language with en and style with US
    const costString = totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
    })

    // outputting an html string as a list item to display the order and it's cost
    // interpolating the costString created above and the order with id
    return `<li>
        Order #${order.id} cost ${costString}
    </li>`
}

// creating a component function that generates html for the custom jewelry orders container as an unordered list and uses the above function
export const Orders = () => {
    /*
        Can you explain why the state variable has to be inside
        the component function for Orders, but not the others?
    */
    const orders = getOrders()

    let html = "<ul>"

    const listItems = orders.map(buildOrderListItem)

    html += listItems.join("")
    html += "</ul>"

    return html
}



document.addEventListener(
    "click",
    (clickEvent) => {
        const itemClicked = clickEvent.target
        if (itemClicked.id === "orderButton") {
            addCustomOrder()
        }
    }
)