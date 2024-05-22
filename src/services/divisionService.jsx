function DivisionService() {
    let divs = [];

    const create =(div) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (div) {
                    divs = [...divs,div]
                    resolve("successfully added division")
                }else {
                    reject("divison cannot be blank")
                }
            }, 2000);
        })
    }

    const getAll = () =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (divs.length>0) {
                    resolve(divs)
                }else {
                    reject("divison cannot be blank")
                }
            }, 3000);
        })

    }

    const update = (div) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (div) {
                    divs = divs.map((t)=>{
                        if(t.id===div.id) {
                            return{...div}
                        }
                        return t;
                    })
                    resolve("successfully updated divison")
                }else {
                    reject("divison cannot be blank")
                }
            }, 3000);
        })
    }

    return{getAll,create,update}
}
export default DivisionService;