/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck


import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, Typography } from 'antd';
import { useAddProductMutation, useGetSingleProductQuery, useUpdateProductMutation } from '../../redux/features/product/productApi';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment'; // Import moment library
import { toast } from 'sonner';

interface FieldData {
  name: string | number | (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

const AddProduct: React.FC <{ isLoading: boolean ,handleSubmit:(values:Record<string, unknown>)=>void,selectedProduct:null|Record<string,unknown>,setselectedProduct: React.Dispatch<React.SetStateAction<Record<string,unknown> | null>>}>= ({selectedProduct,setselectedProduct,handleSubmit,isLoading}) => {

  const params = new URLSearchParams(window.location.search);

    // Access a specific parameter value
    const duplicate = params.get('duplicate');

console.log('searchParams.get() :>> ', duplicate);
const {slug}=useParams();


console.log('selectedProduct :>> ', selectedProduct);

const productSlug=slug||duplicate

const {data:productData}=useGetSingleProductQuery(productSlug, {skip:!productSlug});
  const [fields, setFields] = useState<FieldData[]>([]);
console.log('fields :>> ', fields);

useEffect(()=>{
    if(productData?.data?._id){
        
        
const setAllFields=Object.keys(productData?.data)?.map(fld=>( {name: [`${fld}`], value: fld==='bloomDate' ? moment(productData?.data?.[fld]) : productData?.data?.[fld], validating:false}))

setFields(setAllFields)
}

},[productData]);




const[toastId, setToastId]=useState(null)

const navigate=useNavigate();


// useEffect(() => {
//   if (createProductSuccess && !createLoading) {
//     const message = createData?.message || 'Success';
//     toast.success(message,{id:toastId});
//     navigate('/products/product-list')
//   } else if (createProductErr) {
    
//     if ('data' in createProductErr) {
//       const errorData = createProductErr?.data?.message || 'Something went wrong!';
//       toast.error(errorData,{id:toastId});
//     } 
//   }
// }, [createProductSuccess, createLoading, createProductErr, createData]);




const onFinish = async(values: any) => {
  

    handleSubmit(values);

  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };








  const validateQuantity = (rule: Rule, value: any, callback: (error?: string) => void) => {
    console.log('value', value)
  
   if (value < 1) {
      callback(`Quantity must be at least 1 unit`);
    } else if (value > selectedProduct?.quantity) {
      callback(` In store ${selectedProduct?.quantity} unit quantity product   available`);
    }  else {
      callback();
    }
  };

  return  <>
  

          <Card bordered={false} style={{ width: '100%' }}>
   
  <Form 
  fields={fields}
  onFieldsChange={(_, allFields) => {
    setFields(allFields);
  }}
  name="basic"
  // labelCol={{ span: 8 }}
  // wrapperCol={{ span: 16 }}
  initialValues={{ remember: true }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
  autoComplete="off"
   layout="vertical" 
    className='container'>
    {/* <Alert message="Use 'max' rule, continue type chars to see it" /> */}


    <Row gutter={{ xs: 8, sm: 6, md: 24, lg: 32 }} >
      <Col className="gutter-row" span={24}>
        <div >
        <Form.Item
      hasFeedback
      label="Buyer Name"
      name="nameOfBuyer"
      validateDebounce={500}
      rules={[{ max: 30 ,min:6 ,required: true}]}
    >
      <Input placeholder="Buyer Name" />
    </Form.Item>
        </div>
      </Col>
     
      
      <Col className="gutter-row" span={24}>
        <div >
        <Form.Item
        
      hasFeedback
      label="Product quantity to be sold"
      name="soldQuantity"
      validateDebounce={1000}
      rules={[{ required: true},{validator:validateQuantity}]}
    >
      <InputNumber style={{width:'100%'}} placeholder="Product Quantity" />
    </Form.Item>
        </div>
      </Col> 
      <Col className="gutter-row" span={24}>

<Form.Item hasFeedback  validateDebounce={1000} name="soldDate" label="Sold Date"

rules={[{ required: true}]}
>
<DatePicker 
style={{width:'100%'}}  />
</Form.Item>


</Col> 
      
     
      
      <Form.Item   wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6} }}>
      <Button disabled={selectedProduct?.quantity==0} loading={isLoading} style={{marginTop:7}} type="primary" htmlType="submit">
        Submit
      </Button>

     
     
    </Form.Item>
  
     
    </Row>

     
  { selectedProduct?.quantity==0 &&
    <Typography>
         Product quantity not available in stock!
    </Typography>
      }

    
   
  </Form>

  </Card>

  </>
};

export default AddProduct;