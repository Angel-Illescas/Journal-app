
export const filesUpload = async(file) => {
 const cloudUrl = `https://api.cloudinary.com/v1_1/diooo3sdt/upload`

 const formData = new FormData()

 formData.append('upload_preset','react-journal')
 formData.append('file', file) //PREPARAMOS EL BODY PARA EL POSTEO 

 try {

    const resp = await fetch(cloudUrl,{
        method: 'POST',
        body: formData
    }) //POSTEO AL SERVIDOR DE CLOUD

    if (!resp.ok) throw new Error('Fallo al subir archivo')
    
        const cloudResp = await resp.json() 

        return cloudResp.secure_url

 } catch (error) {
     throw new Error(error.mesagge)
 }
}
