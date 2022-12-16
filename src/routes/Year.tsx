import { useLoaderData } from 'react-router-dom'

export async function loader({ params }: { params: any }) {
  return params.year
}

const Year = () => {
  const year = useLoaderData() as string

  return (
    <div>i'm the year component! year: {year}</div>
  )
}

export default Year
