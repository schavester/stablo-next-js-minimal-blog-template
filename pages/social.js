import Container from "@components/container";
import Layout from "@components/layout";
import { authorsquery, configQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";
import GetImage from "@utils/getImage";
import Image from "next/image";
import Link from "next/link";

export default function Map({ authors, siteconfig }) {
  return (
    <Layout {...siteconfig}>
      <Container>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          SOCIAL MEDIA
        </h1>
        <div className="text-center">
          <p className="text-lg">Our map of Empty Los Angeles</p>
        </div>

       

        <div className="mx-auto prose text-center dark:prose-invert mt-14">
          <ul>
          <li><a href=" https://www.instagram.com/EmptyLosAngeles/">INSTAGRAM</a>
          <li><a href="https://www.twitter.com/emptylosangeles">TWITTER</a>
          <li><a href="https://www.facebook.com/EmptyLosAngeles">FACEBOOK</a>
          <li>
          </ul>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  //console.log(params);
  const authors = await getClient(preview).fetch(authorsquery);
  const config = await getClient(preview).fetch(configQuery);
  return {
    props: {
      authors: authors,
      siteconfig: { ...config },
      preview
    },
    revalidate: 100
  };
}
