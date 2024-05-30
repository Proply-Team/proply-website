import { proplyInstance } from "../api/proplyInstance";
import { toast } from "react-toastify";

function ProcurementService() {
    const create = async (proc) =>{
        try{
            console.log(proc)
            const res = await proplyInstance.post("/procurements", proc)
            return res.data
        }catch(e){
            throw new Error(e.message)
        }
    }

    const getById = async (payload) => {
        try{
            const res = await proplyInstance.get(`/procurements/${payload}`)
            return res.data
        }catch(e){
            throw new Error(e)
        }
    }

    const getAll = async (payload) =>{
        try{
            let res;
            if(payload){
                res = await proplyInstance.get(`/procurements/search?user-id=${payload}`)
            }else{
                res = await proplyInstance.get("/procurements")
            }

            return res.data
        }catch(e){
            throw new Error(e)
        }
    }

    const approve = async (payload) =>{
        try {
            const response = await proplyInstance.put("/procurements/approve", payload)
            if (response.data.statusCode === 200) {
                toast.success("Approval submitted")
                return response.data;
              } else {
                throw new Error(response.data.message || "Approvement failed");
              }
            } catch (error) {
              throw new Error(error.response?.data?.message || "Approvement failed");
            }
        }

    const reject = async (payload) =>{
        try {
            const response = await proplyInstance.put("/procurements/reject", payload)
            if (response.data.statusCode === 200) {
                toast.success("Rejection submitted")
                return response.data;
              } else {
                throw new Error(response.data.message || "Reject failed");
              }
            } catch (error) {
              throw new Error(error.response?.data?.message || "Reject failed");
            }
    }

    return{getAll,create, approve, getById, reject}
}
export default ProcurementService;