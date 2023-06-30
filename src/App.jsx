import Products from "./components/Products"
import Form from "./components/Form"
import "./App.css"
import "./responsiveness/MidDesktop.css"
import "./responsiveness/Laptop.css"
import "./responsiveness/BigTablet.css"
import "./responsiveness/Tablet.css"
import "./responsiveness/Smartphone.css"
import { useState } from "react"

function App() {

    const [productToUpdate, setProductToUpdate] = useState(0);

    const handleProductUpdate = (product) => {
      setProductToUpdate(product);
    };

    return (
        <div className="app">
            <div className="header">
                <i className="fa fa-link"/>
                <h1>Link Saver</h1>
            </div>
            <div className="center">
                <Form productToUpdate={productToUpdate} />
                <Products onProductUpdate={handleProductUpdate} />
            </div>
            <div className="footer">
                <p>&copy; 2022. Built by <strong>Michel Pomerantzeff</strong></p>
            </div>
        </div>
    )
}

export default App;