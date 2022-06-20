import logo from ".././img/browsingLogo.png"
import "../css/Logo.css"

function Logo() {
    return (
        <div className="logo">
            <img className="logoImg" alt="logo" src={logo} />
        </div>
    )
}

export default Logo