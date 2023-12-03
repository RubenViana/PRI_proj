import React from 'react'
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Dropdown, Space, Tooltip } from 'antd';
import { useState } from 'react';

export const FilterButton = (props) => {
    const [optionSelected, setOptionSelected] = useState("")

    const handleMenuClick = (e) => {
            setOptionSelected(props.items[e.key].label);
            const results = [{
                name: 'Courtney Henry',
                email: 'courtney.henry@example.com',
                role: 'Designer',
                imageUrl:
                  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                lastSeen: '3h ago',
                lastSeenDateTime: '2023-01-23T13:23Z',
              },
              {
                name: 'Tom Cook',
                email: 'tom.cook@example.com',
                role: 'Director of Product',
                imageUrl:
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                lastSeen: null,
              }]

            //fetch results with filters from solr
            
            props.setResults(results)
        };
    
    const menuProps = {
        items: props.items,
        onClick: handleMenuClick,
        multiple: true,
        selectable: true,
    };

    return (
        <Dropdown menu={menuProps} placement="bottom">
            <div className="hover:bg-green-100 p-2 rounded-full h-10 border border-green-900/20 text-sm cursor-pointer">
                {props.name}
                <DownOutlined className="ml-1"/>
            </div>
        </Dropdown>
    )
}
