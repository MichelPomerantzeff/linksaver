import React, { useEffect, useState } from "react";
import "../css/SideBar.css"
import axios from "axios";

function RenderSideBar({ setEdit }) {

    const [data, setData] = useState([{ item: "", store: "", price: "" }])

    const [productFilter, setProductFilter] = useState('')

    const [storeFilter, setStoreFilter] = useState('')

    const [priceFilter, setPriceFilter] = useState('Order by Price')


    function getProductFilter(e) {
        setProductFilter(e.target.value)
    }

    function getStoreFilter(e) {
        setStoreFilter(e.target.value)
    }


    function handlePrice() {

        let newArrOfProducts = [...data]


        setData(newArrOfProducts)



        if (priceFilter === 'Price: low to high' || priceFilter === 'Order by Price') {
            newArrOfProducts.sort((a, b) => (parseFloat(a.price) < parseFloat(b.price) ? 1 : parseFloat(b.price) < parseFloat(a.price) ? -1 : 0))
            setPriceFilter("Price: high to low")
        } else {
            newArrOfProducts.sort((a, b) => (parseFloat(a.price) > parseFloat(b.price) ? 1 : parseFloat(b.price) > parseFloat(a.price) ? -1 : 0))
            setPriceFilter('Price: low to high')
        }
    }






    useEffect(() => {
        axios.get('http://my-json-server.typicode.com/MichelPomerantzeff/backendReact/items')
            .then(response => {
                setData(response.data)
            })
    }, [])

    const remove = (id) => {
        axios.delete(`http://my-json-server.typicode.com/MichelPomerantzeff/backendReact/items/${id}`)
    }

    const editData = (content) => {
        setEdit(content)
    }


    return (
        <div className="sidebarContainer">
            <div className="filterContainer">
                <input className="filterInput" onChange={getProductFilter} placeholder="product" type="text" name="" id="" />
                <input className="filterInput" onChange={getStoreFilter} placeholder="store" type="text" name="" id="" />
                <input className="filterInput" onClick={handlePrice} placeholder="price" type="button" value={priceFilter} />
            </div>

            <div >
                {
                    data.map(content => {

                        if (content.item.toLowerCase().includes(productFilter.toLowerCase()) && content.store.toLowerCase().includes(storeFilter.toLowerCase())) {


                            return (
                                <div>
                                    <div className="items" key={content.id}>

                                        <span> <strong> {content.item} </strong> </span>

                                        <a href={content.link}> {content.store} </a>

                                        <span> € {content.price} </span>

                                        <div className="buttons">
                                            <button type="button" className="btn btn-warning"><i className="fa fa-pencil-square-o" aria-hidden="true"
                                                onClick={() => editData(content)} ></i></button>

                                            <button type="button" className="btn btn-danger"><i className="fa fa-trash-o" aria-hidden="true"
                                                onClick={() => remove(content.id)} ></i></button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>

        </div>
    )
}

export default RenderSideBar