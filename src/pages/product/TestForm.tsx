/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, Typography } from 'antd';
import { useGetSingleProductQuery } from '../../redux/features/product/productApi';
import { useParams } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import moment from 'moment'; // Import moment library

const { Paragraph } = Typography;

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


const CustomizedForm: React.FC<CustomizedFormProps> = ({ onChange, fields }) => {


const onFinish = (values: any) => {
    console.log('Success:', values);
    // createProductFn(values)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


  return  <>
  <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Product</Breadcrumb.Item>
            <Breadcrumb.Item>Add Product</Breadcrumb.Item>
          </Breadcrumb>

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
      label="Product Name"
      name="name"
      validateDebounce={1000}
      rules={[{ max: 30 ,min:6 ,required: true}]}
    >
      <Input placeholder="Product Name" />
    </Form.Item>
        </div>
      </Col>
      <Col className="gutter-row" span={12}>
        <div >
        <Form.Item
      hasFeedback
      label="Product Price"
      name="price"
      validateDebounce={1000}
      rules={[{ required: true,type:'number'}]}
    >
      <InputNumber style={{width:'100%'}}  placeholder="Product Price" />
    </Form.Item>
        </div>
      </Col> 
      
      <Col className="gutter-row" span={12}>
        <div >
        <Form.Item
        
      hasFeedback
      label="Product quantity"
      name="quantity"
      validateDebounce={1000}
      rules={[{required: true,type:'number'}]}
    >
      <InputNumber style={{width:'100%'}} placeholder="Product Quantity" />
    </Form.Item>
        </div>
      </Col> 
      
      <Col className="gutter-row" span={12}>
        <div >
        <Form.Item
      hasFeedback
      label="Product color"
      name="color"
      validateDebounce={1000}
      rules={[{ max: 10 ,min:3 ,required: true}]}
    >
      <Input placeholder="Product color" />
    </Form.Item>
        </div>
      </Col> 
      <Col className="gutter-row" span={12}>
        <div >
        <Form.Item
      hasFeedback
      label="Product type"
      name="type"
      validateDebounce={1000}
      rules={[{ max: 30 ,min:4 ,required: true}]}
    >
      <Input placeholder="Product type" />
    </Form.Item>
        </div>
      </Col>


      <Col className="gutter-row" span={12}>
        <div >
        <Form.Item
      hasFeedback
      label="Product Size"
      name="size"
      
      validateDebounce={1000}
      rules={[{ max: 10 ,min:2 ,required: true}]}
    >
      <Input placeholder="Product Size" />
    </Form.Item>
        </div>
      </Col> 


      <Col className="gutter-row" span={12}>
        <div >
        <Form.Item
      hasFeedback
      label="Product Fragrance"
      name="fragrance"
      
      validateDebounce={1000}
      rules={[{ max: 30 ,min:5 ,required: true}]}
    >
      <Input placeholder="Product fragrance" />
    </Form.Item>
        </div>
      </Col> 
      
      <Col className="gutter-row" span={12}>

        <Form.Item hasFeedback  validateDebounce={1000} name="bloomDate" label="DatePicker" >
        <DatePicker  style={{width:'100%'}}  />
        </Form.Item>
       

      </Col> 
      <Col className="gutter-row" span={24}>

      <Form.Item hasFeedback label="Description" name="description" 
      validateDebounce={1000}
      rules={[{ max: 30}]}
      
      >
          <TextArea name='description'  rows={4} />
        </Form.Item>

      </Col> 
      
      <Form.Item   wrapperCol={{ xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6} }}>
      <Button style={{marginTop:7, marginBottom:16}} type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
     
    </Row>
   
  </Form>

  </Card>

  </>
}

const TestForm: React.FC = () => {


const {slug}=useParams()
const {data:productData,isLoading:productLoading}=useGetSingleProductQuery(slug, {skip:!slug});
  const [fields, setFields] = useState<FieldData[]>([]);
console.log('fields :>> ', fields);

useEffect(()=>{
    if(productData?.data?._id){
        
        
const setAllFields=Object.keys(productData?.data)?.map(fld=>( {name: [`${fld}`], value: fld==='bloomDate' ? moment(productData?.data?.[fld]) : productData?.data?.[fld], validating:false}))

setFields(setAllFields)
}

},[productData])
  return (
    <>
      <CustomizedForm
        fields={fields}
        onChange={(newFields) => {
          setFields(newFields);
        }}
      />
      
    </>
  );
};

export default TestForm;