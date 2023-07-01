import { useState, useEffect } from "react";
import "../css/Form.css"
import axios from "axios";

function Form({ productToUpdate  }) {

    const [id, setId] = useState(productToUpdate)

    const productInitialState = {
        productName: "",
        shop: "",
        price: '',
        link: ""
    };

    const [product, setProduct] = useState(productInitialState);

    const {productName, shop, price, link} = product;

    const onInputChange = e => {
        setProduct({ ...product, [e.target.name]: e.target.value});
    };

    useEffect(() => {
        if(id > 0){
            loadProductById();
        }
        setId(productToUpdate)
        setProduct({...productToUpdate})
    }, [productToUpdate])

    const loadProductById = async () => {
        const result = await axios.get(`${process.env.REACT_APP_SERVER_URL_PROD}/product/${id}`)
        setProduct(result.data)
        console.log(result.data)
    }

    const onSubmit = async (e) => {
        if (id > 0){
            await axios.put(`${process.env.REACT_APP_SERVER_URL_PROD}/product/${id}`, product);
        } else {
            await axios.post(`${process.env.REACT_APP_SERVER_URL_PROD}/product`, product);
        }
        resetForm();
    };
    
    const resetForm = () => {
        setProduct(productInitialState);
        setId(0);
    };

    return (
        <div className="formContainer">

            <form onSubmit={(e) => onSubmit(e)}>

                <h2>Product information</h2>

                <div className="formContent">

                    <div className="inputs-wrapper">
                        <div className="inputRow" >
                            <label>Product:</label>
                            <input 
                                className="singleInput" 
                                type="text" 
                                placeholder="Enter product name/descrition" 
                                name="productName" 
                                value={productName || ''}
                                required
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="inputRow" >
                            <label>Store:</label>
                            <input 
                                className="singleInput" 
                                type="text" 
                                placeholder="Enter store" 
                                name="shop" 
                                value={shop || ''}
                                required
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="inputRow" >
                            <label>Price:</label>
                            <input 
                                className="singleInput" 
                                type="number" 
                                placeholder="Enter price" 
                                name="price" 
                                value={price || ''}
                                required
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className="inputRow" >
                            <label>Link:</label>
                            <input 
                                className="singleInput" 
                                type="text" 
                                placeholder="Enter link" 
                                name="link" 
                                value={link || ''}
                                required
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="save" type="submit">Save</button>
                        <button onClick={resetForm} className="cancel" type="reset">Cancel</button>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default Form;