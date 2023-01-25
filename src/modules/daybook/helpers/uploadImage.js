import axios from "axios"

const uploadImage = async(file) => {
    if( !file ) return
    try {
        
        const formData = new FormData()
        formData.append('upload_preset', 'ca3anosp')
        formData.append('file', file )
        const url = 'https://api.cloudinary.com/v1_1/dxtnf9yrm/image/upload';

        const { data } = await axios.post( url, formData )

        return data.secure_url;

    } catch (error) {
        console.error('Error al cargar la imagen, revisar logs', error);
        return null;
    }
}

export default uploadImage;