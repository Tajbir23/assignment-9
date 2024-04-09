import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../config/Config"


const useAuthValidation = () => {
    const [data, setData] = useState()

    useEffect(() => {
        try{
            onAuthStateChanged(auth, async (user) => {
                await user
                if(user){
                    setData(user)
                }else{
                    setData(null)
                }
            })
        } catch(err){
            console.log(err)
        }
        
    },[])
  return {data}
}

export default useAuthValidation