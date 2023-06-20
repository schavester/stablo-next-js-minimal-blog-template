import Container from "@components/container";
import Layout from "@components/layout";
import { authorsquery, configQuery } from "@lib/groq";
import { getClient } from "@lib/sanity";
import GetImage from "@utils/getImage";
import Image from "next/image";
import Link from "next/link";

export default function About({ authors, siteconfig }) {
  return (
    <Layout {...siteconfig}>
      <Container>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          About
        </h1>
        <div className="text-center">
          <p className="text-lg">We are a small passionate team.</p>
        </div>

        <div className="grid grid-cols-3 gap-5 mt-6 mb-16 md:mt-16 md:mb-32 md:gap-16">
          {authors.slice(0, 3).map(author => {
            const { width, height, ...imgprops } = GetImage(
              author?.image
            );
            return (
              <div
                key={author._id}
                className="relative overflow-hidden rounded-md aspect-square odd:translate-y-10 odd:md:translate-y-16">
                <Image
                  {...imgprops}
                  alt={author.name || " "}
                  layout="fill"
                  objectFit="cover"
                  sizes="(max-width: 320px) 100vw, 320px"
                />
              </div>
            );
          })}
        </div>

        <div className="mx-auto prose text-center dark:prose-invert mt-14">
          <p>
            Earlier this year, I reached out to several City departments on a quest for vacancy data. Knowing what I know about housing misuse and buildings being left empty (sometimes for years), I suspected the official vacancy rate might not be accurate.
          </p>
       <p>I received no responses at first, received unhelpful non-responses, had the buck passed to other departments (who didn't respond at all), and got an unprofessional (and frankly quite snotty) comment from a City official on Twitter. (If you are one of the above people, shame on you. You work for Angelenos, not the other way around.)</p>
          <p>I received no responses at first, received unhelpful non-responses, had the buck passed to other departments (who didn't respond at all), and got an unprofessional (and frankly quite snotty) comment from a City official on Twitter. (If you are one of the above people, shame on you. You work for Angelenos, not the other way around.)</p>
           <p> <Link href="/contact">Get in touch</Link>
          </p>
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
