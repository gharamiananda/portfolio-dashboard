import React, { useState } from 'react';
import {  Checkbox } from 'antd';
import type { CheckboxProps } from 'antd';


type TProps={
  checkedOptions:string[],
  setcheckedOptions : React.Dispatch<React.SetStateAction<string[]>>,
  name:string
}


const CustomCheckBox: React.FC <TProps>= ({name,setcheckedOptions,checkedOptions}) => {
  // const [checked, setChecked] = useState(true);


  const onChange: CheckboxProps['onChange'] = (e) => {
    
    setcheckedOptions(e.target.checked ? [...checkedOptions,e.target.name as string] : checkedOptions.filter(it=>it!==e.target.name));
  };

 

  return (
    <>
      <p style={{ marginBottom: '20px' }}>
        <Checkbox checked={checkedOptions.includes(name)}  name={name} onChange={onChange}>
          {name}
        </Checkbox>
      </p>
    </>
  );
};

export default CustomCheckBox;