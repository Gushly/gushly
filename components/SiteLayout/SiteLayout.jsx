import React, { useContext } from 'react'
import { connect } from 'react-redux'
import Link from 'next/link'
import { Layout, Menu, Button } from 'antd'
import FirebaseContext from '../firebase/context'
import withAuthentication from '../../hooks/withAuthentication'

import Classes from './SiteLayout.module.scss'

const { Header, Content, Footer } = Layout;

function SiteLayout({ children, user }) {
  const isAuthenticated = !!user;
  const firebase = useContext(FirebaseContext);
  return (
    <Layout className={Classes.layout}>
      <Header >
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
      </Header>
      <Content style={{ minHeight: '90vh', marginTop: '100px' }}>
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
