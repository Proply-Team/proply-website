import axios from 'axios';

const AuthService = () => {
  const login = async (payload) => {
    try {
      console.log(payload);
      const response = await axios.post("https://proply-backend-jjwesamxia-as.a.run.app/api/v1/auth/login", payload);
      console.log(response.data);
      
      if (response.data.statusCode === 200) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  return {
    login,
  };
};

export default AuthService;