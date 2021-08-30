import React, { useState } from 'react'
import withAuthorization from '../hooks/withAuthorization'
import { Button } from 'antd'
import EngagementFormModal from '../components/EngagementFormModal/EngagementFormModal'

function DashboardPage() {
  const [showEngagementModal, setShowEngagementModal] = useState(false)
  const handleCancel = () => {
    setShowEngagementModal(false)
  }
  return (
    <div>
      <Button onClick={() => setShowEngagementModal(true)}> Create New Engagement</Button>
      <EngagementFormModal
        isVisible={showEngagementModal}
        handleCancel={handleCancel}
      />
    </div>
  )
}

export default withAuthorization(DashboardPage);