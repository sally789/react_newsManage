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
  const [roleList, setroleList] = useState(false)
  const [regionList, setregionList] = useState([])
  const [UpdateVisible, setUpdateVisible] = useState(false)
  const [current, setcurrent] = useState(null)
  const formRef = useRef()
  const updateformRef = useRef()
  const { roleId, username, region } = JSON.parse(localStorage.getItem('token'))

  useEffect(() => {
    axios.get('http://localhost:8000/users?_expand=role').then((response) => {
      settableData(roleId === 1 ? response.data : [
        ...response.data.filter((r) => r.username === username),
        ...response.data.filter((r) => r.region === region && r.roleId === 3),
      ])
    })
  }, [])
  useEffect(() => {
    axios.get('http://localhost:8000/roles').then((response) => {
      setroleList(response.data)
    })
  }, [])
  useEffect(() => {
    axios.get('http://localhost:8000/regions ').then((response) => {
      setregionList(response.data)
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
        // console.log('Cancel')
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
        // console.log(response)
        settableData([...tableData, {
          ...response.data,
          role: roleList.filter((data) => data.id === values.roleId)[0],
        }])
      })
    })
  }
  const updateForm = () => {
    updateformRef.current.validateFields().then((values) => {
      // console.log(values)
      setUpdateVisible(false)
      settableData(tableData.map((item) => {
        if (item.id === current.id) {
          return {
            ...item,
            ...values,
            role: roleList.filter((data) => data.id === values.roleId)[0],
          }
        }
        return item
      }))
      axios.patch(`http://localhost:8000/users/${current.id}`, values)
    })
  }
  const handleUpdate = (item) => {
    // console.log(item)
    setTimeout(() => {
      setUpdateVisible(true)
      updateformRef.current.setFieldsValue(item)
    }, 0)
    setcurrent(item)
  }
  const handleroleState = (item) => {
    item.roleState = !item.roleState
    settableData([...tableData])
    axios.patch(`http://localhost:8000/users/${item.id}`, {
      roleState: item.roleState,
    })
  }
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => <b>{region === '' ? '全球' : region}</b>,
      filters: [
        ...regionList.map((region) => ({
          text: region.title,
          value: region.value,
        })),
        {
          text: '全球',
          value: '全球',
        },
      ],
      onFilter: (value, item) => {
        if (value === '全球') {
          return item.region === ''
        }
        return item.region === value
      },
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
      render: (roleState, item) => (
        <Switch
          checked={roleState}
          disabled={item.default}
          onChange={() => handleroleState(item)}
        />
      ),
    },
    {
      title: '操作',
      render: (item) => (
        <div>
          <Button onClick={() => handleUpdate(item)} type="primary" shape="circle" icon={<EditOutlined />} style={{ marginRight: '10px' }} disabled={item.default} />
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
      <Modal
        visible={UpdateVisible}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={() => { setUpdateVisible(false) }}
        onOk={updateForm}
      >
        <UserForm ref={updateformRef} />
      </Modal>
    </div>
  )
}
