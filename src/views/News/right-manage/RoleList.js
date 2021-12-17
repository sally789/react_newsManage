import React, { useState, useEffect } from 'react'
import {
  Table, Button, Tree, Modal,
} from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import axios from 'axios'

export default function RoleList() {
  const [isModalVisible, setisModal] = useState(false)
  const [state, setstate] = useState([])
  const [rightList, setrightList] = useState([])
  const [currentRight, setcurrentRight] = useState([])
  const [currentId, setcurrentId] = useState(0)
  useEffect(() => {
    axios.get('http://localhost:8000/roles').then((response) => {
      setstate(response.data)
    })
    axios.get('http://localhost:8000/rights?_embed=children').then((response) => {
      setrightList(response.data)
    })
  }, [])

  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: '角色名称', dataIndex: 'roleName' },
    {
      title: '操作',
      render: (item) => (
        <div>
          <Button
            type="primary"
            shape="circle"
            icon={<EditOutlined />}
            style={{ marginRight: '10px' }}
            onClick={() => {
              setisModal(true)
              setcurrentRight(item.rights)
              setcurrentId(item.id)
            }}
          />
          <Button danger shape="circle" icon={<DeleteOutlined />} />
        </div>
      ),
    },
  ]
  const handleCancel = () => {
    setisModal(false)
  }
  const handleOk = () => {
    setisModal(false)
    setstate(state.map((item) => {
      if (item.id === currentId) {
        return {
          ...item,
          rights: currentRight,
        }
      }
      return item
    }))
    axios.patch(`http://localhost:8000/roles/${currentId}`, {
      rights: currentRight,
    })
  }
  const onCheck = (item) => {
    setcurrentRight(item.checked)
  }
  return (
    <div>
      <Table dataSource={state} columns={columns} />
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkedKeys={currentRight}
          treeData={rightList}
          checkStrictly
          onCheck={onCheck}
        />
      </Modal>
    </div>
  )
}
