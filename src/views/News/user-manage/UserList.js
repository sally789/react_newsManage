import React, { useState, useEffect, useRef } from 'react'
import {
  Table, Button, Modal, Switch,
} from 'antd'
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import UserForm from '../../../components/user-mange/UserForm'

const { confirm } = Modal
export default function RightList() {
  const [tableData, settableData] = useState([])
  const [isAddVisible, setisAddVisible] = useState(false)
  const formRef = useRef()
  useEffect(() => {
    axios.get('http://localhost:8000/users?_expand=role').then((response) => {
      settableData(response.data)
    })
  }, [])
  const deleteMsg = (item) => {
    // console.log(state,item)
    settableData(tableData.filter((data) => data.id !== item.id))
    axios.delete(`http://localhost:8000/users/${item.id}`)
  }
  const confirmMsg = (item) => {
    // console.log(item)
    confirm({
      title: '删除?',
      icon: <ExclamationCircleOutlined />,
      content: '你确认想删除吗',
      onOk() {
        deleteMsg(item)
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }
  const addFormOk = () => {
    formRef.current.validateFields().then((values) => {
      setisAddVisible(false)
      formRef.current.resetFieldValue()
      axios.post('http://localhost:8000/users', {
        ...values,
        roleState: true,
        default: false,
      }).then((response) => {
        console.log(response)
        settableData([...tableData, response.data])
      })
    }).catch((err) => {
      console.error(err)
    })
  }
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => <b>{region === '' ? '全球' : region}</b>,
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => <b>{role.roleName}</b>,
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState, item) => <Switch checked={roleState} disabled={item.default} />,
    },
    {
      title: '操作',
      render: (item) => (
        <div>
          <Button type="primary" shape="circle" icon={<EditOutlined />} style={{ marginRight: '10px' }} disabled={item.default} />
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => { confirmMsg(item) }} disabled={item.default} />
        </div>
      ),
    },
  ]
  return (
    <div>
      <Button type="primary" onClick={() => setisAddVisible(true)}>添加用户</Button>
      <Table
        columns={columns}
        dataSource={tableData}
        rowKey={(item) => item.id}
        pagination={{
          pageSize: 5,
        }}
      />
      <Modal
        visible={isAddVisible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={() => { setisAddVisible(false) }}
        onOk={addFormOk}
      >
        <UserForm ref={formRef} />
      </Modal>
    </div>
  )
}
