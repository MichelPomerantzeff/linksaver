import { useEffect, useState } from "react"
import "./Sidebar.css"
// import data from "../data"


export function Sidebar(props) {

    const [sidebarData, setSidebarData] = useState([])
    const [productFilter, setProductFilter] = useState('')
    const [storeFilter, setStoreFilter] = useState('')
    const [priceFilter, setPriceFilter] = useState('Order by Price')

    // Data coming from Parent (Linksaver.jsx) as props to sidebarData state
    useEffect(() => {
        setSidebarData(props.inputData)
    }, [props.inputData])

    // Display products on sidebar based on their filters
    function handleProductFilter(e) { setProductFilter(e.target.value) }
    function handleStoreFilter(e) { setStoreFilter(e.target.value) }
    function handlePriceFilter() {

        let newArrOfProducts = [...sidebarData]
        setSidebarData(newArrOfProducts)

        if (priceFilter === 'Price: high to low' || priceFilter === 'Order by Price') {
            newArrOfProducts.sort((a, b) => (parseFloat(a.price) < parseFloat(b.price) ? 1 : parseFloat(b.price) < parseFloat(a.price) ? -1 : 0))
            setPriceFilter("Price: low to high")
        } else {
            newArrOfProducts.sort((a, b) => (parseFloat(a.price) > parseFloat(b.price) ? 1 : parseFloat(b.price) > parseFloat(a.price) ? -1 : 0))
            setPriceFilter('Price: high to low')
        }
    }

    // Delete item from localStorage based on its ID & update sidebarData state 
    function handleDelete(id) {
        const deleteItem = sidebarData.filter(data => data.id !== id)
        setSidebarData(deleteItem)
    }

    // Return only the element in which the edit button was clicked
    function handleEdit(id) {
        const editItem = sidebarData.filter(data => data.id === id)
        props.edit(editItem)
    }

    localStorage.setItem('data', JSON.stringify(sidebarData))

    return (
        <div className="sidebar">

            <div className="filters">
                <input onChange={handleProductFilter} type="text" placeholder="Product" />
                <input onChange={handleStoreFilter} type="text" placeholder="Store" />
                <button className="byPrice" onClick={handlePriceFilter} ><strong>{priceFilter}</strong></button>
            </div>

            <div className="renderedElements">

                {/* If there is data on localStorage, render product rows, else message "Nothing here" */}
                {
                    sidebarData.length > 0
                        ?
                        sidebarData.map(content => {

                            // Set caracters to lower case and check if it exists
                            if (content.product.toLowerCase().includes(productFilter.toLowerCase()) && content.store.toLowerCase().includes(storeFilter.toLowerCase())) {
                                return (
                                    <div key={content.id} className="renderedRow">
                                        <div className="product"><strong>{content.product}</strong></div>
                                        <div className="store"><a href={`${content.link}`}>{content.store}</a></div>
                                        <div className="price">€{content.price}</div>
                                        <div className="sidebarButtons">
                                            <button onClick={() => handleEdit(content.id)} className="fa fa-pencil" aria-hidden="true" ></button>
                                            <button onClick={() => handleDelete(content.id)} className="fa fa-trash" aria-hidden="true" ></button>
                                        </div>
                                    </div>
                                )
                            }
                        }).reverse()
                        :
                        <div className="emptySidebar">
                            <h1>This field is empty!!!</h1>
                        </div>
                }
            </div>
        </div>
    )
}