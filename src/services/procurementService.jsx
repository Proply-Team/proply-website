import { proplyInstance } from "../api/proplyInstance";

function ProcurementService() {
    let procs = [];

    const create = async (proc) =>{
        try{
            console.log(proc)
            const res = await proplyInstance.post("/procurements", proc)
            return res.data
        }catch(e){
            throw new Error(e.message)
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

    const update = (proc) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (proc) {
                    procs = procs.map((t)=>{
                        if(t.id===proc.id) {
                            return{...proc}
                        }
                        return t;
                    })
                    resolve("successfully updated procurement")
                }else {
                    reject("procurement cannot be blank")
                }
            }, 3000);
        })
    }

    return{getAll,create,update}
}
export default ProcurementService;