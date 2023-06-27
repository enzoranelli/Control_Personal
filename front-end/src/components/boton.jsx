
function Boton(props){
    
    
    return(
        
        <div className="boton">
            <img className="imagen-icono" src={props.imagen}  alt='icono'/>
            <p className="texto-boton">{props.texto}</p>
        </div>
    )
}

export default Boton;