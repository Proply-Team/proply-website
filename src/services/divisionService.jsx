import { proplyInstance } from "../api/proplyInstance";
import { toast } from "react-toastify";

function DivisionService() {

    const create = async (payload) =>{
        try {
            const response = await proplyInstance.post("/divisions", payload)
            if (response.data.statusCode === 201) {
                toast.success("New Division created")
                return response.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Create Division failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Create Division failed");
        }
    }

    const getAll = async () =>{
        try {
            const response = await proplyInstance.get("/divisions/active")
            if (response.data.statusCode === 200) {
                return response.data.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Fetch data Division failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Fetch data Division failed");
        }
    }

    const update = async (payload) =>{
        const data = {id:payload.divisionId, name:payload.name}
        try {
            const response = await proplyInstance.put("/divisions", data)
            if (response.data.statusCode === 200) {
                toast.success("Division updated")
                return response.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Update Division failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Update Division failed");
        }
    }

    const remove = async (payload) =>{
        try {
            const response = await proplyInstance.delete("/divisions/delete/"+payload.divisionId)
            console.log(response.data.statusCode);
            if (response.data.statusCode === 200) {
                console.log("aaaaaaaaaaaaaaaaaaaaa");
                toast.success("Division deleted")
                return response.data;
              } else {
                toast.error(response.data.message)
                throw new Error(response.data.message || "Remove Division failed");
            }
        } catch (error) {
                toast.error(error)
              throw new Error(error.response?.data?.message || "Remove Division failed");
        }
    }

    return{getAll,create,update,remove}
}
export default DivisionService;