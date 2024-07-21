/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck

import {  Col, Form, Input, Row } from "antd"
import { Rule } from 'antd/lib/form';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import { setUser } from "../../redux/features/auth/authSlice";
import {  toast } from 'sonner';


const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

const validateEmail = (rule: Rule, value: any, callback: (error?: string) => void) => {
    if (!value) {
      callback("Email is required");
    } else if (!emailRegex.test(value)) {
      callback("Invalid email format");
    } else {
      callback();
    }
  };


  const validatePassword = (rule: Rule, value: any, callback: (error?: string) => void) => {
    // Strong password criteria
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
  
    if (!value) {
      callback("Password is required");
    } else if (value.length < minLength) {
      callback(`Password must be at least ${minLength} characters`);
    } else if (!specialCharRegex.test(value)) {
      callback("Password must contain at least one special character");
    } else if (!uppercaseRegex.test(value)) {
      callback("Password must contain at least one uppercase letter");
    } else if (!lowercaseRegex.test(value)) {
      callback("Password must contain at least one lowercase letter");
    } else {
      callback();
    }
  };
const Login = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const[toastId, setToastId]=useState<string|number>('')

    const[loginFn, {data,isError,error,isSuccess,isLoading}]=useLoginMutation();
const onFinish =async (values: any) => {
  try {

    const id= toast.loading('Please Wait.....');
    setToastId(id)


    
   const res=await loginFn(values);


  } catch (error:any) {

      console.log('error :>> ', error);
    }
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
// toast.success('failed to');

  };
  


  useEffect(()=>{
    if(isSuccess && data?.data?.token){
dispatch(setUser({user:data?.data?.user,token:data?.data?.token}));
toast.success('User login successful',{id:toastId});

navigate('/')
    } else if(isError){

      if ('data' in error) {
        const errorData = error?.data?.message || 'Something went wrong!';
        toast.error(errorData,{id:toastId});
      } 

    }

  },[data,isError,error,isSuccess,isLoading])


  return (
      <div className="form-login_container sign-in">
  

  <Form 
  
  name="basic"
  // labelCol={{ span: 8 }}
  // wrapperCol={{ span: 16 }}
  initialValues={{ remember: true }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
  autoComplete="off"
   layout="vertical" 
    className='container'>
                <h1>Sign In</h1>
                <div className="social-icons">
                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-facebook-f"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-github"></i></a>
                    <a href="#" className="icon"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
                <span>or use your email password</span>

                
                {/* <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" /> */}
               

    {/* <Alert message="Use 'max' rule, continue type chars to see it" /> */}


    <Row gutter={{ xs: 8, sm: 6, md: 24, lg: 32 }}  style={{width:"100%"}}>
      <Col className="gutter-row" span={32} style={{width:"100%"}}>
        <div >
        <Form.Item
      hasFeedback
      name="email"
      validateDebounce={1000}
      rules={[
    
        { validator: validateEmail },
    ]}
    >
      <Input
      style={{paddingTop:'0px' , paddingBottom:'0px',width:"100%"}}
      
      placeholder="Email" />
    </Form.Item>
        </div>
      </Col>
   
      <Col className="gutter-row"  style={{width:"100%"}}>
        <div >
        <Form.Item
      hasFeedback
      name="password"
      validateDebounce={1000}
      rules={[{
        validator:   validatePassword
      }]}
    >
      <Input
      style={{paddingTop:'0px' , paddingBottom:'0px',width:"100%"}}
      
      placeholder="Password" />
    </Form.Item>
        </div>
      </Col>
      <Col className="gutter-row"  style={{width:"100%"}}>

     
      {/* <a href="#" style={{textAlign:'center'}}>Forget Your Password?</a> */}
      </Col>


      
      
     
     
    </Row>
    <Row>

    <button   type="submit">
        Submit
      </button>
    </Row>
   
  </Form>


        </div>
  )
}

export default Login