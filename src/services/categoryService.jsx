function CategoryService() {
    let cats = [];

    const create =(cat) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (cat) {
                    cats = [...cats,cat]
                    resolve("successfully added category")
                }else {
                    reject("category cannot be blank")
                }
            }, 2000);
        })
    }

    const getAll = () =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (cats.length>0) {
                    resolve(cats)
                }else {
                    reject("category cannot be blank")
                }
            }, 3000);
        })

    }

    const update = (cat) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (cat) {
                    cats = cats.map((t)=>{
                        if(t.id===cat.id) {
                            return{...cat}
                        }
                        return t;
                    })
                    resolve("successfully updated category")
                }else {
                    reject("category cannot be blank")
                }
            }, 3000);
        })
    }

    return{getAll,create,update}
}
export default CategoryService;