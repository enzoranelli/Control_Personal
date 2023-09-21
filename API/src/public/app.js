

document.addEventListener('DOMContentLoaded', () => {
  const video = document.getElementById('qr-video');
  const canvas = document.getElementById('qr-canvas');
  const context = canvas.getContext('2d');
  let requestSent = false;

  canvas.willReadFrequently = true;
  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;

        // Espera a que el video esté cargado antes de iniciar el escaneo
      video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        scanQRCode();
      });
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  startCamera();

  function scanQRCode() {
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
      
    if (code && !requestSent) {
      console.log('Código QR escaneado:', code.data);
        
      setTimeout(() => {

          const data = {
            qr: code.data,
          }

          fetch('http://localhost:9000/api/entrada_salida/',{
            method: 'POST',
            headers:{
              'Content-Type':'application/json',
            },
            body: JSON.stringify(data),
          })
          .then(response =>{
            if(!response.ok){
              throw new Error('Error en la solicitud');
            }
          })
          .then(data =>{
            console.log('Respuesta del servidor',data);
          })
          .catch(error=>{
            console.error('Error:',error);
          })

          console.log('La solicitud se ha completado con éxito.');
          requestSent = false; // Restablece requestSent a false después de un tiempo de espera
      }, 2000); 
      requestSent = true;

    }
    requestAnimationFrame(scanQRCode);
  }   
});