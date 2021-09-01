import React, { useContext } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Layout, Menu, Button } from 'antd'
import FirebaseContext from '../firebase/context'
import withAuthentication from '../../hooks/withAuthentication'

import Classes from './SiteLayout.module.scss'

const { Header, Content, Footer } = Layout;

const isDashboard = (path = '') => path.includes('dashboard')

function SiteLayout({ children, user }) {
  const { pathname } = useRouter()
  const isDashboardPage = isDashboard(pathname)

  const isAuthenticated = !!user;
  const firebase = useContext(FirebaseContext);

  const headerContent = (<Header >
    <nav className={Classes.navLinks}>
      <div className={Classes.logo}>Gushly</div>
      {!isAuthenticated && (
        <Link href="/signin">Sign In </Link>
      )
      }
      {
        isAuthenticated && (
          <Link href="/dashboard">Dashboard </Link>
        )
      }
      {
        isAuthenticated && (
          <Button type="default" onClick={firebase.doSignOut}>Logout</Button>
        )
      }



    </nav>
  </Header>)
  return (
    <Layout className={Classes.layout}>
      {isDashboardPage ? null : headerContent}
      <Content>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>Gushly App - Harmony©2021 </Footer>
    </Layout>
  );
}

const mapStateToProps = (state) => ({
  user: state.session.user
})

const LayoutContainer = connect(mapStateToProps)(SiteLayout)

export default withAuthentication(LayoutContainer);
