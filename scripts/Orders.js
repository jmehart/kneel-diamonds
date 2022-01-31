import { addCustomOrder, getOrders, getMetals, getStyles, getSizes, getTypes } from "./database.js"

const metals = getMetals()
const styles = getStyles()
const sizes = getSizes()
const types = getTypes()


const buildOrderListItem = (order) => {

    const foundMetal = metals.find(
        (metal) => {
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

    let totalCost = foundMetal.price + foundStyle.price + foundSize.price

    totalCost *= foundType.priceMultiplier

    const costString = totalCost.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
    })

    return `<li>
        Order #${order.id} cost ${costString}
    </li>`
}


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