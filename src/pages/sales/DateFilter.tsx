/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


import React from 'react';
import { DatePicker, Space } from 'antd';
import type { GetProps } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import moment from 'moment';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

dayjs.extend(customParseFormat);

const { RangePicker } = DatePicker;


// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps['disabledDate'] = (current) => {
  // Can not select days before today and today
  return  current > dayjs().endOf('day');
};


const DateFilter: React.FC <{setValue?:React.Dispatch<React.SetStateAction<string | number>>,filterDates:null|{fromDate:string, toDate:string}, setFilterDates:React.Dispatch<React.SetStateAction<{
    fromDate: string;
    toDate: string;
} | null>>}>= ({setFilterDates,filterDates,setValue}) => (
  <Space direction="vertical" size={12}>
    <RangePicker 

    
    value={[
        filterDates?.fromDate && moment(filterDates.fromDate),
        filterDates?.toDate && moment(filterDates.toDate),
      ]}
    onChange={event=>{
        if(event?.length){
          if(setValue){

            setValue('')
          }

            setFilterDates({fromDate:moment(event?.[0]?.$d ).format('YYYY-MM-DD'), toDate:moment(event[1]?.$).format('YYYY-MM-DD')})
        }

        console.log('event',event[0])
    }} disabledDate={disabledDate} />
   
  </Space>
);

export default DateFilter;