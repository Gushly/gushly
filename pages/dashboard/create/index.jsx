import { Row } from 'antd'
import EngagementForm from "../../../components/EngagementForm/EngagementForm";
import DashboardLayout from "../../../components/DashboardLayout/DashboardLayout";

export default function CreateEngagement() {
  return (<DashboardLayout>
    <div style={{ width: '60%', height: '100%', marginTop: '3%' }} className="flexContainer">
      <EngagementForm></EngagementForm>
    </div>
  </DashboardLayout>)
}