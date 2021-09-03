import { Descriptions, Card } from "antd";
import { ENGAGEMENT_TYPES } from '../../constants'

export default function EngagementView({
  engagement: {
    name,
    contractorEmail,
    type,
    clientId,
    clientName,
    hourlyPrice,
    fixedPrice,
    contractorName,
    status,
    clientEmail,
    descripton,
    jobTitle,
    currency,
    endDate
  } = {}
}) {
  console.log("name:: ", name)
  const price = type === ENGAGEMENT_TYPES.FIXED ? fixedPrice : `${hourlyPrice} ${currency}/hour`;
  return (<Card style={{ width: '80%', margin: 'auto', marginTop: '5%' }}>
    <Descriptions title="Engagement Info">
      <Descriptions.Item label="Name">{name}</Descriptions.Item>
      <Descriptions.Item label="Engagement Status">{status}</Descriptions.Item>
      <Descriptions.Item label="Signed By">{clientName}({clientEmail})</Descriptions.Item>
      <Descriptions.Item label="Engagement Type">{type}</Descriptions.Item>
      <Descriptions.Item label="Price">{price}</Descriptions.Item>
      <Descriptions.Item label="Contractor/Employee">{contractorName} {contractorEmail}</Descriptions.Item>
      <Descriptions.Item label="Job Title">{jobTitle}</Descriptions.Item>
      <Descriptions.Item label="End Date">{endDate}</Descriptions.Item>
      <Descriptions.Item label="Description">{descripton}</Descriptions.Item>
    </Descriptions>
  </Card>)
}