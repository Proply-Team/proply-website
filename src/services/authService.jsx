import axios from 'axios';


const AuthService = () => {
  const login = async (payload) => {
    try {
      console.log(payload);
      const response = await axios.post("/auth/login", payload);
      console.log(response.data);
      
      if (response.data.statusCode === 200) {
        localStorage.setItem("user",JSON.stringify(response.data))
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem("user")
  }

  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"))
  }

  return {
    login,
    logout,
    getCurrentUser
  };
};

export default AuthService;