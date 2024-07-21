/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Table ,Input, Select, Skeleton} from 'antd';
import type { TableColumnsType } from 'antd';
import ConfirmModal from '../../components/modal/ConfirmModal';
import { useDeleteProductMutation, useGetProductsQuery } from '../../redux/features/product/productApi';

import { toast } from 'sonner';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import useDebounce from '../../hooks/useDebounce';
import CustomPagination from '../../components/modal/CustomPagination';
import { useGetblogsQuery } from '../../redux/features/blog/blogApi';

const { Search } = Input;

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}



const SkillList: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const[page, setPage]=useState(1);
  const[limit, setlimit]=useState(5);

  const [queryString,setQueryString]=useState<undefined|string>(undefined);
  const [isStockAvailabe,setisStockAvailabe]=useState<string>("In Stock");


  // const {data:productData,isLoading:productLoading, isFetching}=useGetProductsQuery(queryString,{skip:!queryString});
  const {data:productData,isLoading:productLoading, isFetching}=useGetblogsQuery(queryString);


console.log('productData', productData)
  const [searchText, setSearchText]=useState<string>('');
  const debounceText=useDebounce(searchText, 600)


const columns: TableColumnsType<DataType> = [
  {
    title: 'Project Name',
    dataIndex: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (item) =><>
    <div style={{display:'flex',gap:'10px'}}>

    <Link to={`/blogs/edit-blog/${item?.slug}`}>

   <EditOutlined />
    </Link>
    <Button onClick={()=>{
      setSelectedRowKeys(prev=>([...prev,item?.slug]));
      
      setOpen(true)
    }}>

  <DeleteOutlined />
    </Button>
  <Link to={`/blogs/add-blog?duplicate=${item?.slug}`}>Duplicate</Link>
        </div>
    </> 
  },
];
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const [productDeleteFn,{data:productDelete,isLoading}]=useDeleteProductMutation();





  const products=productData?.data?.Blogs?.result
  const productsMeta=productData?.data?.Blogs?.meta;
  console.log('productsMeta', productsMeta)
  
  console.log('products :>> ', products);
  const [open, setOpen] = useState(false);

  const handleSubmit = async()=>{
   const id = toast.loading('Please wait...');
try {

  await productDeleteFn(selectedRowKeys);
  toast.success('Product deleted successfully',{id:id});
  setOpen(false);
  setSelectedRowKeys([])
  
} catch (error) {
  
}
  };

  const [filterDates, setFilterDates]=useState<null|{fromDate:string, toDate:string}>(null)

  const [productTypes,setproductTypes]=useState<string[]>([]);
  const [productSizes,setproductSizes]=useState<string[]>([]);
  const [productFragnences,setproductFragnences]=useState<string[]>([]);
  const [productPrices,setproductPrices]=useState<undefined|{minPrice:number,maxPrice:number}>(undefined);



  useEffect(()=>{
    const queryObj:Record<string, string|number|boolean>={"productStock":isStockAvailabe}
    if(debounceText){
      queryObj.searchTerm=debounceText
    }
   
    if(productTypes.length){
      queryObj.types=JSON.stringify(productTypes)
    }
    if(productSizes.length){
      queryObj.sizes=JSON.stringify(productSizes)
    } if(productFragnences.length){
      queryObj.fragrances=JSON.stringify(productFragnences)
    }

    if(productPrices?.maxPrice){
      queryObj.maxPrice=productPrices?.maxPrice
    } if(productPrices?.minPrice){
      queryObj.minPrice=productPrices?.minPrice
    }

    if(page){
      queryObj.page=page
    } if(limit){
      queryObj.limit=limit
    }

    if(filterDates?.fromDate){
      queryObj.bloomFromDate=filterDates?.fromDate
    }
    if(filterDates?.toDate){
      queryObj.bloomToDate=filterDates?.toDate
    }

   
if(Object.keys(queryObj)){

  // setQueryString( utilsFunctions.objectToQueryString(queryObj))
}

    
  },[debounceText,productFragnences,productSizes,productTypes,productPrices,page,limit,isStockAvailabe,filterDates])
  // 'minPrice','maxPrice'



let content = <Skeleton />;
  if(!productLoading && !isFetching){
    content=<Table  pagination={false} rowSelection={rowSelection} columns={columns} dataSource={products?.map(pd=>({...pd,key:pd?.slug}))} />

      }
    

  return (
    <div  style={{marginRight:10}}>
      

    
      <div style={{ marginTop: 10 }}>
      <Card>
            <Row justify='space-between'>
       
            <Search value={searchText} onChange={e=>setSearchText(e.target.value)} placeholder="input search text" enterButton="Search" loading={isFetching} style={{maxWidth:'300px'}} />
              {/* <rDateFilter filterDates={filterDates} setFilterDates={setFilterDates}  setValue={setValue}  />

        <SalesOptions value={value} setValue={setValue} /> */}

            </Row>

        </Card>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
        {hasSelected  &&   <Button onClick={()=> setOpen(true)}>Delete ${selectedRowKeys.length} items </Button>}
      </div>
      <div className="" style={{overflowX:'scroll'}}>  
      {content}
      </div>

      {/* <TestTable /> */}
      <ConfirmModal loading={isLoading} setOpen={setOpen} open={open} handleSubmit={handleSubmit} />


  <Card>
            <Row justify='space-between'>
<CustomPagination  meta={productsMeta} setPage={setPage} />

<Select
        style={{ width: 120 }}
        value={limit}
        onChange={(event)=>{
          setlimit(event)
        }}
        options={[{ label: 5, value: 5 },{ label:10, value:10},{ label:15, value:15}]}
      />
      </Row>
      </Card>
    </div>
  );
};

export default SkillList