import { toast } from "react-toastify";
import { proplyInstance } from "../api/proplyInstance";

function UserService() {

    const createAdmin = async (payload) =>{
        console.log(payload);
        try {
            const response = await proplyInstance.post("/auth/register/admin", payload)
            if (response.data.statusCode === 201) {
                return response.data;
              } else {
                throw new Error(response.data.message || 'Create admin failed');
              }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Create admin failed');
        }
    }

    const createManager = async (payload) =>{
        console.log(payload);
        try {
            const response = await proplyInstance.post("/auth/register/manager", payload)
            if (response.data.statusCode === 201) {
                return response.data;
              } else {
                throw new Error(response.data.message || 'Create manager failed');
              }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Create manager failed');
        }
    }

    const createEmployee = async (payload) =>{
        console.log(payload);
        try {
            const response = await proplyInstance.post("/auth/register/employee", payload)
            if (response.data.statusCode === 201) {
                return response.data;
              } else {
                throw new Error(response.data.message || 'Create employee failed');
              }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Create employee failed');
        }
    }

    const updatePhoto = async (payload) =>{
        console.log(payload);
        try {
            const response = await proplyInstance.post("/user-profiles", payload)
            console.log(response);
            if (response.data.statusCode === 200) {
                return response.data;
              } else {
                throw new Error(response.data.message || 'Upload Photo failed');
              }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Upload Photo failed');
        }
    }

    const getAll = async () =>{
        try {
            const response = await proplyInstance.get("/users/active")
            if (response.data.statusCode === 200) {
                return response.data.data;
              } else {
                throw new Error(response.data.message || 'Fetch data users failed');
              }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Fetch data users failed');
        }
    }

    const getCurrentUser = async (payload) =>{
        try {
            const response = await proplyInstance.post("/users/email",payload)
            if (response.data.statusCode === 200) {
                return response.data.data;
              } else {
                throw new Error(response.data.message || 'Fetch data current user failed');
              }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Fetch data current user failed');
        }
    }

    const update = async (payload) =>{
        const data = new FormData();
        data.append("id", payload.userId);
        data.append("birthDate", payload.birthDate);
        data.append("divisionId", payload.divisionId);
        data.append("email", payload.email);
        data.append("fullName", payload.fullName);
        data.append("maritalStatus", payload.maritalStatus);
        data.append("gender", payload.gender);
        // data.append("profileImage", payload.profileImageUrl);
            try {
                const response = await proplyInstance.put("/users",data);
                console.log(response);
                if (response.statusCode === 200) {
                    return response.data;
                  } else {
                    throw new Error(response.message || 'Update user failed');
                  }
            } catch (error) {
                throw new Error(error.response?.message || 'Update user failed');
            }
    }          
    

    const remove = async (payload) =>{
        try {
            const response = await proplyInstance.delete("/users/delete/"+payload.userId)
            console.log(response);
            if (response.data.statusCode === 200) {
                return response.data;
              } else {
                throw new Error(response.data.message || 'Delete user failed');
              }
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Delete user failed');
        }
}

    return{getAll,createAdmin,createManager,createEmployee,update,remove,getCurrentUser,updatePhoto}
}

export default UserService;