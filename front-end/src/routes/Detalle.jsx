import { useParams } from 'react-router-dom';

function Detalle() {
    const { id } = useParams();
  
    // Utiliza el valor de 'id' para cargar los detalles específicos
    // Puedes realizar una consulta a una API o una base de datos aquí
  
    return (
      <div>
        <h2>Detalles del Elemento {id}</h2>
        {/* Muestra los detalles del elemento aquí */}
      </div>
    );
  }
  
  export default Detalle;