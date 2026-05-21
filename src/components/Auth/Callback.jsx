import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { supabase } from "../../utils/supabase";

function AuthCallback(){

const navigate = useNavigate();

useEffect(()=>{

const loginUser = async()=>{
const { data:{session}}=await supabase.auth.getSession();
if(!session)
    return;

await axios.post(
"http://localhost:3000/auth/google",
{token:session.access_token},
{ withCredentials:true}
);
// Backend sets JWT cookie
navigate("/");
}
loginUser();
},[]);

return <h1>Logging in...</h1>

}

export default AuthCallback;