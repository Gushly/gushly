import React, { useState } from 'react'
import { Button } from 'antd'
import EngagementFormModal from '../../components/EngagementFormModal/EngagementFormModal'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'

function DashboardHome() {
  const [showEngagementModal, setShowEngagementModal] = useState(false)
  const handleCancel = () => {
    setShowEngagementModal(false)
  }
  return (
    <DashboardLayout>
      <div style={{ marginTop: '100px' }}>
        <Button onClick={() => setShowEngagementModal(true)}> Create New Engagement</Button>
        <EngagementFormModal
          isVisible={showEngagementModal}
          handleCancel={handleCancel}
        />
      </div>
    </DashboardLayout>

  )
}


export default DashboardHome;