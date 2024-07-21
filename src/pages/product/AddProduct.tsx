/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck


import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Card, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
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

interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
  productId?: string;
}


//   name : string
// slug:string
// Price  : number
// quantity : number
// isDeleted : boolean
// color : string
// type :  string 
// Size : string
// fragrance : string
// bloomDate: date
// Description: string
// Image: string




const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields,productId }) => {

const {slug:productSlug}=useParams();

const [createProductFn,{data:createData,isLoading: createLoading,isSuccess:createProductSuccess,error:createProductErr}]=useAddProductMutation();
const [updateProductFn,{data:updateData,isLoading: updateLoading,isSuccess:updateProductSuccess,error:updateProductErr}]=useUpdateProductMutation();


const[toastId, setToastId]=useState(null)

const navigate=useNavigate();


useEffect(() => {
  if (createProductSuccess && !createLoading) {
    const message = createData?.message || 'Success';
    toast.success(message,{id:toastId});
    navigate('/projects/project-list')
  } else if (createProductErr) {
    
    if ('data' in createProductErr) {
      const errorData = createProductErr?.data?.message || 'Something went wrong!';
      toast.error(errorData,{id:toastId});
    } 
  }
}, [createProductSuccess, createLoading, createProductErr, createData]);





useEffect(() => {
  if (updateProductSuccess && !updateLoading) {
    const message = updateData?.message || 'Update Success';
    toast.success(message,{id:toastId});
    navigate('/projects/project-list')

  } else if (updateProductErr) {
    
      if ('data' in updateProductErr) {
        const errorData = updateProductErr?.data?.message || 'Something went wrong!';
        toast.error(errorData,{id:toastId});
      } 
  }
}, [updateProductSuccess, updateLoading, updateProductErr, updateData]);


const onFinish = async(values: any) => {
  const id=toast.loading('Please Wait...');

  setToastId(id)
if(productSlug){

  await updateProductFn({...values,productId})
}else{

  await  createProductFn(values);
}
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };



  return  <>
  

          <Card bordered={false} style={{ width: 600 }}>
   
  <Form 
  fields={fields}
  onFieldsChange={(_, allFields) => {
    onChange(allFields);
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
      <Col className="gutter-row" span={12}>
        <div >
        <Form.Item
      hasFeedback
      label="Project Name"
      name="name"
      validateDebounce={1000}
      rules={[{ required: true}]}
    >
      <Input placeholder="Project Name" />
    </Form.Item>
        </div>
      </Col>
     
      
   
      
      <Col className="gutter-row" span={12}>
        <div >
        <Form.Item
      hasFeedback
      label="Project Image Url"
      name="image"
      validateDebounce={1000}
      rules={[{ required: true}]}
    >
      <Input placeholder="Project Image Url" />
    </Form.Item>
        </div>
      </Col> 
    
      <Col className="gutter-row" span={24}>

      <Form.Item hasFeedback label="Description" name="description" 
      validateDebounce={1000}
      rules={[{required: true}]}
      
      >
          <TextArea name='description'  rows={4} />
        </Form.Item>

      </Col> 
      
      <Form.Item   wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6} }}>
      <Button loading={createLoading} style={{marginTop:7, marginBottom:16}} type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
     
    </Row>
   
  </Form>

  </Card>

  </>
}

const AddProduct: React.FC = () => {


  const params = new URLSearchParams(window.location.search);

    // Access a specific parameter value
    const duplicate = params.get('duplicate');

console.log('searchParams.get() :>> ', duplicate);
const {slug}=useParams();

const productSlug=slug||duplicate

const {data:productData,isLoading:productLoading}=useGetSingleProductQuery(productSlug, {skip:!productSlug});
  const [fields, setFields] = useState<FieldData[]>([]);
console.log('fields :>> ', fields);

useEffect(()=>{
    if(productData?.data?._id){
        
        
const setAllFields=Object.keys(productData?.data)?.map(fld=>( {name: [`${fld}`], value: fld==='bloomDate' ? moment(productData?.data?.[fld]) : productData?.data?.[fld], validating:false}))

setFields(setAllFields)
}

},[productData]);




  return (
    <>
          <div  style={{padding:20}}>
    <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Project</Breadcrumb.Item>
            <Breadcrumb.Item>{slug? 'Edit' : 'Add'} Project</Breadcrumb.Item>
          </Breadcrumb>

      <CustomizedForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields);
        }}
        productId={productData?.data?._id}
        />
      
        </div>
    </>
  );
};

export default AddProduct;