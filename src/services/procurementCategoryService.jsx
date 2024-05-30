import { proplyInstance } from "../api/proplyInstance";
import { toast } from "react-toastify";

function ProcurementCategoryService() {

    const create = async (payload) =>{
        console.log(payload);
        try {
                const response = await proplyInstance.post("/procurement-categories", payload)
                if (response.data.statusCode === 201) {
                    toast.success("New Procurement Category created")
                    return response.data;
                  } else {
                    toast.error(response.data.message)
                    throw new Error(response.data.message || "Create Procurement Category failed");
                }
            } catch (error) {
                    toast.error(error)
                  throw new Error(error.response?.data?.message || "Create Procurement Category failed");
            }
        }

    const getAll = async () =>{
        try {
            const response = await proplyInstance.get("/procurement-categories")
            if (response.data.statusCode === 200) {
                return response.data.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Fetch data Procurement Category failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Fetch data Procurement Category failed");
        }
    }

    const update = async (payload) =>{
        try {
            const response = await proplyInstance.put("/procurement-categories", payload)
            if (response.data.statusCode === 200) {
                toast.success("Procurement Category updated")
                return response.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Update Procurement Category failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Update Procurement Category failed");
        }
    }

    const remove = async (payload) =>{
        try {
            const response = await proplyInstance.delete("/procurement-categories/delete/"+payload.procurementCategoryId)
            if (response.data.statusCode === 200) {
                toast.success("Procurement Category deleted")
                return response.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Remove Procurement Category failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Remove Procurement Category failed");
        }
    }

    return{getAll,create,update,remove}
}

export default ProcurementCategoryService;