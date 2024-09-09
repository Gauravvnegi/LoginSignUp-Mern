import axios, { AxiosError } from "axios";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
  });

  const onSubmit: FormEventHandler<HTMLFormElement> = async(event) => {
    event.preventDefault();    
    try{
        const data = await axios.post('http://localhost:3001/api/signup',{
            username: signupData.username,
            email: signupData.email,
            password: signupData.password,
            confirmPassword: signupData.confirmPassword,
        })
        console.log(data);
    }catch (error) {
        const axiosError = error as AxiosError;
    
        
        interface ErrorResponse {
            message: string;
        }
    
        if (axiosError.response) {
            const errorData = axiosError.response.data as ErrorResponse;
            alert(errorData.message || 'An error occurred during login. Please try again.');
        } else {
            console.error('Error during login:', axiosError.message);
        }
    }
    
    
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignupData((prevSignupData) => ({
      ...prevSignupData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={onSubmit}
        className="bg-white p-6 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

        <div className="mb-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={signupData.username}
            onChange={handleInput}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleInput}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleInput}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={signupData.confirmPassword}
            onChange={handleInput}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="text-center text-sm text-gray-600 mb-4">
    or already have an account?{' '}
    <Link to="/login" className="text-blue-500 hover:underline">
        Login
    </Link>
</p>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
