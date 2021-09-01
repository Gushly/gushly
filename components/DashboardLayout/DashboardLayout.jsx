import { useState, useContext } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Menu, Avatar, Row, Col, Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons'
import withAuthorization from '../../hooks/withAuthorization';
import { selectUser } from '../../selectors/session'
import FirebaseContext from '../firebase/context';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;


import classes from './DashboardLayout.module.scss';

export function DashboardLayout({ children }) {
  const firebase = useContext(FirebaseContext);
  const user = useSelector(selectUser);
  const { email, fullName, avatarUrl } = user
  console.log(user)

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider className={classes.sider} >
        <div className="logo">Gushly</div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" className={classes.menuContainer}>
          <Menu.Item key="1">
            Home
          </Menu.Item>
          <Menu.Item key="2">
            Create Contract
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