import React from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip } from 'antd';
import { useState } from 'react';
import { Badge, Avatar } from 'antd';

export const FilterButton = (props) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

    const handleMenuClick = (e) => {
        const selectedLabel = props.items[e.key].label;

        if (selectedOptions.includes(selectedLabel)) {
          // Remove the selected option if already selected
          setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.filter((option) => option !== selectedLabel)
          );
        } else {
          // Add the selected option if not selected
          setSelectedOptions((prevSelectedOptions) => [...prevSelectedOptions, selectedLabel]);
        }
        

        //fetch results with filters from solr !!! maybe not
        
        // props.setResults(results)
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
