import { proplyInstance } from "../api/proplyInstance";

function UserService() {

    const createAdmin = async (payload) =>{
        console.log(payload);
        try {
            if(payload) {
                const response = await proplyInstance.post("/auth/register/admin", payload)
                return response.data
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Input failed');
        }
    }

    const createManager = async (payload) =>{
        console.log(payload);
        try {
            if(payload) {
                const response = await proplyInstance.post("/auth/register/manager", payload)
                return response.data
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Input failed');
        }
    }

    const createEmployee = async (payload) =>{
        console.log(payload);
        try {
            if(payload) {
                const response = await proplyInstance.post("/auth/register/employee", payload)
                return response.data
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Input failed');
        }
    }

    const getAll = async () =>{
        try {
            const response = await proplyInstance.get("/users/active")
            return response.data.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Fetch users failed');
        }
    }

    // const getById = async (payload) =>{
    //     try {
    //         const response = await proplyInstance.get("/users/")
    //         return response.data.data
    //     } catch (error) {
    //         throw new Error(error.response?.data?.message || 'Fetch users failed');
    //     }
    // }

    const update = async (payload) =>{
        try {
            const response = await proplyInstance.put("/users", payload)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Update failed');
        }
    }

    const remove = async (payload) =>{
        try {
            const response = await proplyInstance.delete("/users/delete/"+payload.userId)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Update failed');
        }
    }

    return{getAll,createAdmin,createManager,createEmployee,update,remove}
}

export default UserService;