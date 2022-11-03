/** @jsxImportSource @emotion/react */
import { Global } from '@emotion/react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import { State } from './redux';
import { useSelector } from 'react-redux';
import { GlobalAppStyle } from './App.style';

import StudentTest from './page/student/student-test/index.view';
import ViewQuestionsPage from './page/admin/admin-view-questions/index.view';
import ListOfTestResult from './page/admin/admin-list-of-test-result/index.view';
import AdminHome from './page/admin/admin-home/index.view';
import StudentHome from './page/student/student-home/index.view';
import AdminCreateQuestion from './page/admin/create-questions/index.view';
import MainLoginPage from './page/login/main-login-page/index.view';


function App() {
  const loginStatus = useSelector((state: State) => state.userData.loginStatus)
  const status = useSelector((state: State) => state.userData.status)

  return (
    <div className="App" css={GlobalAppStyle}>
      <Global styles={GlobalAppStyle}/>
      <BrowserRouter>

        <Routes>

          <Route path="" element={<MainLoginPage/>}/>

          <Route path='/admin/home' 
            element={loginStatus && status === 1 ? <AdminHome/> : <Navigate replace to="/"/>}/>
          
          <Route path='/admin/create-question' 
            element={loginStatus && status === 1 ? <AdminCreateQuestion/> : <Navigate replace to="/"/>}/>

          <Route path='/admin/view-question' 
            element={loginStatus && status === 1 ? <ViewQuestionsPage/> : <Navigate replace to="/"/>}/>

          <Route path='/admin/view-test-result' 
            element={loginStatus && status === 1 ? <ListOfTestResult/> : <Navigate replace to="/"/>}/>

          <Route path='/student/home' 
            element={loginStatus && status === 2 ? <StudentHome/> : <Navigate replace to="/"/>}/>
          
          <Route path='/student/do-test' 
            element={loginStatus && status === 2 ? <StudentTest/> : <Navigate replace to="/"/>}/>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
