import { proplyInstance } from "../api/proplyInstance";

function ProcurementCategoryService() {

    const create = async (payload) =>{
        console.log(payload);
        try {
            if(payload) {
                const response = await proplyInstance.post("/procurement-categories", payload)
                return response.data
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Input failed');
        }
    }

    const getAll = async () =>{
        try {
            const response = await proplyInstance.get("/procurement-categories")
            return response.data.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Fetch procurement-categories failed');
        }
    }

    const update = async (payload) =>{
        try {
            const response = await proplyInstance.put("/procurement-categories", payload)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Update failed');
        }
    }

    const remove = async (payload) =>{
        try {
            const response = await proplyInstance.delete("/procurement-categories/delete/"+payload.procurementCategoryId)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Update failed');
        }
    }

    return{getAll,create,update,remove}
}

export default ProcurementCategoryService;