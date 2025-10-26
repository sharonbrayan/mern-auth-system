import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext=createContext();
export const AppContextProvider=(props)=>{  
    const backendUrl=import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setisLoggedIn] = useState(false);
    const [userData, setuserData] = useState(false);
    axios.defaults.withCredentials = true;
    
    const getUserData=async ()=>{
        try {
            const {data}=await axios.get(backendUrl+'/api/user/data');
            data.success?setuserData(data.userData):toast.error(data.message)
        } catch (error) {
            console.log(error);
        }
    }
    const value={
        backendUrl,
        isLoggedIn,setisLoggedIn,
        userData,setuserData,
        getUserData
    }
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}