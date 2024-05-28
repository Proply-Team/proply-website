import { proplyInstance } from "../api/proplyInstance";

function DivisionService() {

    const create = async (payload) =>{
        try {
            if(payload) {
                const response = await proplyInstance.post("/divisions", payload)
                return response.data
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Input failed');
        }
    }

    const getAll = async () =>{
        try {
            const response = await proplyInstance.get("/divisions/active")
            return response.data.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Fetch division failed');
        }
    }

    const update = async (payload) =>{
        console.log(payload);
        const data = {id:payload.divisionId, name:payload.name}
        console.log(data);
        try {
            const response = await proplyInstance.put("/divisions", data)
            console.log(response);
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Update failed');
        }
    }

    const remove = async (payload) =>{
        try {
            const response = await proplyInstance.delete("/divisions/delete/"+payload.divisionId)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Update failed');
        }
    }

    return{getAll,create,update,remove}
}
export default DivisionService;