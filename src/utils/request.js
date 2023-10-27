import axios from "axios";
// import cookies from "cookies-js"
import config from "@/config.js"
const request=axios.create({
    baseURL:config.baseURL,
})

// request.interceptors.request.use(
//     (config)=>{
//         config.headers.token=cookies.get("token")
//         config.headers.username=cookies.get("username")
//         return config;
//     },
//     (error)=>{
//         return Promise.reject(error);
//     }
// )

// request.interceptors.response.use(
//     (response)=>{
//         return response
//     },
//     (err)=>{
//         console.log(err);
//         return Promise.reject(err);
//     }
// )

export default request;