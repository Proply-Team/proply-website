import axios from "axios";

export const proplyInstance = axios.create({
    baseURL: "https://proply-backend-jjwesamxia-as.a.run.app/api/v1",
    timeout: 1000,
    headers: {
        
    }
})