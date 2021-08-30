import React from 'react'
import { Form, Input, Button, Select, DatePicker } from 'antd'

const { Option } = Select;

export default function EngagementForm() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Balance"
        name="balance"
        rules={[{ required: true, message: 'Please input escrow balance' }]}
      >
        <Input type="number" />
      </Form.Item>

      <Form.Item
        label="Type"
        name="engagementType"
        rules={[{ required: true, message: 'Please select engagement type' }]}
      >
        <Select placeholder="Select contract type">
          <Option value="HOURLY">Hourly</Option>
          <Option value="FIXED_PRICE">Fixed Price</Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Fixed Price"
        name="fixedPrice"
        rules={[{ required: false, message: 'Please input Fixed Price' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label="Hourly Price"
        name="hourlyPrice"
        rules={[{ required: false, message: 'Please input Hourly Price' }]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}
