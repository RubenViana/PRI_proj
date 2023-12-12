import React from 'react'
import { Slider } from 'antd';
import { useEffect, useState } from 'react';

export const FilterSlider = (props) => {
  let filterKey;
  if (props.name === 'Score') {
    filterKey = 'score';
  }
  else if (props.name === 'Price') {
    filterKey = 'price';
  }

  const [values, setValues] = useState([props.defaultValues[0], props.defaultValues[1]]);

  useEffect(() => {
    props.setFiltersList((prevFiltersList) => {
      return [...prevFiltersList.filter(option => option.filterKey !== filterKey), { filterKey, values }];
  });
    
  }, [values]);

  const handleSliderChange = (val) => {
    setValues(val);
  };

  const filterResults = (values) => {
    // Assuming each result has a property named 'value' to compare against the slider values
    props.setResults(props.data.filter(result => {
      const resultValue = result[filterKey]; // Adjust this based on your data structure
      return resultValue >= values[0] && resultValue <= values[1];
    }));
  };

  return (
    <div className='w-52 h-10 -mt-1'>
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
              onAfterChange={handleSliderChange}
              // onAfterChange={onAfterChange}
            />
          </div>
  )
}
