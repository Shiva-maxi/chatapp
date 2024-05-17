async function logout(req,res){
    try {

        const cookieoptions={
            http:true,
        }
        return res.cookie('token','',cookieoptions).status(200).json({
            message:"logout successfully/session out",
            success:true
        })
    } catch (error) {
        return res.status(500).json({
            message:error.message || error,
            error:true
        })
    }
}

module.exports=logout;