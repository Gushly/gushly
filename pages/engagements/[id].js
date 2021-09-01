
export default function Engagement() {

}

export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(`https://.../posts/${params.id}`)
  const engagement = await res.json()

  // Pass post data to the page via props
  return { props: { engagement } }
}