import { Col, Row } from 'antd';
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import gifImg from '../../assets/7927fd727c15b845e9ff34ccf125b039.gif'

const Auth = () => {
const navigate=useNavigate();

const {pathname}=useLocation();



    
  return (

     <Row align='middle' style={{height:'100vh'}}  >
    <Col span={12} offset={6}  >
    <div className={`${pathname.includes('login')  ? 'login_container' :"login_container active"}`} id="login_container">
      <Outlet />
        <div className="toggle-login_container">
            <div className=""  style={{zIndex:-5,position:'absolute', top:0, left:0, width:'100%', height:'100%'}} >

        <img src={gifImg} alt="Computer man" style={{objectFit:'fill', width:'100%', height:'100%', opacity:1}}/>
            </div>

            <div className="toggle" style={{zIndex:56,position:'relative'}}> 
                <div className="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button className="hidden" id="login"
                    onClick={()=>navigate('/auth/login')}
                    
                    
                    >Sign In</button>
                </div>
                <div className="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button
                    disabled
                    className="hidden" id="register" 
                    onClick={()=>navigate('/auth/register')}
                    >Sign Up</button>
                </div>
            </div>
        </div>
    </div>
    </Col>
  </Row>
    
    
    
  )
}

export default Auth