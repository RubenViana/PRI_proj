import React from 'react'
import { Slider } from 'antd';

export const FilterSlider = (props) => {
  return (
    <div className='w-36 h-10 -mt-1'>
            <Slider
              range
              max={props.max}
              defaultValue={props.defaultValues}
              tipFormatter={value => `${value}` + props.formater}
              marks={
                {
                  0: '0' + props.formater,
                  [props.max]: props.max + props.formater,
                }
              }
              // onChange={onChange}
              // onAfterChange={onAfterChange}
            />
          </div>
  )
}
