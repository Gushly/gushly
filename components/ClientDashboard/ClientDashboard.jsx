import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, Table } from 'antd'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import { selectEngagements, selectUser } from '../../selectors/session'


const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Fixed Price',
    dataIndex: 'fixedPrice',
    key: 'fixedPrice'
  }
]
function ClientDashboard() {
  const user = useSelector(selectUser)
  const engagements = useSelector(selectEngagements)
  console.log(engagements)
  return (
    <DashboardLayout>
      <div style={{ background: '#ECECEC', padding: '30px', height: '100%' }}>
        <Row gutter={16}>
          <Col span={9}>
            <Card title="Balance USD" bordered={false}>
              $6000
            </Card>
          </Col>
          <Col span={14} offset={1}>
            <Card title="Engagements" bordered={false}>
              {engagements.length && <Table dataSource={engagements} columns={columns}></Table>}
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Card title="Transaction History" bordered={false}>
              No Transaction History
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>

  )
}


export default ClientDashboard;