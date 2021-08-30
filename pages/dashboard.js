import React from 'react'
import withAuthorization from '../hooks/withAuthorization'
import Dashboard from '../components/Dashboard/Dashboard'

function DashboardPage() {
  return (
    <Dashboard />
  )
}

export default withAuthorization(DashboardPage);