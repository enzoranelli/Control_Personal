import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';


function Formulario(){
    const {register, handleSubmit} = useForm();
    const headers={
        "ngrok-skip-browser-warning": "69420",
      }
    const onSubmit = (data) =>{
        const apiUrl = 'https://ladybird-viable-barnacle.ngrok-free.app/personal';

        // Realiza una solicitud POST utilizando Axios
        axios.post(apiUrl, data, {headers})
        .then((response) => {
            console.log('Respuesta de la API:', response.data);
        })
        .catch((error) => {
            console.error('Error al enviar el JSON:', error);
        });
    }

    return(
        <div>
            <Link to={"/"}>Volver al inicio</Link>
            <h1>Agregar empleado</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Nombre</label>
                    <input type="text" {...register('Nombre')}></input>
                </div>

                <div>
                    <label>Documento</label>
                    <input type="number" {...register('DNI')}></input>
                </div>

                <div>
                    <label>Puesto</label>
                    <input type="text" {...register('puesto')}></input>
                </div>

                <div>
                    <label>Telefono</label>
                    <input type="tel" {...register('telefono')}></input>
                </div>

                <div>
                    <label>Correo electronico</label>
                    <input type="email" {...register('correo')}></input>
                </div>

                <div>
                    <label>Dirección</label>
                    <input type="text" {...register('direccion')}></input>
                </div>

                <div>
                    <label>Sección</label>
                    <input type="number" {...register('seccion')}></input>
                </div>

                <div>
                    <label>Horas de trabajo asignadas</label>
                    <input type="number" {...register('horasTrabajoXDia')}></input>
                </div>
                <input type="submit" value="Agregar" />
            </form>
        </div>
        
    );
}

export default Formulario;