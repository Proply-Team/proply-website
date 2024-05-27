import { proplyInstance } from '../api/proplyInstance';


const AuthService = () => {
  const login = async (payload) => {
    try {
      console.log(payload)
      const response = await proplyInstance.post("/auth/login", payload);
      
      if (response.data.statusCode === 200) {
        localStorage.setItem("token",JSON.stringify(response.data.data.token))
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem("token")
  }

  const validateToken = async () => {
      try{
        const res = await proplyInstance.get("/auth/validate-token")
        if(res.data.statusCode != 200) throw new Error(res.data.message)
        
        const token = localStorage.getItem('token')

        return token
      }catch(e){
        localStorage.removeItem('token')
        throw new Error(e.response?.data?.message || 'Token expired')
      }
  }

  return {
    login,
    logout,
    validateToken
  };
};

export default AuthService;