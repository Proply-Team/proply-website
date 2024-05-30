import { toast } from "react-toastify";
import { proplyInstance } from "../api/proplyInstance";

function CategoryService() {

    const create = async (payload) =>{
        try {
                const response = await proplyInstance.post("/item-categories", payload)
            if (response.data.statusCode === 201) {
                toast.success("New Item Category created")
                return response.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Create Item Category failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Create Item Category failed");
        }
    }

    const getAll = async () =>{
        try {
            const response = await proplyInstance.get("/item-categories/active")
            if (response.data.statusCode === 200) {
                return response.data.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Fetch data Item Category failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Fetch data Item Category failed");
        }
    }

    const update = async (payload) =>{
        try {
            const response = await proplyInstance.put("/item-categories", payload)
            if (response.data.statusCode === 200) {
                toast.success("Item Category updated")
                return response.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Update Item Category failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Update Item Category failed");
        }
    }

    const remove = async (payload) =>{
        try {
            const response = await proplyInstance.delete("/item-categories/delete/"+payload.itemCategoryId)
            if (response.data.statusCode === 200) {
                toast.success("Item Category deleted")
                return response.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Remove Item Category failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Remove Item Category failed");
        }
    }

    return{getAll,create,update,remove}
}
export default CategoryService;