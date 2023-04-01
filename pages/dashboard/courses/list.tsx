import React, { useState } from 'react';
import { Divider, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Sidebar from '../../../components/Sidebar/Sidebar';
import { Layout } from 'antd';


import {
    UploadOutlined
} from '@ant-design/icons';


interface DataType {
    key: React.Key;
    title: string;
    level: number;
    begindate: string;
    enddate?: string;
    creator?: string;

}

const columns: ColumnsType<DataType> = [
    {
        title: 'Title',
        dataIndex: 'title',
        render: (text: string) => <a>{text}</a>,
    },
    {
        title: 'Level',
        dataIndex: 'level',
    },
    {
        title: 'Begin Date',
        dataIndex: 'begindate',
    },
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
    },
    {
        key: '4',
        name: 'Disabled User',
        age: 99,
        address: 'Sydney No. 1 Lake Park',
    },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};

const List: React.FC = () => {
    const [selectionType, setSelectionType] = useState('checkbox');

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sidebar />
            <Layout>
                <div className='mt-6'>
                    <h1 className='text-extrabold text-3xl my-3 mx-6'>Courses Course</h1>
                    <Divider />

                    <Table
                        rowSelection={{
                            type: selectionType,
                            ...rowSelection,
                        }}
                        columns={columns}
                    />
                </div>
            </Layout>
        </Layout>

    );
};

export default List;
