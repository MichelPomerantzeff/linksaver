import Products from "./components/Products"
import Form from "./components/Form"
import { useState, useEffect } from "react"
import "./App.css"
import "./responsivity/MidDesktop.css"
import "./responsivity/Laptop.css"
import "./responsivity/BigTablet.css"
import "./responsivity/Tablet.css"
import "./responsivity/Smartphone.css"

function App() {

    const [product, setProduct] = useState("")
    const [store, setStore] = useState("")
    const [price, setPrice] = useState("")
    const [link, setLink] = useState("")
    const [id, setId] = useState("")
    const [data, setData] = useState(() => JSON.parse(localStorage.getItem("data")) || [])

    // Get input value from inputField
    function handleProduct(e) { setProduct(e.target.value) }
    function handleStore(e) { setStore(e.target.value) }
    function handlePrice(e) { setPrice(e.target.value) }
    function handleLink(e) {
        const url = e.target.value
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

    // Generate random ID
    const generateID = () => Math.round(Math.random() * 10000)

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
                product: product === "" ? "Product Sample" : product,
                store: store === "" ? "Store Sample" : store,
                price: price === "" ? "999.99" : price,
                link: link.includes("https://") ? link : `https://${link}`
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
            
            <div className="header">
                <i className="fa fa-link"/>
                <h1>Link Saver</h1>
            </div>

            <div className="center">
                <Form
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
                <Products
                    data={data}
                    dataLength={data.length}
                    edit={incomingValues}
                />
            </div>

            <div className="footer">
                <p>Developed with<i className="fa fa-heart" aria-hidden="true"></i>by <strong>Michel Pomeranzteff</strong></p>
            </div>

        </div>
    )
}

export default App;