import { Link } from "react-router-dom";
function Boton(props){
    
    return(
        <Link to={`/${props.url}`} className="link">
            <div className="boton">
                <img className="imagen-icono" src={props.imagen}  alt='icono'/>
                <p className="texto-boton">{props.texto}</p>
            </div>
        </Link>
    )
}

export default Boton;