import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { marked } from 'marked'
import GuidelinesLayout from '@/components/Layouts/GuidelinesLayout'

const GuidelineMainPage = (props) => {
  const { data, content } = props
  const { title, description } = data;

  return <GuidelinesLayout
    head={{
      title:"Student Guidelines",
    }}
  >
    <h1>{title}</h1>
    <div 
      className="content-section" 
      dangerouslySetInnerHTML={{__html: marked(content, {mangle: false, headerIds: false})}}
    />
  </GuidelinesLayout>
}

export default GuidelineMainPage;

export async function getStaticProps(){
  try {
    const { data, content } = matter(fs.readFileSync(path.join('content/guidelines', 'index.md'), 'utf-8'));

    return {
      props: {
        ...JSON.parse(JSON.stringify({  // workaround for "`object` ("[object Date]") cannot be serialized as JSON" error...
          data,
          content,
        }))
      }
    }
  } catch (error) {
    console.log(error)
    return {
      notFound: true,
    }
  }
}