import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import { marked } from 'marked'
import GuidelinesLayout from '@/components/Layouts/GuidelinesLayout'

const GuidelinesPage = (props) => {

  const { slug, data, content } = props
  const { title, description } = data;

  return <GuidelinesLayout
    head={{
      title
    }}
  >
    <h1>{title}</h1>
    <div 
      className="content-section" 
      dangerouslySetInnerHTML={{__html: marked(content, {mangle: false, headerIds: false})}}
    />
  </GuidelinesLayout>
}

export default GuidelinesPage

export async function getStaticPaths(){

  const pagesDir = 'content/guidelines'
  let paths = []

  try {

    paths = fs.readdirSync(path.join(pagesDir))

    paths = paths.flatMap((fileName) => fileName != 'index.md' ? ({
      params: {
        slug: fileName.replace('.md', '')
      }
    }): [])
    
  } catch (error) {
    console.log('No pages found')
  }

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({params: { slug }}){

  const pagesDir = 'content/guidelines'
  let pages = []
  let markdownWithMeta = ''
  let currentPage = {}

  try {
    pages = fs.readdirSync(path.join(pagesDir)).map(i => { return {file: i, dirPath: pagesDir}});

    pages = pages.map(({file, dirPath}) => {
      const slug = file.replace('.md', '')
      const markdownWithMeta = fs.readFileSync(path.join(dirPath, file), 'utf-8')
      const { data: frontmatter } = matter(markdownWithMeta);
      return {
        slug,
        frontmatter,
        type: dirPath.split('/')[1],
        dirPath
      }
    })


    currentPage = pages.find(i => i.slug == slug);

    markdownWithMeta = matter(fs.readFileSync(path.join(currentPage.dirPath, `${currentPage.slug}.md`), 'utf-8'))

  } catch (error) {
    return {
      notFound: true,
    }
  }

  const { data, content } = markdownWithMeta;

  return {
    props: {
      ...JSON.parse(JSON.stringify({  // workaround for "`object` ("[object Date]") cannot be serialized as JSON" error...
        slug,
        data,
        content,
      }))
    }
  }
}