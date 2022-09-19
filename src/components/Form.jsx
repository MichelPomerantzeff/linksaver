import "../css/Form.css"

function Form(props) {

    return (
        <div className="formContainer">

            <form action="">

                <h2>Product information</h2>

                <div className="formContent">

                    <div className="inputs-wrapper">
                        <div className="inputRow" >
                            <label>Product:</label>
                            <input className="singleInput" onChange={props.handleProduct} type="text" placeholder="Enter product name/descrition" value={props.product} />
                        </div>

                        <div className="inputRow" >
                            <label>Store:</label>
                            <input className="singleInput" onChange={props.handleStore} type="text" placeholder="Enter store" value={props.store} />
                        </div>

                        <div className="inputRow" >
                            <label>Price:</label>
                            <input className="singleInput" onChange={props.handlePrice} type="number" placeholder="Enter price" value={props.price} />
                        </div>

                        <div className="inputRow" >
                            <label>Link:</label>
                            <input className="singleInput" onChange={props.handleLink} type="text" placeholder="Enter link" value={props.link} />
                        </div>
                    </div>

                    <div className="buttons">
                        <button onClick={props.save} className="save" type="submit">Save</button>
                        <button onClick={props.cancel} className="cancel" type="reset">Cancel</button>
                    </div>
                </div>

            </form>

        </div>
    )
}

export default Form;