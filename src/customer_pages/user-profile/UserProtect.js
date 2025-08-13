import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import UseUser from '../../common_component/UseUser';


function UserProtected(props){
    let Cmp = props.Cmp
    const navigate = useNavigate("");
    const user = UseUser()
    if(user.username==null){
        // sessionStorage.setItem('respondedMessage', "Please login first.");
        navigate("/login-as-shop-owner");
    }
    else if(user.role != "user"){
        sessionStorage.setItem('respondedMessage', "You are not authorized to access this page.");
        navigate("/");
    }

    return(
        <>
            <Cmp user={user} />
        </>
    )

}

export default UserProtected