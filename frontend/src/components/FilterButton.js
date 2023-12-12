import React from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip } from 'antd';
import { useState } from 'react';
import { Badge } from 'antd';

export const FilterButton = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  let filterKey;

  if (props.name === 'Type / Color') {
    filterKey = 'type_and_color';
  }
  else if (props.name === 'Country / Region') {
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
    
    const menuProps = {
        items: props.items,
        onClick: handleMenuClick,
        multiple: true,
        selectable: true,
    };

    const numberSelected = selectedOptions.length;
     
    return (
        <Dropdown menu={menuProps} placement="bottom" trigger={['click', 'hover']}>
          <Badge count={numberSelected} size='small' color='lime'>
            <Button className="p-2 rounded-full h-10">
                {props.name}
                <DownOutlined/>
            </Button>
          </Badge>
        </Dropdown>
    )
}
