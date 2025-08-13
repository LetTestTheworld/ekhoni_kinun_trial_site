import axios from "axios";
import { useEffect, useState } from "react";

function UseUser() {
    const [user, setUser] = useState("");
    useEffect(() => {
        let token = localStorage.getItem('auth-token');
        if (token) {
            (
                async () => {
                    let {data} = await axios.get("/user", {
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    })
                    setUser(data);
                }
            )()
        }
    }, []);
    return user;
}

export default UseUser