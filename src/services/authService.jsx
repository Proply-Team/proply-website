import { proplyInstance } from '../api/proplyInstance';


const AuthService = () => {
  const login = async (payload) => {
    try {
      const response = await proplyInstance.post("api/v1/auth/login", payload);
      console.log(response);
      
      // if (response.data.statusCode === 200) {
      //   localStorage.setItem("token",JSON.stringify(response.data))
      //   return response.data;
      // } else {
      //   throw new Error(response.data.message || 'Login failed');
      // }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem("token")
  }

  return {
    login,
    logout,
  };
};

export default AuthService;