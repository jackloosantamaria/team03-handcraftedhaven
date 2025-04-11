const Categories = [{name: "All", id: 0}, {name: "Hand Crafted Jewellery", id: 1000},{name: "Ceremics", id: 2000}, {name: "Bags", id: 3000}, {name: "Lamps", id: 4000}, {name: "Decorations", id: 5000} ]
const Prices = [{name: "All", id: 0}, {name: "Under $20", id: 100}, {name: "Under $50", id: 200},{name: "Under $100", id: 300}, {name: "Over $100", id: 400}]


// @ts-expect-error
export function Filter(props) {
    function onFilterValueChanged(event) {
        props.filterValueSelected(event.target.value)
    }
    return (
        <select className="bg-blue-500 text-white" name="categoryOptions" onChange={onFilterValueChanged}>
                      {Categories.map((category) => (
                        <option className="bg-blue-500 text-white" value={category.id} key={category.id}>{category.name}</option>
                      ))}
                      </select>
        )
}
// @ts-expect-error
export function FilterByPrice(props) {
    function onFilterValueChanged(event) {
        props.filterValueSelected(event.target.value)
    }
    return (
        <select className="bg-blue-500 text-white" name="pricingOptions" onChange={onFilterValueChanged}>
                      {Prices.map((price) => (
                        <option className="bg-blue-500 text-white"  value={price.id} key={price.id}>{price.name}</option>
                      ))}
                      </select>
        )
}
