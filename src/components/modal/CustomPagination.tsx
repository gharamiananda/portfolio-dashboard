import React from 'react';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';

const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
  if (type === 'prev') {
    return <a>Previous</a>;
  }
  if (type === 'next') {
    return <a>Next</a>;
  }
  return originalElement;
};

const CustomPagination: React.FC <{meta:Record<string,number>,

setPage:React.Dispatch<React.SetStateAction<number>>
}>= ({meta,setPage}) => <Pagination
onChange={event=>{
  setPage(event)
}}
total={meta?.totalPage*10} itemRender={itemRender} />;

export default CustomPagination;