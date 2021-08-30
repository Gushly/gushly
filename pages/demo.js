import React from 'react'
import withAuthorization from '../hooks/withAuthorization'
import { connect } from 'react-redux'

function Demo({ user }) {
  return (
    <div>
      <h1>Welcome: {user.fullName}</h1>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.session.user
})

export default connect(mapStateToProps)(withAuthorization(Demo))