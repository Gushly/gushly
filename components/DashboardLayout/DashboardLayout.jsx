import { useState, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Layout, Menu, Avatar, Row, Col, Button } from 'antd';
import Link from 'next/link'
import { LogoutOutlined } from '@ant-design/icons'
import withAuthorization from '../../hooks/withAuthorization';
import { selectUser } from '../../selectors/session'
import FirebaseContext from '../firebase/context';
import { FETCH_ENGAGEMENTS } from '../../constants/actionTypes'

const { Sider, Content } = Layout;
const { SubMenu } = Menu;


import classes from './DashboardLayout.module.scss';

export function DashboardLayout({ children }) {
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch({ type: FETCH_ENGAGEMENTS })
  }, [])

  const firebase = useContext(FirebaseContext);
  const router = useRouter();
  const user = useSelector(selectUser);

  // TODO: Check withAuthorization hook issue
  if (!user) {
    router.push('/signin');
  }
  const { email, fullName, avatarUrl } = user
  console.log(user)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className={classes.sider} >
        <div className="logo">Gushly</div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className={classes.menuContainer}>
          <Menu.Item key="1">
            <Link href="/dashboard">Home</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link href="/dashboard/create">Create Engagement</Link>
          </Menu.Item>
        </Menu>
        <div>
          <Row className={classes.profile} justify="space-between">
            <Col span={4} offset={1}>
              <Avatar src={avatarUrl} />
            </Col>
            <Col span={10}>
              <div className={classes.label}>{fullName}</div>
              <div className={classes.smallText}>{email}</div>
            </Col>
            <Col pull={1}>
              <Button icon={<LogoutOutlined />} onClick={firebase.doSignOut} />
            </Col>
          </Row>

        </div>

      </Sider>
      <Content className={classes.contentContainer}>
        {children}
      </Content>

    </Layout>
  )
}

export default withAuthorization(DashboardLayout);