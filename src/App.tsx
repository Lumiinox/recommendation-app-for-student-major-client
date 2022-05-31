import './App.css';
import MainLoginPage from './page/login/main-login-page';
import AdminHome from './page/admin/admin-home';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { State } from './redux';
import { useSelector } from 'react-redux';
import AdminCreateQuestion from './page/admin/create_questions';
import StudentHome from './page/student/student-home';
import StudentTest from './page/student/student-test';

function App() {
  const loginStatus = useSelector((state: State) => state.userData.loginStatus)
  const status = useSelector((state: State) => state.userData.status)

  return (
    <div className="App">
      
      <BrowserRouter>

        <Routes>

          <Route path="" element={<MainLoginPage/>}/>

          <Route path='/admin/home' 
            element={loginStatus && status === "admin" ? <AdminHome/> : <Navigate replace to="/"/>}/>
          
          <Route path='/admin/create-question' 
            element={loginStatus && status === "admin" ? <AdminCreateQuestion/> : <Navigate replace to="/"/>}/>

          <Route path='/student/home' 
            element={loginStatus && status === "student" ? <StudentHome/> : <Navigate replace to="/"/>}/>
          
          <Route path='/student/do-test' 
            element={loginStatus && status === "student" ? <StudentTest/> : <Navigate replace to="/"/>}/>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
