import "./InputField.css"

export function InputField(props) {

        return (
            <div className="inputField">

                <div className="inputs">
                    <div className="inputRow" >
                        <h3>Product:</h3>
                        <input className="singleInput" onChange={props.handleProduct} type="text" placeholder="Product" value={props.product} />
                    </div>

                    <div className="inputRow" >
                        <h3>Store:</h3>
                        <input className="singleInput" onChange={props.handleStore} type="text" placeholder="Store" value={props.store} />
                    </div>

                    <div className="inputRow" >
                        <h3>Price:</h3>
                        <input className="singleInput" onChange={props.handlePrice} type="text" placeholder="Price" value={props.price} />
                    </div>

                    <div className="inputRow" >
                        <h3>Link:</h3>
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