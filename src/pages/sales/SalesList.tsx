import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Select, Skeleton, Spin, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import {  useGetProductsQuery } from '../../redux/features/product/productApi';

import { toast } from 'sonner';
import CustomModal from '../../components/modal/CustomModal';
import SalesForm from './SalesForm';
import { useAddSalesMutation } from '../../redux/features/sales/salesApi';
import CustomPagination from '../../components/modal/CustomPagination';
import utilsFunctions from '../../utils/queryString';
import Search from 'antd/es/input/Search';
import useDebounce from '../../hooks/useDebounce';


interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}



const SalesList: React.FC = () => {
  const[selectedProduct,setselectedProduct]=useState<null|Record<string,unknown>>(null)




const columns: TableColumnsType<DataType> = [
  {
    title: 'Product Name',
    dataIndex: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
  },
  {
    title: 'Size',
    dataIndex: 'size',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
  {
    title: 'Fragrance',
    dataIndex: 'fragrance',
  },
  {
    title: 'Bloom Date',
    dataIndex: 'bloomDate',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: (item) =><>
    <Button onClick={()=>{
      setselectedProduct(item)
      setOpen(true)}}>
      Edit
    </Button>
    </> 
  },
];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const[toastId, setToastId]=useState(null)
  const [searchText, setSearchText]=useState<string>('');
  const debounceText=useDebounce(searchText, 600)


  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const [salesAddFn,{data:productDelete,isLoading}]=useAddSalesMutation();

  const [queryString,setQueryString]=useState<undefined|string>(undefined);

  const {data:productData,isLoading:productLoading,isFetching}=useGetProductsQuery(queryString,{skip:!queryString});

  const products=productData?.data?.Products?.result
  console.log('products :>> ', products);
  const [open, setOpen] = useState(false);

  const[page, setPage]=useState(1);
  const[limit, setlimit]=useState(5);

  const productsMeta=productData?.data?.Products?.meta;


  const handleSubmit = async(values:Record<string, unknown>)=>{
   const id = toast.loading('Please wait...');
try {

  await salesAddFn({...values, product:selectedProduct?._id});
  toast.success('Sales add successfully',{id:id})
  setOpen(false)
  
} catch (error) {
  console.log(error)
}
  }



  useEffect(()=>{
    const queryObj:Record<string, string|number|boolean>={page,limit}
    if(debounceText){
      queryObj.searchTerm=debounceText
    }

  

   
if(Object.keys(queryObj)){

  setQueryString( utilsFunctions.objectToQueryString(queryObj))
}

    
  },[debounceText,page,limit])
  // 'minPrice','maxPrice'

  
let content = <Skeleton />;
if(!productLoading && !isFetching){
  content=  <Table pagination={false} rowSelection={rowSelection} columns={columns} dataSource={products?.map(pd=>({...pd,key:pd?.slug}))} />
  
  

    }
  console.log('selectedRowKeys :>> ', selectedRowKeys);

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
      <Card>
            <Row justify='space-between'>
         

            <Search value={searchText} onChange={e=>setSearchText(e.target.value)} placeholder="input search text" enterButton="Search" loading={isFetching} style={{maxWidth:'300px'}} />
              {/* <DateFilter filterDates={filterDates} setFilterDates={setFilterDates}  setValue={setValue}  />

        <SalesOptions value={value} setValue={setValue} /> */}
            </Row>

        </Card>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <div className="" style={{overflowX:'scroll',padding:10}}>  
      {content}

</div>

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
      <CustomModal loading={isLoading} setOpen={setOpen} open={open} >
        <SalesForm handleSubmit={handleSubmit}  key={Date.now()} isLoading={isLoading}  selectedProduct={selectedProduct} setselectedProduct={setselectedProduct} />
        </CustomModal>
    </div>
  );
};

export default SalesList;