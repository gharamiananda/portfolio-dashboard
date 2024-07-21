import React from 'react';
import { Switch, Space } from 'antd';

const ToggleButton: React.FC<{setisStockAvailabe: React.Dispatch<React.SetStateAction<string>>,isStockAvailabe:string}> = ({isStockAvailabe,setisStockAvailabe}) => (
  <Space direction="vertical" style={{margin:'10px 0'}}>
    <Switch checkedChildren="In Stock"
    onChange={event=>{
      setisStockAvailabe(event?"In Stock":"Out Of Stock")
    }}
    unCheckedChildren="Out Stock" checked={isStockAvailabe==="In Stock"} />
  </Space>
);

export default ToggleButton;