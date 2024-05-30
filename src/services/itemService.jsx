import { proplyInstance } from "../api/proplyInstance";
import { toast } from "react-toastify";

function ItemService() {

    const create = async (payload) =>{
        console.log(payload);
        try {
                const response = await proplyInstance.post("/items", payload)
                if (response.data.statusCode === 201) {
                    toast.success("New Item created")
                    return response.data;
                  } else {
                    toast.error(response.data.message)
                    throw new Error(response.data.message || "Create Item failed");
                }
            } catch (error) {
                    toast.error(error)
                  throw new Error(error.response?.data?.message || "Create Item failed");
            }
        }

    const getAll = async () =>{
        try {
            const response = await proplyInstance.get("/items/active")
            if (response.data.statusCode === 200) {
                return response.data.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Fetch data Item failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Fetch data Item failed");
        }
    }

    const update = async (payload) =>{
        try {
            const response = await proplyInstance.put("/items", payload)
            if (response.data.statusCode === 200) {
                toast.success("Item updated")
                return response.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Update Item failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Update Item failed");
        }
    }

    const remove = async (payload) =>{
        try {
            const response = await proplyInstance.delete("/items/delete/"+payload.itemId)
            if (response.data.statusCode === 200) {
                toast.success("Item deleted")
                return response.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Remove Item failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Remove Item failed");
        }
    }

    return{getAll,create,update,remove}
}

export default ItemService;