import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card } from 'antd'
import DashboardLayout from '../DashboardLayout/DashboardLayout'
import { selectUser } from '../../selectors/session'

function ContractorDashboard() {
  const user = useSelector(selectUser)
  console.log(user)
  return (
    <DashboardLayout>
      <div style={{ background: '#ECECEC', padding: '30px' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Balance USD
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </DashboardLayout>

  )
}


export default ContractorDashboard;