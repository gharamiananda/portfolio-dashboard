/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck


import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Breadcrumb, Button, Card, Col, DatePicker, Form, Input, InputNumber, Row } from 'antd';
import { useAddProductMutation, useGetSingleProductQuery, useUpdateProductMutation } from '../../redux/features/product/productApi';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment'; // Import moment library
import { toast } from 'sonner';
import JoditEditor from 'jodit-react';
import { useAddblogMutation, useGetSingleblogQuery, useUpdateblogMutation } from '../../redux/features/blog/blogApi';

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

const [createProductFn,{data:createData,isLoading: createLoading,isSuccess:createProductSuccess,error:createProductErr}]=useAddblogMutation();
const [updateProductFn,{data:updateData,isLoading: updateLoading,isSuccess:updateProductSuccess,error:updateProductErr}]=useUpdateblogMutation();


const[toastId, setToastId]=useState(null)

const navigate=useNavigate();


useEffect(() => {
  if (createProductSuccess && !createLoading) {
    const message = createData?.message || 'Success';
    toast.success(message,{id:toastId});
    navigate('/blogs/blog-list')

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
    navigate('/blogs/blog-list')
  } else if (updateProductErr) {
    
      if ('data' in updateProductErr) {
        const errorData = updateProductErr?.data?.message || 'Something went wrong!';
        toast.error(errorData,{id:toastId});
      } 
  }
}, [updateProductSuccess, updateLoading, updateProductErr, updateData]);


const onFinish = async(values: any) => {
  const id=toast.loading('Please Wait...');

  setToastId(id);


  const MEDIUM_INTEGRATION_TOKEN = '2df9c80d902609f5af443627396da8e2b6b7fe66c5b2d3bde9f0e688643e8dafe';
  const USER_ID = 'your_medium_user_id';

  try {
    const response = await axios.post(
      `https://api.medium.com/v1/users/${USER_ID}/posts`,
      {
        ...values,
        title:values.name,
        contentFormat: 'html', // or 'markdown'
        content,
        tags:"",
        canonicalUrl:",",
        publishStatus :"public"
      },
      {
        headers: {
          Authorization: `Bearer ${MEDIUM_INTEGRATION_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }


if(productSlug){

  await updateProductFn({...values,blogId:productId,description:content})
}else{

  await  createProductFn({...values,description:content});
}
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };



const {data:productData,isLoading:productLoading}=useGetSingleblogQuery(productSlug, {skip:!productSlug});

  const editor = useRef(null);
	const [content, setContent] = useState('');



useEffect(()=>{
  if(productData?.data?._id){
      
      

    setContent(productData?.data?.description)
}

},[productData]);

	const config = useMemo(
		() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder:  'Start typings...'
		}),
		[]
	);

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
      <Col className="gutter-row" span={24}>
        <div >
        <Form.Item
      hasFeedback
      label="Blog Name"
      name="name"
      validateDebounce={1000}
      rules={[{ max: 300 ,min:50 ,required: true}]}
    >
      <Input placeholder="Blog Name" />
    </Form.Item>
        </div>
      </Col>
     
      
   
      
      <Col className="gutter-row" span={24}>

      <JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={(newContent) => {}}
		/>

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

const AddBlog: React.FC = () => {


  const params = new URLSearchParams(window.location.search);

    // Access a specific parameter value
    const duplicate = params.get('duplicate');

console.log('searchParams.get() :>> ', duplicate);
const {slug}=useParams();

const productSlug=slug||duplicate

const {data:productData,isLoading:productLoading}=useGetSingleblogQuery(productSlug, {skip:!productSlug});
  const [fields, setFields] = useState<FieldData[]>([]);
console.log('fields :>> ', fields);

useEffect(()=>{
    if(productData?.data?._id){
        
        
const setAllFields=Object.keys(productData?.data)?.map(fld=>( {name: [`${fld}`], value: productData?.data?.[fld], validating:false}))

setFields(setAllFields)
}

},[productData]);



  return (
    <>
          <div  style={{padding:20}}>
    <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Blog</Breadcrumb.Item>
            <Breadcrumb.Item>{slug? 'Edit' : 'Add'} Blog</Breadcrumb.Item>
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

export default AddBlog;

