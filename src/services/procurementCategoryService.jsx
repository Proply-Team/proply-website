function ProcurementCategoryService() {
    let proCats = [];

    const create =(proCat) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (proCat) {
                    proCats = [...proCats,proCat]
                    resolve("successfully added procurement category")
                }else {
                    reject("procurement category cannot be blank")
                }
            }, 2000);
        })
    }

    const getAll = () =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (proCats.length>0) {
                    resolve(proCats)
                }else {
                    reject("procurement category cannot be blank")
                }
            }, 3000);
        })

    }

    const update = (proCat) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (proCat) {
                    proCats = proCats.map((t)=>{
                        if(t.id===proCat.id) {
                            return{...proCat}
                        }
                        return t;
                    })
                    resolve("successfully updated procurement category")
                }else {
                    reject("procurement category cannot be blank")
                }
            }, 3000);
        })
    }

    return{getAll,create,update}
}
export default ProcurementCategoryService;