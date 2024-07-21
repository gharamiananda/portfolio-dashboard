import React, { useEffect, useState } from 'react';
import { Button, Card, Row, Skeleton, Spin, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import ConfirmModal from '../../components/modal/ConfirmModal';
import { useDeleteProductMutation, useGetProductsQuery } from '../../redux/features/product/productApi';

import { toast } from 'sonner';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import CustomModal from '../../components/modal/CustomModal';
import Login from '../auth/Login';
import SalesForm from './SalesForm';
import { useAddSalesMutation, useGetSalesQuery } from '../../redux/features/sales/salesApi';
import SalesOptions from './SalesOptions';
import utilsFunctions from '../../utils/queryString';
import DateFilter from './DateFilter';
import moment from 'moment';


interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}



const SalesHistory: React.FC = () => {
  const[selectedProduct,setselectedProduct]=useState<null|Record<string,unknown>>(null)

  const [value, setValue] = useState<string | number>('Weekly');
const [filterDates, setFilterDates]=useState<null|{fromDate:string, toDate:string}>(null)


useEffect(()=>{
if(value){
  setFilterDates(null)
}
},[value])

console.log('filterDates', filterDates)

const columns: TableColumnsType<DataType> = [
  {
    title: 'Buyer Name',
    dataIndex: 'nameOfBuyer',
  },
  {
    title: 'Sold Quantity',
    dataIndex: 'soldQuantity',
  },
  {
    title: 'Collected Price',
    dataIndex: 'totalPrice',
  },
  
  {
    title: 'Sold Date',
    dataIndex: 'soldDate',
    
  },

 
];
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const[toastId, setToastId]=useState(null)

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

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

  useEffect(()=>{
    const queryObj:Record<string, string|number|boolean>={}
    if(value){
      queryObj.sales=value
    }
    else if(filterDates){
      queryObj.fromDate=filterDates.fromDate
      queryObj.toDate=filterDates.toDate


    }
    if(Object.keys(queryObj).length){

      setQueryString( utilsFunctions.objectToQueryString(queryObj))
    }
  },[filterDates,value])

  const {data:productData,isLoading:productLoading,isFetching}=useGetSalesQuery(queryString,{skip:!queryString});

  const products=productData?.data?.Sales?.result
  console.log('products :>> ', products);
  const [open, setOpen] = useState(false);

  const handleSubmit = async(values:Record<string, unknown>)=>{
   const id = toast.loading('Please wait...');
try {

  await salesAddFn({...values, product:selectedProduct?._id});
  toast.success('Sales add successfully',{id:id})
  
} catch (error) {
  console.log(error)
}
  }


 

let content = <Skeleton />;
if(!productLoading && !isFetching){
  content= <Table rowSelection={rowSelection} columns={columns} dataSource={products?.map(pd=>({...pd,key:pd?._id,soldDate:moment(pd?.soldDate).format('YYYY-MM-DD')}))} />
  

    }
  

  console.log('selectedRowKeys :>> ', selectedRowKeys);

  return (
    <div>
        <Card>
            <Row justify='space-between'>
              <DateFilter filterDates={filterDates} setFilterDates={setFilterDates}  setValue={setValue}  />

        <SalesOptions value={value} setValue={setValue} />
            </Row>

        </Card>

      <div style={{ marginBottom: 16 }}>
       
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <div className="" style={{overflowX:'scroll',padding:10}}>  
{content}
   </div>
      <CustomModal loading={isLoading} setOpen={setOpen} open={open}  >
        <SalesForm loading={isLoading} handleSubmit={handleSubmit}  selectedProduct={selectedProduct} setselectedProduct={setselectedProduct} />
        </CustomModal>

    </div>
  );
};

export default SalesHistory;