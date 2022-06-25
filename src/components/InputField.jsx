import "./InputField.css"

export function InputField(props) {

        return (
            <div className="inputField">

                <div className="inputs">
                    <div className="inputRow" >
                        <label>Product:</label>
                        <input className="singleInput" onChange={props.handleProduct} type="text" placeholder="Product" value={props.product} />
                    </div>

                    <div className="inputRow" >
                        <label>Store:</label>
                        <input className="singleInput" onChange={props.handleStore} type="text" placeholder="Store" value={props.store} />
                    </div>

                    <div className="inputRow" >
                        <label>Price:</label>
                        <input className="singleInput" onChange={props.handlePrice} type="number" placeholder="Price" value={props.price} />
                    </div>

                    <div className="inputRow" >
                        <label>Link:</label>
                        <input className="singleInput" onChange={props.handleLink} type="text" placeholder="Link" value={props.link} />
                    </div>
                </div>

                <div className="buttons">
                    <button onClick={props.save} className="save" type="submit">Save</button>
                    <button onClick={props.cancel} className="cancel" type="reset">Cancel</button>
                </div>

            </div>
        )
    }