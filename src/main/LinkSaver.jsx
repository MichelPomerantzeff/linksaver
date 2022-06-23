import { Logo } from "../components/Logo"
import { Header } from "../components/Header"
import { Sidebar } from "../components/Sidebar"
import { InputField } from "../components/InputField"
import { Footer } from "../components/Footer"
import { useState, useEffect } from "react"


import "./LinkSaver.css"

export function LinkSaver() {


    // Generate random ID
    const generateID = () => Math.round(Math.random() * 10000)


    const [product, setProduct] = useState("")
    const [store, setStore] = useState("")
    const [price, setPrice] = useState("")
    const [link, setLink] = useState("")
    const [id, setId] = useState("")


    // If localStorage not empty, set its value to data state on first render, else set data state to "[]"
    const [data, setData] = useState(() => JSON.parse(localStorage.getItem("data")) || [])


    // Get input value from inputField
    function handleProduct(e) { setProduct(e.target.value) }
    function handleStore(e) { setStore(e.target.value) }
    function handlePrice(e) { setPrice(e.target.value) }
    
    function handleLink(e) { 

        const url = e.target.value.includes("http://") ? e.target.value : `http://${e.target.value}`

        setLink(url) 
    }


    // Save data to localStorage everytime data is updated
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data))
    }, [data])


    // Reset input fields to empty strings
    function resetInputField() {
        setProduct("")
        setStore("")
        setPrice("")
        setLink("")
        setId("")
    }


    // Cancel input values 
    function cancel() { resetInputField() }


    // Save input values to localStorage
    function save() {
        let dataArray = localStorage.getItem("data")
        let newData = []

        if (dataArray !== null) {
            newData = [...JSON.parse(dataArray)]
        }
        
        if (id) {
            const filtered = newData.filter(i => i.id !== id)
            filtered.push({ id: id, product, store, price, link })
            setData(filtered)
        } else {
            setData(newData)

            newData.push({
                 id: generateID(),
                 product: product === "" ? "Product" : product,
                 store: store === "" ? "Shop" : store,
                 price: price === "" ? 0 : price,
                 link 
                })
        }

        resetInputField()
    }
    

    // Data coming from Child (Sidebar.jsx)
    function incomingValues(item) {

        setProduct(item[0].product)
        setStore(item[0].store)
        setPrice(item[0].price)
        setLink(item[0].link)
        setId(item[0].id)
    }

    return (
        <div className="app">
            <Logo />
            <Header />
            <InputField
                handleProduct={handleProduct}
                handleStore={handleStore}
                handlePrice={handlePrice}
                handleLink={handleLink}
                cancel={cancel}
                save={save}
                product={product}
                store={store}
                price={price}
                link={link}
            />
            <Sidebar
                inputData={data}
                dataLength={data.length}
                edit={incomingValues}
            />
            <Footer />
        </div>
    )
}