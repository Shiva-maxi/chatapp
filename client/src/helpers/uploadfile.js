const cloudinary_url=`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOD_NAME}/auto/upload`;
console.log(process.env.REACT_APP_CLOUDINARY_CLOD_NAME)
console.log(process.env.REACT_APP_BACKEND_URL);
const uploadfile=async function(file){
    const formdata=new FormData();

    formdata.append('file',file);
    formdata.append('upload_preset',"chat-app-file");

    const upload=await fetch(cloudinary_url,{
        method:'post',
        body:formdata,
    })

    const responsedata=await upload.json();

    return responsedata;
}

export default uploadfile;