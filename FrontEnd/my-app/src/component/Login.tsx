import  {ChangeEvent, FormEventHandler, useState} from 'react';
import axios, { AxiosError } from 'axios'; 
import { Link } from 'react-router-dom';
function Login() {
    const [loginData , setLoginData] = useState({
        username: '',
        password: ''
    })
    const onSubmit: FormEventHandler<HTMLFormElement> = async(event) => {
        event.preventDefault();
        console.log(loginData); 
        const { username, password } = loginData;  
        try {
    
            const response = await axios.post('http://localhost:3001/api/checkUser', {
                username: username,
                password: password
            });
          
            if(response){
                alert('Login successful')
            }
            
        } catch (error) {
            const axiosError = error as AxiosError;
            if (axiosError.response) {
                console.error('Error during login:', axiosError.response.data);
            } else {
                console.error('Error during login:', axiosError.message);
            }
        }
    };
    const handleInput = (event:ChangeEvent<HTMLInputElement>)=>{
        const { name, value } = event.target;
        setLoginData((loginData)=>({
            ...loginData,
            [name]: value
        }));
    }
    return (
<div className="flex items-center justify-center min-h-screen bg-gray-100">
    <form onSubmit={onSubmit} className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>
        <div className="mb-4">
            <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={loginData.username}
                onChange={handleInput}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <div className="mb-4">
            <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={loginData.password}
                onChange={handleInput}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
        <p className="text-center text-sm text-gray-600 mb-4">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Signup
                    </Link>
                </p>
        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
            Login
        </button>
        
    </form>
</div>

    )
  }
  export default Login;