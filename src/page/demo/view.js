/**
 * Created by RCC on 2018/8/27.
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Table from '@src/component/table';
import { Radio, Row, Button, Divider, DatePicker, Input, Dropdown, Menu, Icon } from 'antd';

const VALUE = {
    '1': '测试中',
    '2': '已完成',
    '3': '所有报告'
};

class DemoTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showType: '5',
            selectValue: '3'
        }
    }
    handleShowTypeChange(e) {
        this.setState({
            showType: e.target.value
        });
    }
    handleFindChange() {
        console.log('table attr change ...');
    }
    getColumns() {
        return [
            {
                title: '报告号',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            },
            {
                title: '款号',
                dataIndex: 'moneyId',
                key: 'moneyId'
            },
            {
                title: 'vender',
                dataIndex: 'vender',
                key: 'vender'
            },
            {
                title: '图片',
                dataIndex: 'image',
                key: 'image'
            },
            {
                title: 'location',
                dataIndex: 'location',
                key: 'location'
            }
        ]
    }
    getPagination() {
        return { total: this.props.rows.length }
    }
    getRowSelection() {
        return {
            onChange: () => {
                console.log('选择发生变化');
            }
        }
    }
    handleMenuClick({ key }) {
        console.log('menu click ...');
        this.setState({
            selectValue: key
        })
    }
    render() {
        console.log(this.props);
        const { rows } = this.props;
        const menu = (
            <Menu onClick={this.handleMenuClick.bind(this)}>
                <Menu.Item key="1">测试中</Menu.Item>
                <Menu.Item key="2">已完成</Menu.Item>
                <Menu.Item key="3">所有报告</Menu.Item>
            </Menu>
        );
        return (
            <div className="view">
                <Radio.Group value={this.state.showType} onChange={this.handleShowTypeChange.bind(this)}>
                    <Radio.Button value="1">报告管理</Radio.Button>
                    <Radio.Button value="2">测试信息查询</Radio.Button>
                    <Radio.Button value="3">Local TRF下载</Radio.Button>
                    <Radio.Button value="4">专属客服</Radio.Button>
                    <Radio.Button value="5">帮助</Radio.Button>
                </Radio.Group>
                <Divider />
                <Row type="flex" justify="space-between" style={{marginBottom: 20}}>
                    <div>
                        <Button
                            type="primary"
                            icon="reload"
                            style={{marginRight: 8}}
                        />
                        <DatePicker.RangePicker showTime onChange={() => {}} />
                        <Dropdown overlay={menu}>
                            <Button style={{ marginLeft: 8 }}>{VALUE[this.state.selectValue]}<Icon type="down" /></Button>
                        </Dropdown>
                    </div>
                    <div>
                        <Input.Search
                            placeholder="输入关键字"
                            enterButton="查询"
                            onSearch={value => console.log(value)}
                        />
                    </div>
                </Row>
                <Table
                    rowKey="id"
                    dataSource={rows}
                    columns={this.getColumns()}
                    pagination={this.getPagination()}
                    rowSelection={this.getRowSelection()}
                    loading={false}
                    findMode="remote"
                    findChange={this.handleFindChange.bind(this)}
                />
            </div>
        )
    }

}

export default connect(({demoTest}) => ({...demoTest}))(DemoTest);
