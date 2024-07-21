import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import Login from '../pages/auth/Login';
import Auth from '../pages/auth/Auth';
import Register from '../pages/auth/Register';
import { Spin } from 'antd';
import AddBlog from '../pages/blog/AddBlog';
import BlogList from '../pages/blog/BlogList';

// import DashboardLayout from '../layout/DashboardLayout';

export const DashboardLayout = lazy(() => import('../layout/Dashboard'));
export const IndexPage = lazy(() => import('../pages/dashboard/DashboardPage'));

export const UserPage = lazy(() => import('../pages/user/UserList'));
// export const LoginPage = lazy(() => import('../pages/login'));
export const ProductsPage = lazy(() => import('../pages/product/ProductList'));
export const ProductsAddPage = lazy(() => import('../pages/product/AddProduct'));
export const SalesListPage = lazy(() => import('../pages/sales/SalesList'));
export const SalesHistoryPagge = lazy(() => import('../pages/sales/SalesHistory'));





// export const Page404 = lazy(() => import('../pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        
        <DashboardLayout>
          
          <Suspense fallback={  <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage />  },
        { path: 'projects/project-list', element: <ProductsPage /> },
        { path: 'projects/add-project', element: <ProductsAddPage key='add' /> },
        { path: 'projects/edit-project/:slug', element: <ProductsAddPage key='edit' /> },

        { path: 'blogs/blog-list', element: <BlogList /> },
        { path: 'blogs/create-blog', element: <AddBlog key='add'  /> },
        { path: 'blogs/edit-blog/:slug', element: <AddBlog key='edit' /> },


        


        

        
      ],
    },
    {
      path: 'auth',
      element: <Auth />,

      children:[

        { element:<Navigate to="register" />, index: true },
        { element: <Login />, path:'login'},

        { path: 'register', element: <Register />  },
      ]


    },
    // {
    //   path: 'sales/sales-list',
    //   element: <SalesListPage />,

    //   // children:[

    //   //   { element:<Navigate to="sales-list" />, index: true },
    //   //   { element: <SalesListPage />, path:'sales-list'},

    //   //   // { path: 'register', element: <Register />  },
    //   // ]


    // },
    
      // {
      //   path: 'auth/register',
      //   element: <Auth />,
      // },
    
    // },
    // {
    //   path: '404',
    //   element: <Page404 />,
    // },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}