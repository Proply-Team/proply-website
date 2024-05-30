import { proplyInstance } from "../api/proplyInstance";

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
            return response.data
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Update failed');
        }
    }

    return{getAll,create, approve, getById}
}
export default ProcurementService;