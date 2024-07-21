import React, { ReactNode } from 'react';
import { Button, Modal, Space } from 'antd';




const CustomModal: React.FC<{open:boolean,loading:boolean,setOpen:(ar:boolean)=>void,children:ReactNode}> = ({setOpen, open,loading,children}) => {
  
  return (
    <>
      <Space>
       
      </Space>
      <Modal
        open={open}
        title="Title custom"
        // onOk={handleOk}
        onCancel={()=>{
            setOpen(false)

        }}
        footer={(_, {  CancelBtn }) => (
          <>
            {/* <Button onClick={handleOk}>Confirm</Button> */}
            {/* <Button type="primary"  onClick={handleSubmit} loading={loading}>
            Confirm moda
        </Button> */}
            {/* <CancelBtn /> */}
            {/* <OkBtn /> */}
          </>
        )}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomModal;