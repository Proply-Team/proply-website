import axios from "axios";

export const proplyInstance = axios.create({
    baseURL: "https://proply-backend-jjwesamxia-as.a.run.app/api/v1",
})


proplyInstance.interceptors.request.use((config) => {
    const token = JSON.parse(localStorage.getItem('token'))
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
}, (err) => {
    return Promise.reject(err)
})