import React, { useState, useEffect, forwardRef } from 'react'
import axios from 'axios'
import {
  Form, Input, Select,
} from 'antd'

const { Option } = Select

const UserForm = forwardRef((_props, ref) => {
  const [regiondisable, setdisable] = useState(false)
  const [roleList, setroleList] = useState([])
  const [regionList, setregionList] = useState([])
  useEffect(() => {
    axios.get('http://localhost:8000/regions').then((response) => {
      setregionList(response.data)
    })
  }, [])
  useEffect(() => {
    axios.get('http://localhost:8000/roles').then((response) => {
      setroleList(response.data)
    })
  }, [])
  const isSuperManage = (value) => {
    if (value === 1) {
      setdisable(true)
      ref.current.setFieldsValue({
        region: '',
      })
    } else {
      setdisable(false)
    }
  }
  return (
    <Form
      ref={ref}
      layout="vertical"
      name="form_in_modal"
      initialValues={{ modifier: 'public' }}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="密码"
        rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="roleId"
        label="角色"
        rules={[{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Select
          onChange={(value) => isSuperManage(value)}
        >
          {roleList.map((roleItem) => (
            <Option value={roleItem.id} key={roleItem.id}>{roleItem.roleName}</Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name="region"
        label="区域"
        rules={regiondisable ? [] : [{ required: true, message: 'Please input the title of collection!' }]}
      >
        <Select disabled={regiondisable}>
          {regionList.map((regionItem) => (
            <Option value={regionItem.value} key={regionItem.id}>{regionItem.title}</Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  )
})
export default UserForm
