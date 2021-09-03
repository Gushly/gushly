import React from 'react'
import { Modal } from 'antd'
import EngagementForm from '../EngagementForm/EngagementForm'

export default function EngagementFormModal({ isVisible, handleCancel }) {
  return (
    <Modal title="Create New Engagement" visible={isVisible} onCancel={handleCancel} onOk={() => { }}>
      <EngagementForm />
    </Modal>
  )
}
