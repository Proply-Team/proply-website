function ProcurementDetailService() {
    let procDets = [];

    const create =(procDet) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (procDet) {
                    procDets = [...procDets,procDet]
                    resolve("successfully request procurement detail")
                }else {
                    reject("procurement detail cannot be blank")
                }
            }, 2000);
        })
    }

    const getAll = () =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (procDets.length>0) {
                    resolve(procDets)
                }else {
                    reject("procurement detail cannot be blank")
                }
            }, 3000);
        })

    }

    const update = (procDet) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (procDet) {
                    procDets = procDets.map((t)=>{
                        if(t.id===procDet.id) {
                            return{...procDet}
                        }
                        return t;
                    })
                    resolve("successfully updated procurement detail")
                }else {
                    reject("procurement detail cannot be blank")
                }
            }, 3000);
        })
    }

    return{getAll,create,update}
}
export default ProcurementDetailService;