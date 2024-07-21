// import {  ReactNode, useEffect, useState } from "react"
// import { useSelector } from "react-redux";
// import { useCurrentToken } from "../redux/features/auth/authSlice";
// import { Navigate } from "react-router-dom";

// const AuthLayout = ({children}:ReactNode) => {
// const[isMount,setIsMount]=useState(false);
// useEffect(()=>{setIsMount(true)},[])
// const token =useSelector(useCurrentToken)
// if(isMount && token){
//   return <Navigate to="/auth/login" replace />
// }else{
//     return {children}
// }

  
// }

// export default AuthLayout