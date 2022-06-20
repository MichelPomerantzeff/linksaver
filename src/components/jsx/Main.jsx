import React, { useState, useEffect } from 'react';
import "../css/Main.css"
import axios from "axios"

function Main({ edit }) {

    const baseUrl = 'http://my-json-server.typicode.com/MichelPomerantzeff/backendReact/items'

    const initialState = () => { setItem(''); setStore(''); setPrice(''); setLink('') }

    const [item, setItem] = useState([])
    const [store, setStore] = useState([])
    const [price, setPrice] = useState([])
    const [link, setLink] = useState([])

    function getItem(e) { setItem(e.target.value) }
    function getStore(e) { setStore(e.target.value) }
    function getPrice(e) { setPrice(e.target.value) }
    function getLink(e) { setLink(e.target.value) }

    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(baseUrl)
            .then(response => {
                setData(response.data)
            })
    }, [data])

    function save() {

        const method = edit.id ? 'put' : 'post'
        const url = edit.id ? `${baseUrl}/${edit.id}` : baseUrl

        axios[method](url, { item, store, price, link })
        initialState()
    }

    function clear() {
        initialState()
        window.location.reload(false);
    }

    function renderEdit(edit) {
        setItem(edit.item)
        setStore(edit.store)
        setPrice(edit.price)
        setLink(edit.link)
    }

    useEffect(() => {
        renderEdit(edit)
    }, [edit])

    return (

        <div className="body">
            <div className="body-content">


                <div>
                    <div className="form-group">
                        <label>Product: </label>
                        <input className='mainInput' value={item} onChange={getItem} type="text" name="item" placeholder="Add product" />
                    </div>

                    <div className="form-group ">
                        <label>Store: </label>
                        <input className='mainInput' value={store} onChange={getStore} type="text" name="item" placeholder="Add store" />
                    </div>

                    <div className="form-group ">
                        <label>Price: </label>
                        <input className='mainInput' value={price} onChange={getPrice} type="text" name="item" placeholder="Add price" />


                    </div>

                    <div className="form-group ">
                        <label>Link: </label>
                        <input className='mainInput' value={link} onChange={getLink} type="text" name="item" placeholder="Add link" />
                    </div>
                </div>


                <div className="btn-body">
                    <button type="button" className="btn btn-success save" onClick={e => save(e)}> Save </button>
                    <button type="button" className="btn btn-primary cancel" onClick={e => clear(e)} > Cancel </button>
                </div>

            </div>
        </div >
    )
}

export default Main