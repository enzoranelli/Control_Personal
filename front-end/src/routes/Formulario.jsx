import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate} from "react-router-dom";
import axios from 'axios';
import {API_URL, headers} from '../auth/constantes'
import '../styles/Formulario.css';

function Formulario(){
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate()

    
    const onSubmit = (data) =>{
        const apiUrl = `${API_URL}/personal`;
        const verificar = verificarFormulario(data);
        
        console.log(verificar)
        if(verificar){
            axios.post(apiUrl, data, {headers:headers})
            .then((response) => {
                console.log('Respuesta de la API:', response.data);
                alert('Empleado agregado correctamente!!');
                navigate('/dashboard');
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
            <Link to={"/dashboard"}><button className="boton-volver">Volver al inicio</button></Link>
            <h1>Agregar empleado</h1>
            <form className="form-agregar" onSubmit={handleSubmit(onSubmit)}>
                <div className="contenedor-input">
                    <label className="label-form">Nombre</label>
                    <input type="text" className="input-text" {...register('Nombre')}></input>
                </div>

                <div className="contenedor-input">
                    <label>Documento<b>**</b></label>
                    <input type="number" className="input-text" {...register('DNI')}></input>
                </div>

                <div className="contenedor-input">
                    <label>Puesto</label>
                    <input type="text" className="input-text" {...register('puesto')}></input>
                </div>

                <div className="contenedor-input">
                    <label>Telefono</label>
                    <input type="tel" className="input-text" {...register('telefono')}></input>
                </div>

                <div className="contenedor-input">
                    <label>Dirección</label>
                    <input type="text" className="input-text"  {...register('direccion')}></input>
                </div>

                <div className="contenedor-input">
                    <label>Sección</label>
                    <input type="number" className="input-text" {...register('seccion')}></input>
                </div>

                <div className="contenedor-input">
                    <label>Horas de trabajo asignadas</label>
                    <input type="number" className="input-text" {...register('horasTrabajoXDia')}></input>
                </div>
                
                <h1>Datos de usuario</h1>

                <div className="contenedor-input">
                    <label>Correo electronico<b>**</b></label>
                    <input type="email" className="input-text" {...register('correo',{autoComplete:"off"})}></input>
                </div>

                <div className="contenedor-input">
                    <label>Contraseña</label>
                    <input type="password" className="input-text" {...register('contrasena',{autoComplete:"off"})}></input>
                </div>

                <div className="contenedor-input">
                    <label>Confirmar contraseña</label>
                    <input type="password" className="input-text" {...register('confirmar')}></input>
                </div>

                <div>
                    <label><b>¿Es administrador?</b></label>
                    <div className="contenedor-radio">
                        <label>
                            <input
                                className="input-radio"
                                type="radio"
                                value="true"
                                {...register('rh')}
                            />
                            Sí
                        </label>

                        <label>
                            <input
                                className="input-radio-no"
                                type="radio"
                                value="false"
                                {...register('rh')}
                            />
                            No
                        </label>
                    </div>
                </div>
                <p className="aviso">{'(**) Los campos marcados tienen que ser unicos para cada empleado.'}</p>
                <input type="submit" value="Agregar" className="boton-submit"/>
            </form>
        </div>
        
    );
}

export default Formulario;