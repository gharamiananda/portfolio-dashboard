import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const CustomSearch: React.FC = () => (
  <>
    <Search placeholder="input search text" enterButton="Search" loading />
  </>
);

export default CustomSearch;