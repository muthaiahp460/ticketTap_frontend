import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { supabase } from "../../utils/supabase";
function AuthCallback(){

const navigate = useNavigate();

useEffect(()=>{

const loginUser = async()=>{
try {
const { data:{session}}=await supabase.auth.getSession();
if(!session) {
    toast.error("No session found");
    navigate("/login");
    return;
}

const response = await axios.post(
`${import.meta.env.VITE_API_BASE_URL}/auth/google`,
{token:session.access_token},
{ withCredentials:true}
);

if(response.status === 200) {
  toast.success("Login successful");
  navigate("/");
} else {
  toast.error("Login failed");
  navigate("/login");
}
} catch(error) {
const errorMsg = error.response?.data?.message || "Authentication failed";
toast.error(errorMsg);
console.error("Auth callback error:", error);
navigate("/login");
}
}
loginUser();
},[navigate]);

return <h1>Logging in...</h1>

}

export default AuthCallback;