function ProcurementService() {
    let procs = [];

    const create =(proc) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (proc) {
                    procs = [...procs,proc]
                    resolve("successfully request procurement")
                }else {
                    reject("procurement cannot be blank")
                }
            }, 2000);
        })
    }

    const getAll = () =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (procs.length>0) {
                    resolve(procs)
                }else {
                    reject("procurement cannot be blank")
                }
            }, 3000);
        })

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