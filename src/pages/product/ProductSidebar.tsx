import React, { ReactNode } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Card, Divider, Layout, Menu, Row, Typography, theme } from 'antd';
import ToggleButton from '../../components/modal/ToggleButton';
import CustomCheckbox from '../../components/modal/CheckBox';
import CustomSearch from '../../components/modal/CustomSearch';
import CustomRange from '../../components/modal/CustomRange';
import { useGetFilterOptionsQuery } from '../../redux/features/product/productApi';

const {  Content, Sider } = Layout;

type TProps={
  productTypes:string[],
  setproductTypes:React.Dispatch<React.SetStateAction<string[]>>,
  productSizes:string[],
  setproductSizes:React.Dispatch<React.SetStateAction<string[]>>
  productFragnences:string[],
  setproductFragnences :   React.Dispatch<React.SetStateAction<string[]>>,
  productPrices: undefined| {minPrice:number,maxPrice:number},
  setproductPrices:React.Dispatch<React.SetStateAction<undefined| {minPrice:number,maxPrice:number}>>,
  setSearchText:React.Dispatch<React.SetStateAction<string>>,
  setisStockAvailabe: React.Dispatch<React.SetStateAction<string>>,
  children:ReactNode
}



const ProductSidebar: React.FC<TProps>= ({setisStockAvailabe,children,productFragnences,setproductFragnences,productSizes,setproductSizes,productTypes,setproductTypes,productPrices,setproductPrices,setSearchText}) => {
  const {data:filterOptions}=useGetFilterOptionsQuery(undefined);

  const filterOptionsrRes=filterOptions?.data?.Products?.[0]
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout  >
     
      <Layout style={{background:'red !important'}}>
        <Sider  style={{ background: colorBgContainer, padding:'10px  20px' }} className='sidebarCustomClass' >
          {/* <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            // items={items2}
          /> */}

<Button

onClick={()=>{
  setproductPrices(undefined);
  setproductFragnences([]);
  setproductSizes([]);
  setproductTypes([]);
  setSearchText('')
  setisStockAvailabe("In Stock")

}}
style={{margin:'10px 0px'}}>

Clear All
</Button>
          <Typography style={{marginBottom:'10px'}}>

          Types
          </Typography>
          <Divider />
          {
            filterOptionsrRes?.types?.map((type:string) =>(

              <CustomCheckbox 
              
              
              checkedOptions={productTypes}
              setcheckedOptions={setproductTypes}
              name={type} key={type}  />
            ))
          }

          <Typography style={{marginBottom:'10px'}}>

Sizes
</Typography>
<Divider />

{
            filterOptionsrRes?.sizes?.map((type:string) =>(

              <CustomCheckbox 
              
              
              checkedOptions={productSizes}
      setcheckedOptions={setproductSizes}
              name={type} key={type}  />
            ))
          }
 <Typography style={{marginBottom:'10px'}}>

Fragnence
</Typography>
<Divider />


{
            filterOptionsrRes?.fragrances?.map((type:string) =>(

              <CustomCheckbox 
              
              
              checkedOptions={productFragnences}
      setcheckedOptions={setproductFragnences}
              name={type} key={type} />
            ))
          }
          <Typography >

Price
</Typography>
<Divider />

<CustomRange   


productPrices={productPrices}
setproductPrices={setproductPrices}

/>


         
        </Sider>
        <Layout style={{ paddingLeft: '24px' }}>

        
         
          <Content
           
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ProductSidebar;