function Eliminar({estaAbierto, confirmar, cancelar}){
    if(!estaAbierto){
        return null;
    }

    return(
        <div className="cartel">
            <div className="cartel-contenido">
                <p><b>¿Estas seguro de eliminar?</b>, serás redirigido al Dashboard.</p>
                <button onClick={confirmar} className="boton-eliminar">Eliminar</button>
                <button onClick={cancelar} className="boton-cancelar">Cancelar</button>
            </div>
        </div>

    );
}

export default Eliminar;