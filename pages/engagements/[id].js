import firebase from '../../components/firebase/firebase'
import EngagementView from '../../components/EngagementView/EngagementView';
export default function Engagement({ engagement }) {

  if (!engagement) return <div>Oh. Engagement with Id is not available. Please contact Admin</div>
  console.log("test", engagement)
  return (<EngagementView engagement={engagement}></EngagementView>)
}

export async function getServerSideProps(context) {
  const { params: { id } = {} } = context;

  const engagement = await firebase.getEngagement(id);
  console.log("test", engagement)
  return {
    props: {
      engagement
    }
  }
  // const {data: engagement} = await axios.get(`/api/engagements/${params.id}`);
  // return {props: {engagement}};
}


// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await fetch(`https://.../posts/${params.id}`)
//   const engagement = await res.json()

//   // Pass post data to the page via props
//   return { props: { engagement } }
// }