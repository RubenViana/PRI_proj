import React from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip } from 'antd';
import { useState } from 'react';
import { Badge } from 'antd';
import { useEffect } from 'react';

export const FilterButton = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  let filterKey;

  if (props.name === 'Type / Color') {
    filterKey = 'type_and_color';
  }
  else if (props.name === 'Country') {
    filterKey = 'region';
  }
  else if (props.name === 'Year') {
    filterKey = 'date';
  }
  else if (props.name === 'Reviewer') {
    filterKey = 'reviewer';
  }

  const handleMenuClick = (e) => {
    const selectedLabel = props.items[e.key].label;
    
    setSelectedOptions((prevSelectedOptions) => {
      if (prevSelectedOptions.includes(selectedLabel)) {
        // Remove the selected option if already selected
        return prevSelectedOptions.filter((option) => option !== selectedLabel);
      } else {
        // Add the selected option if not selected
        return [...prevSelectedOptions, selectedLabel];
      }
    });

    props.setFiltersList((prevFiltersList) => {
      if (prevFiltersList.some(option => option.filterKey === filterKey && option.selectedLabel === selectedLabel)) {
        // Remove the selected option if already selected
        return prevFiltersList.filter(option => !(option.filterKey === filterKey && option.selectedLabel === selectedLabel));
      } else {
        // Add the selected option if not selected
        return [...prevFiltersList, { filterKey, selectedLabel }];
      }
    });

  };

    const filterResults = (selectedOptions) => {
      // Implement your filtering logic here

      // For demonstration purposes, let's assume props.items is the source of data
      if (selectedOptions.length === 0) {
        props.setResults(props.data); // No filters applied, return original results
      }
      else {
        props.setResults(props.data.filter((item) => selectedOptions.includes(item[filterKey].split(" / ")[0])))
      }
    };
    
    const menuProps = {
        items: props.items,
        onClick: handleMenuClick,
        multiple: true,
        selectable: true,
    };

    const numberSelected = selectedOptions.length;
     
    return (
        <Dropdown menu={menuProps} placement="bottom">
          <Badge count={numberSelected} size='small' color='lime'>
            <div className="hover:bg-green-100 p-2 rounded-full h-10 border border-green-900/20 text-sm cursor-pointer">
                {props.name}
                <DownOutlined className="ml-1"/>
            </div>
          </Badge>
        </Dropdown>
    )
}
