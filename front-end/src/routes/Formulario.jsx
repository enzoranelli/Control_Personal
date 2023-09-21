import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from 'axios';
import {API_URL} from '../auth/constantes'


function Formulario(){
    const {register, handleSubmit} = useForm();
    /*const headers={
        "ngrok-skip-browser-warning": "69420",
    }*/
    const onSubmit = (data) =>{
        const apiUrl = `${API_URL}/personal`;
        const verificar = verificarFormulario(data);
        // Realiza una solicitud POST utilizando Axios
        console.log(verificar)
        if(verificar){
            axios.post(apiUrl, data)
            .then((response) => {
                console.log('Respuesta de la API:', response.data);
            })
            .catch((error) => {
                console.error('Error al enviar el JSON:', error);
            });
        }else{
            alert('Campos incompletos');
        }
        
    }

    function verificarFormulario(data){
        console.log(data)
        for(const propiedad in data){
            if(data.hasOwnProperty(propiedad)){
                const valor = data[propiedad];
                if(valor === '' || valor === ""){
                    return false;
                }
            }
        }
        data.rh = data.rh=== 'true'
        console.log(data.contrasena);
        console.log(data.confirmar);
        return data.contrasena === data.confirmar ? true : false;
        
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
                
                <h1>Datos de usuario</h1>

                <div>
                    <label>Correo electronico</label>
                    <input type="email" {...register('correo')}></input>
                </div>

                <div>
                    <label>Contraseña</label>
                    <input type="password" {...register('contrasena')}></input>
                </div>

                <div>
                    <label>Confirmar contraseña</label>
                    <input type="password" {...register('confirmar')}></input>
                </div>

                <div>
                    <label><b>¿Es administrador?</b></label>
                    <div>
                        <label>
                            <input
                                type="radio"
                                value="true"
                                {...register('rh')}
                            />
                            Sí
                        </label>

                        <label>
                            <input
                                type="radio"
                                value="false"
                                {...register('rh')}
                            />
                            No
                        </label>
                    </div>
                </div>
                <input type="submit" value="Agregar" />
            </form>
        </div>
        
    );
}

export default Formulario;