import React from 'react';
import { Button, Modal, Space } from 'antd';




const ConfirmModal: React.FC<{handleSubmit:()=>void,open:boolean,loading:boolean,setOpen:(ar:boolean)=>void}> = ({setOpen,handleSubmit, open,loading}) => {
  
  return (
    <>
      <Space>
        {/* <Button type="primary" onClick={()=>{
            setOpen(true)
            }}>
          Open Modal
        </Button> */}
       
      </Space>
      <Modal
        open={open}
        title="Title"
        // onOk={handleOk}
        onCancel={()=>{
            setOpen(false)

        }}
        footer={(_, {  CancelBtn }) => (
          <>
            {/* <Button onClick={handleOk}>Confirm</Button> */}
            <Button type="primary"  onClick={handleSubmit} loading={loading}>
            Confirm
        </Button>
            <CancelBtn />
            {/* <OkBtn /> */}
          </>
        )}
      >
        <p>Are you sure to delete ?</p>
      </Modal>
    </>
  );
};

export default ConfirmModal;