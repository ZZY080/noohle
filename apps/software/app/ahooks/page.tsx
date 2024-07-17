"use client"
import {useLocalStorageState} from "ahooks";
import { useEffect } from "react";
interface Settings {
  icon:string,
  nav:[
    {
        [key:string]:string,
    }
  ]
}
const Ahooks=()=>{
    const [token,setToken] =useLocalStorageState<string [] | undefined>("token",{defaultValue:['1','3'],listenStorageChange:true});
    // useEffect(()=>{
    //     setToken("sdsds");
    // },[])
    return (
        <div>
           <div>{JSON.stringify(token)}</div>
           <input type="text" onChange={(e)=>setToken([e.target.value])} />
        </div>
    )
}

export default Ahooks;