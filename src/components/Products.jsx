import { useEffect, useState, useRef } from "react"
import "../css/Products.css"

function Products(props) {

    const [projectsData, setProjectsData] = useState([])
    const [productFilter, setProductFilter] = useState('')
    const [storeFilter, setStoreFilter] = useState('')
    const [priceFilter, setPriceFilter] = useState('Price order')
    const [isOpen, setIsOpen] = useState(false)
    let menuRef = useRef()

    localStorage.setItem('data', JSON.stringify(projectsData))

    // Data coming from Parent (Linksaver.jsx) as props to projectsData state
    useEffect(() => {
        setProjectsData(props.data)
    }, [props.data])

    // Filter products to be displayed
    function handleProductFilter(e) { setProductFilter(e.target.value) }
    function handleStoreFilter(e) { setStoreFilter(e.target.value) }

    // Sort products by price
    function handlePriceFilter(e) {
        if (e.target.innerText === "High to Low") {
            projectsData.sort((a, b) => b.price - a.price)
            setPriceFilter("High to Low")
        } else {
            projectsData.sort((a, b) => a.price - b.price)
            setPriceFilter('Low to High')
        }
    }

    // Delete item from localStorage based on its ID & update projectsData state 
    function handleDelete(id) {
        const deleteItem = projectsData.filter(data => data.id !== id)
        setProjectsData(deleteItem)
    }

    // Return element which edit button was clicked
    function handleEdit(id) {
        const editItem = projectsData.filter(data => data.id === id)
        props.edit(editItem)
    }

    // Hide element if user clicks outside
    useEffect(() => {
        const isOutside = e => !menuRef.current.contains(e.target) && setIsOpen(false)
        document.addEventListener("click", isOutside)
        return () => document.removeEventListener("click", isOutside)
    })

    return (
        <div className="productsContainer">
            <div className="wrapper">

                <h1>List of Products</h1>

                <div className="filters">
                    <input onChange={handleProductFilter} type="text" placeholder="Product" />
                    <input onChange={handleStoreFilter} type="text" placeholder="Store" />
                    <div className="dropdown" onClick={() => setIsOpen(prev => !prev)} ref={menuRef} >
                        <button className="price-filter" >{priceFilter} <i className="fa fa-caret-down" /> </button>
                        {
                            isOpen &&
                            <div className="dropdown-menu">
                                <option onClick={handlePriceFilter} >Low to High</option>
                                <option onClick={handlePriceFilter} >High to Low</option>
                            </div>
                        }
                    </div>
                </div>

                <div className="box">
                    {
                        projectsData.length > 0 ?
                            <div className="products">
                                {
                                    projectsData.filter(card =>
                                        card.product.toLowerCase().includes(productFilter.toLowerCase()) &&
                                        card.store.toLowerCase().includes(storeFilter.toLowerCase()))
                                        .map(card => (

                                            <div key={card.id} className="card">
                                                <div className="product">{card.product}</div>
                                                <div className="store"><a href={`${card.link}`}>{card.store}</a></div>
                                                <div className="price">€ {card.price}</div>
                                                <div className="cardButtons">
                                                    <button onClick={() => handleEdit(card.id)} className="fa fa-pencil" aria-hidden="true" ></button>
                                                    <button onClick={() => handleDelete(card.id)} className="fa fa-trash" aria-hidden="true" ></button>
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>

                            :

                            <div className="emptySidebar">
                                <h1>YOUR LIST IS EMPTY!!!</h1>
                            </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default Products;