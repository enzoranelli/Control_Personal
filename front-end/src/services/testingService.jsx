 import axios from 'axios';

export function testingService(){
    let datos = {}
    axios.get('http://localhost:9000/').then(response => {datos=response.data}).catch(error => {console.log(error);});
    console.log(datos)
    return datos;
}