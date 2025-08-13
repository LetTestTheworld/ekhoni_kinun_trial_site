import { Navigate } from "react-router-dom";
import UseUser from "../common_component/UseUser";
import Loader from "../common_component/Loader";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../layouts/Navbar";
import Footer from "../layouts/Footer";

function Protected(props) {
    const Cmp = props.Cmp
    const [user, setUser] = useState("");
    const [loader, setLoader] = useState(true);
    useEffect(() => {
        let token = localStorage.getItem('auth-token');
        if (!token) {
            <Navigate to="/login" />
            setLoader(false);
        } else {
            (
                async () => {
                    let { data } = await axios.get("/user", {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    });
                    if (data) {
                        setUser(data);
                        setLoader(false);

                    }
                    // console.log(response);

                }
            )()
        }
    }, []);
    return (
        <>
            <div className="users-pages">
                <Navbar />
                {
                    loader ?
                        <Loader /> :
                        user ? <Cmp /> : <Navigate to="/login" />
                }
                <Footer />
            </div>
        </>
    )
}

export default Protected