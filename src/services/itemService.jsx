function ItemService() {
    let itms = [];

    const create =(itm) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (itm) {
                    itms = [...itms,itm]
                    resolve("successfully added item")
                }else {
                    reject("item cannot be blank")
                }
            }, 2000);
        })
    }

    const getAll = () =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (itms.length>0) {
                    resolve(itms)
                }else {
                    reject("item cannot be blank")
                }
            }, 3000);
        })

    }

    const update = (itm) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (itm) {
                    itms = itms.map((t)=>{
                        if(t.id===itm.id) {
                            return{...itm}
                        }
                        return t;
                    })
                    resolve("successfully updated item")
                }else {
                    reject("item cannot be blank")
                }
            }, 3000);
        })
    }

    return{getAll,create,update}
}
export default ItemService;