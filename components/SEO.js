import Head from 'next/head'

const HeadTags = (props) => {

  const metaImage = props.metaImage || '/img/default_meta.png';
  const title = `${props.title} - Christian Student Convention | FaithWay Baptist Church`

  return <Head>
    <title>{title}</title>
    <meta name="description" content={props.description} />
    <meta property="og:site_name" content="Christian Student Convention" />
    <meta property="og:url" content={props.url} />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={props.description} />
    <meta property="og:image" content={metaImage}  />
    <meta property="og:image:secure_url" content={metaImage} />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="500" />
    <link rel="canonical" href={props.url} />
    {props.children}
  </Head>
}

export default HeadTags;