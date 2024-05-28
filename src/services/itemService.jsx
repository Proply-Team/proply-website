import { proplyInstance } from "../api/proplyInstance";

function ItemService() {

    const create = async (payload) =>{
        console.log(payload);
        try {
            if(payload) {
                const response = await proplyInstance.post("/items", payload)
                return response.data
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Input failed');
        }
    }

    const getAll = async () =>{
        try {
            const response = await proplyInstance.get("/items/active")
            return response.data.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Fetch items failed');
        }
    }

    const update = async (payload) =>{
        try {
            const response = await proplyInstance.put("/items", payload)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Update failed');
        }
    }

    const remove = async (payload) =>{
        try {
            const response = await proplyInstance.delete("/items/delete/"+payload.itemId)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Update failed');
        }
    }

    return{getAll,create,update,remove}
}

export default ItemService;