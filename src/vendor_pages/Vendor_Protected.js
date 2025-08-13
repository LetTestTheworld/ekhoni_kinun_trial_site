import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

function Vendor_Protected(props){
    let Cmp = props.Cmp
    const navigate = useNavigate("");
    const [user, setUser] = useState("");

    useEffect(() => {
        let token = localStorage.getItem('auth-token');
        if (!token) {
            navigate("/login-as-shop-owner");
        }

        (
            async ()=>{
                let {data} = await axios.get("/user", {
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                });
                if (data) {
                    setUser(data);
                    
                }
                // console.log(response);
                
            }
        )()

    },[]);
    if(user.name==null){
        // sessionStorage.setItem('respondedMessage', "Please login first.");
        navigate("/login-as-shop-owner");
    }
    else if(user.role != "shop_owner"){
        sessionStorage.setItem('respondedMessage', "You are not authorized to access this page.");
        navigate("/");
    }

    return(
        <>
            <Cmp user={user} />
        </>
    )

}

export default Vendor_Protected