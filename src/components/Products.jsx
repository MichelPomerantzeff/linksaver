import { useEffect, useState, useRef } from "react"
import "../css/Products.css"
import axios from "axios"
import { environment } from "../environments/environment.prod"

function Products({ onProductUpdate }) {

    const [productsData, setProductsData] = useState([])

    const [productFilter, setProductFilter] = useState('')
    const [shopFilter, setShopFilter] = useState('')
    const [priceFilter, setPriceFilter] = useState('Price order')
    const [isOpen, setIsOpen] = useState(false)
    let menuRef = useRef()

    useEffect(() => {
        loadProducts();
    }, [])

    const loadProducts = async () => {
        const result = await axios.get(`${environment.baseUrl}/products`)
        setProductsData(result.data)
    }
    
    // Filter products to be displayed
    function handleProductFilter(e) { setProductFilter(e.target.value) }
    function handleShopFilter(e) { setShopFilter(e.target.value) }

    // Sort products by price
    function handlePriceFilter(e) {
        if (e.target.innerText === "High to Low") {
            productsData.sort((a, b) => b.price - a.price)
            setPriceFilter("High to Low")
        } else {
            productsData.sort((a, b) => a.price - b.price)
            setPriceFilter('Low to High')
        }
    }

    // Delete product from database & update list of products
    const deleteProduct = async (id) => {
        await axios.delete(`${environment.baseUrl}/product/${id}`)
        loadProducts();
    }


    function editProduct(product) {
        onProductUpdate(product); // Call the function to send the ID to the form
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
                <h1 className="products-title">List of Products</h1>
                <div className="filters">
                    <input onChange={handleProductFilter} type="text" placeholder="Product" />
                    <input onChange={handleShopFilter} type="text" placeholder="Shop" />
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
                        productsData.length > 0 
                        ?
                        <div className="products">
                            {
                                productsData.map(product => (

                                    product.productName.toLowerCase().includes(productFilter.toLowerCase()) &&
                                    product.shop.toLowerCase().includes(shopFilter.toLowerCase())) &&

                                    <div key={product.id} className="card">
                                        <div className="product">{product.productName}</div>
                                        <div className="store">
                                            <a href={product.link?.includes('https://') ? `${product.link}` : `https://${product.link}`} 
                                                target="_blank" 
                                                rel="noopener noreferrer">
                                                {product.shop}
                                            </a>
                                        </div>
                                        <div className="price">€ {product.price?.toFixed(2)}</div>
                                        <div className="cardButtons">
                                            <button onClick={() => editProduct(product)} className="fa fa-pencil" aria-hidden="true"/>
                                            <button onClick={() => deleteProduct(product.id)} className="fa fa-trash" aria-hidden="true" />
                                        </div>
                                    </div>
                                )
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