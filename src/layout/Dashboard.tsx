import React, { ReactNode, useEffect, useState } from 'react';

import { Button, Layout, Menu ,MenuProps} from 'antd';
import { NavLink, Navigate } from 'react-router-dom';
import { logout, useCurrentToken } from '../redux/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';

const { Header, Content, Footer, Sider } = Layout;
const items:MenuProps['items'] = [{
      key: 'Dashboard',
      label:<NavLink to={'/'}>Dashboard</NavLink> ,
    },
    // {
    //     key: 'User Management',
    //     label: 'User Management',

    //    children:[
    //     {
    //         key: 'Create Admin',
    //         label:<NavLink to={'/admin/create-admin'}>Create Admin</NavLink> ,
    //     },
    //     {
    //         key: 'Create Faculty',
    //         label:<NavLink to={'/admin/create-faculty'}>Create Faculty</NavLink> ,
    //     }
      
    //    ]
    //   },
    
      {
        key: 'project Management',
        label: 'Project Management',

       children:[
        {
            key: 'project-list',
            label:<NavLink to={'/projects/project-list'}>Project List</NavLink> ,
        },
        {
            key: 'add-project',
            label:<NavLink to={'/projects/add-project'}>Create Project</NavLink> ,
        },
       
      
       ]
      },
      {
        key: 'blogs Management',
        label: 'Blogs Management',

       children:[
        {
            key: 'blog-list',
            label:<NavLink to={'/blogs/blog-list'}>Blogs List</NavLink> ,
        },
       
        {
          key: 'create-blog',
          label:<NavLink to={'/blogs/create-blog'}>Create Blog</NavLink> ,
      },
       
      
       ]
      },
     
    ]
  
const MainLayout: React.FC<{children:ReactNode}> = ({children}) => {

 const dispatch=useDispatch();


 const[isMount,setIsMount]=useState(false);
useEffect(()=>{setIsMount(true)},[])
const token =useSelector(useCurrentToken);

if(isMount && !token){
  return <Navigate to="/auth/login" replace />
}
    
  return (
    <Layout style={{height:'100vh',}}>
    <Sider
    width={'18%'}
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div  style={{color:'white', textAlign:'center', height:'4rem' , display:'flex' , justifyContent:"center", alignItems:'center'}}>
        <h1>Portfolio Dashboard</h1>
        
        </div>
      <Menu theme="dark"
      
      mode="inline" defaultSelectedKeys={['4']} items={items} />

   
    </Sider>
    <Layout>
      <Header style={{ padding: 10 ,display:'flex',justifyContent:'flex-end', alignItems:'center'}} >
      <Button 
      onClick={()=> dispatch(logout())}
      >
        Logout
      </Button>
        </Header>
      <Content >
        <div
          style={{
            minHeight: 360,
            maxHeight:'40vh'
          }}
        >
      {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Ananda Gharami ©{new Date().getFullYear()} Created by Ananda
      </Footer>
    </Layout>
  </Layout>
  )
}

export default MainLayout