import React from 'react';
import { Segmented } from 'antd';

const SalesOptions: React.FC<{value:string | number,setValue:React.Dispatch<React.SetStateAction<string | number>>}> = ({value, setValue}) => {

  return <div className="" style={{padding:'10px 0'}}>

    <Segmented options={['Weekly', 'Daily', 'Monthly','Yearly']} value={value} onChange={setValue} />

  </div>
};

export default SalesOptions;