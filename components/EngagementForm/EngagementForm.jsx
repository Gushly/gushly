import { useState, useContext } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { Form, Input, Button, Select, DatePicker, Tooltip } from 'antd'
import { ENGAGEMENT_TYPES, DEFAULT_CURRENCY, HELP_MESSAGES, ENGAGEMENT_STATUSES, DEFAULT_CONTRACT_NAME } from '../../constants'
import { QuestionCircleOutlined } from '@ant-design/icons'
import classes from './EngagementForm.module.scss'
import { selectUser } from '../../selectors/session'
import FirebaseContext from '../firebase/context'
const { Option } = Select;
const { TextArea } = Input;
// import {add} from 'date-fns'

const FormItem = Form.Item

// const defaultEndDate = add(new Date(), {days: 1})

export default function EngagementForm() {
  const [form] = Form.useForm()
  const user = useSelector(selectUser)
  const firebase = useContext(FirebaseContext)
  const router = useRouter()

  const onFinish = async (values) => {
    const { name = DEFAULT_CONTRACT_NAME, jobTitle, type, endDate, descripton = '', contractorEmail, contractorName = '', fixedPrice = 0, hourlyPrice = 0 } = values

    const { uid: clientId, fullName: clientName, email: clientEmail } = user
    const formattedDate = endDate.toString()
    const engagement = {
      status: ENGAGEMENT_STATUSES.INACTIVE,
      endDate: formattedDate,
      currency: DEFAULT_CURRENCY,
      name,
      type,
      hourlyPrice,
      fixedPrice,
      jobTitle,
      descripton,
      contractorEmail,
      contractorName,
      clientId,
      clientName,
      clientEmail,
    }

    console.log(JSON.stringify(engagement))

    try {
      const response = await firebase.createEngagement(engagement)
      console.log(response.id)
      router.push('/dashboard/create/success')
    } catch (error) {
      console.error(error.message)
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleTypeChange = (value) => {
    console.log("value:: ", value)
    if (value === ENGAGEMENT_TYPES.HOURLY) {
      form.setFieldsValue({ fixedPrice: 0 })
    }
    if (value === ENGAGEMENT_TYPES.FIXED_PRICE) {
      form.setFieldsValue({ hourlyPrice: 0 })
    }
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ width: '100%' }}
      form={form}
    >
      <FormItem
        label="Engagement Name"
        name="name"
      >
        <Input placeholder="Untitled contract" />
      </FormItem>

      <FormItem
        label="Job Title"
        name="jobTitle"
        rules={[{ required: true, message: 'Job title is required to create engagement' }]}
      >
        <Input placeholder="Type job title" />
      </FormItem>

      <FormItem
        label="Engagement Type"
        name="type"
        initialValue={ENGAGEMENT_TYPES.HOURLY}
        rules={[{ required: true, message: 'Select Contract Type' }]}
      >
        <Select onChange={handleTypeChange}>
          <Option value={ENGAGEMENT_TYPES.HOURLY}>Hourly</Option>
          <Option value={ENGAGEMENT_TYPES.FIXED_PRICE}>Fixed Price</Option>
        </Select>
      </FormItem>
      <FormItem
        label="Hourly Price"
        name="hourlyPrice"
        rules={[{ required: false, message: 'Please input Hourly Price' }]}
        shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
      >
        <Input
          type="number"
          addonAfter={DEFAULT_CURRENCY}

        />
      </FormItem>
      <FormItem
        label="Fixed Price"
        name="fixedPrice"
        rules={[{ required: false, message: 'Please input Fixed Price' }]}
        shouldUpdate={(prevValues, currentValues) => prevValues.type !== currentValues.type}
      >
        <Input
          type="number"
          addonAfter={DEFAULT_CURRENCY}

        />
      </FormItem>

      <FormItem
        name="endDate"
        rules={[{ required: true, message: 'Termination date is required to create engagement' }]}
        label={
          <span>
            Termination Date&nbsp;
            <Tooltip title={HELP_MESSAGES.TERMINATION_DATE}>
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
      >
        <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
      </FormItem>
      <FormItem
        label="Contractor/Employee Name"
        name="contractorName"
      >
        <Input placeholder="Type contractor name" />
      </FormItem>
      <FormItem
        label="Contractor/Employee Email"
        name="contractorEmail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Contractor email is required to send him/her contract for review'
          }
        ]}
      >
        <Input placeholder="Type contractor email" type="email" />
      </FormItem>
      <FormItem
        label="Scope of work"
        name="description"
      >
        <TextArea rows="4"
          placeholder="describe the project scope here. The more deailed the better"
          style={{ width: '100%' }}
        />
      </FormItem>
      <FormItem wrapperCol={{ offset: 12 }}>
        <Button type="primary" htmlType="submit" block>
          Create Engagement
        </Button>
      </FormItem>
    </Form >
  )

}