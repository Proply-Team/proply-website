import { proplyInstance } from "../api/proplyInstance";

function CategoryService() {

    const create = async (payload) =>{
        try {
            if(payload) {
                const response = await proplyInstance.post("/item-categories", payload)
                return response.data
            }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Input failed');
        }
    }

    const getAll = async () =>{
        try {
            const response = await proplyInstance.get("/item-categories/active")
            return response.data.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Fetch item-category failed');
        }
    }

    const update = async (payload) =>{
        try {
            const response = await proplyInstance.put("/item-categories", payload)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Update failed');
        }
    }

    const remove = async (payload) =>{
        try {
            const response = await proplyInstance.delete("/item-categories/delete/"+payload.itemCategoryId)
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Update failed');
        }
    }

    return{getAll,create,update,remove}
}
export default CategoryService;