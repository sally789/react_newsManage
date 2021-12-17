import React, { useState, useEffect } from 'react'
import {
  Table, Tag, Button, Modal, Popover, Switch,
} from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'

const { confirm } = Modal
export default function RightList() {
  const [state, setstate] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/rights?_embed=children').then((response) => {
      setstate(response.data)
    })
  }, [])
  const deleteMsg = (item) => {
    // console.log(state,item)
    if (item.grade === 1) {
      setstate(state.filter((data) => data.id !== item.id))
    } else {
      const list = state.filter((data) => data.id === item.rightId)
      // console.log(list)
      list[0].children = list[0].children.filter((data) => data.id !== item.id)
      setstate([...state])
    }
  }
  const confirmMsg = (item) => {
    // console.log(item)
    confirm({
      title: '删除?',
      icon: <ExclamationCircleOutlined />,
      content: '你确认想删除吗',
      onOk() {
        deleteMsg(item)
        axios.delete(`http://localhost:8000/rights/${item.id}`)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  const switchClick = (item) => {
    item.pagepermission = item.pagepermission === 1 ? 0 : 1
    setstate([...state])
  }
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '权限名称',
      dataIndex: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      render: (key) => <Tag color="gold">{key}</Tag>,
    },
    {
      title: '操作',
      render: (item) => (
        <div>
          <Popover content={<div><Switch checked={item.pagepermission} onClick={() => switchClick(item)} /></div>} title="页面配置项" trigger="click">
            <Button type="primary" shape="circle" icon={<EditOutlined />} style={{ marginRight: '10px' }} />
          </Popover>
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMsg(item)} />
        </div>
      ),
    },
  ]
  return (
    <div>
      <Table columns={columns} dataSource={state} rowKey={(item) => item.id} />
    </div>
  )
}
