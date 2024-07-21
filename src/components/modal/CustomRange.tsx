import React, { useState } from 'react';
import { Slider } from 'antd';
// import useDebounce from '../../hooks/useDebounce';


type TProps={

  productPrices: undefined| {minPrice:number,maxPrice:number},
  setproductPrices: React.Dispatch<React.SetStateAction<undefined| {minPrice:number,maxPrice:number}>>,
}

const CustomRange: React.FC <TProps>= ({productPrices,setproductPrices}) => {

    // const [searchText, setsearchText]=useState('')
    // const debounceText=useDebounce(searchText, 600)


return <Slider 
onChange={(event:number[])=>{
    if(event.length){

        setproductPrices({maxPrice:event[1], minPrice:event[0]})
    }
}}
style={{marginTop:'60px'}}   min={1}
max={2000}

value={[productPrices?.minPrice as number, productPrices?.maxPrice  as number]}
range={{ draggableTrack: true }}  tooltip={{ open: true }} />};

export default CustomRange ;