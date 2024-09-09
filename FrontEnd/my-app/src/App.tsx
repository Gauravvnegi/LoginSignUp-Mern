
import { Route, Routes } from 'react-router-dom';
import Login from './component/Login';
import SignUp from './component/SignUp' 

function App() {
    return (
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/singup" element={<SignUp />} />
                <Route path="/" element={<Login />} />
            </Routes>
    );
}

export default App;
