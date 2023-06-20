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
          <p>
            I received no responses at first, received unhelpful non-responses, had the buck passed to other departments (who didn't respond at all), and got an unprofessional (and frankly quite snotty) comment from a City official on Twitter. (If you are one of the above people, shame on you. You work for Angelenos, not the other way around.)
          </p>
          <p>
          Eleven days ago, while looking over the Los Angeles Department of Building and Safety's Vacant Building Abatement List, it occurred to me that perhaps a map could help convey SOME idea of the problem.

          </p>
          
          <p>
          Six days ago, I made an offhand comment on an Instagram post. LA Taco posted about potential buyers needing a combined annual income of $178,400 to buy a home in Southern California, and I commented on the shocking number of abated properties going to waste in the city of Los Angeles alone. 

          </p>
          
          <p>

          That comment was liked by over 200 people, and I was inundated with requests for the list. I sent the link to everyone who asked, being sure to specify that it was for abated, and therefore legally uninhabitable, properties (and that owners may or may not be willing to sell). That didn't matter to anyone who asked - several people commented that they didn't mind a fixer. 

          </p>
          
          <p>

          Clearly, I had struck a nerve.

          </p>

          <p>

                    What does it say when Angelenos are so starved for homes they can afford that they are willing to pursue buying an off-market house in such poor condition that they can't even move into it until extensive repairs have been completed? And what else does it say when over 500 properties citywide are legally uninhabitable in the first place (some of them empty since the 1990s)?

          </p>
          <p>
Initially, I only mapped empty, abated housing. I've since added other abated property types, as well as some properties known to be held empty or misused (such as for short-term rentals that violate the law). I will add more as they come to my attention.

          
          </p>

          <p>
          I will freely admit that the map is not complete yet (and many not be for some time). The City only maintains an official list of nuisance properties; vacancies in usable buildings aren't really tracked in a way that is readily accessible to the public.

          </p>
          <p>
          If one of the properties on this map becomes occupied again, please let me know. When a property is confirmed to be occupied again, it will "graduate" from the map.

          </p>

          <p>
          If you are aware of a building that has been kept vacant for an unusually long period of time, or is being misused as an illegal short-term rental, or if you know of a landlord not re-renting units when tenants leave, please reach out. 
          </p>

          <p>
          If there is a vacant lot in your neighborhood with no known plans for a replacement building, please reach out. 
          </p>
          <p>
            <Link href="/contact">Get in touch</Link>
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