import "./Logo.css"
import logo from "./img/logo.png"


export function Logo() {
    return (
        <div className="logo">
            <img className="logoImg" src={logo} alt="" />
        </div>
    )
}