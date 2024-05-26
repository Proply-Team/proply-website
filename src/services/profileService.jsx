function ProfileService() {
    let profs = [];

    const create =(prof) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (prof) {
                    profs = [...profs,prof]
                    resolve("successfully added profile")
                }else {
                    reject("profile cannot be blank")
                }
            }, 2000);
        })
    }

    const getAll = () =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (profs.length>0) {
                    resolve(profs)
                }else {
                    reject("profile cannot be blank")
                }
            }, 3000);
        })

    }

    const update = (prof) =>{
        return new Promise ((resolve, reject) =>{
            setTimeout(() => {
                if (prof) {
                    profs = profs.map((t)=>{
                        if(t.id===prof.id) {
                            return{...prof}
                        }
                        return t;
                    })
                    resolve("successfully updated profile")
                }else {
                    reject("profile cannot be blank")
                }
            }, 3000);
        })
    }

    return{getAll,create,update}
}
export default ProfileService;