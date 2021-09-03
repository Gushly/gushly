// import Link from 'next/link'
import { Result, Button } from "antd"


const DEFAULT_TITLE = 'Engagement Created Successfully'

export default function SuccessPage({ title = DEFAULT_TITLE, subTitle = '' }) {
  return (<Result
    status="success"
    title={title}
    subTitle={subTitle}
    extra={[
      <Button type="primary" key="home" href='/dashboard'>
        Go Home
      </Button>,
    ]}
  />
  )
}