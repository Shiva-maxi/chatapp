import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Checkemail from "../pages/Checkemail";
import Checkpassword from "../pages/Checkpassword";
import Home from "../pages/Home";
import Forgotpassword from "../pages/Forgotpassword";
import Messagepage from "../components/Messagepage";
import Authlayout from "../layouts/Authlayout";
const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:"",
                element:<Home/>,
                children:[
                    {
                        path:":userid",
                        element:<Messagepage/>
                    }
                ]
            },
            {
                path:"register",
                element:<Authlayout><Register/></Authlayout>
            },
            {
                path:'email',
                element:<Authlayout> <Checkemail/></Authlayout>
            },
            {
                path:"password",
                element:<Authlayout> <Checkpassword/></Authlayout>
            },
            {
                path:"forgetpassword",
                element:<Authlayout> <Forgotpassword/></Authlayout>
            }
        ]
    }
])



export default router