import Link from "@/components/Link";
import Tag from "@/components/Tag";
import siteMetadata from "@/data/siteMetadata";
import { formatDate } from "pliny/utils/formatDate";

import { Profile } from "@/components/Profile";
// import NewsletterForm from "pliny/ui/NewsletterForm";

const MAX_DISPLAY = 5;

function PostListItem({ post }: { post: any }) {
  const { slug, date, title, summary, tags } = post;
  return (
    <li className="py-4">
      <article>
        <div className="space-y-2 xl:items-baseline xl:space-y-0">
          <div className="space-y-2 xl:col-span-3">
            <div className="space-y-6">
              <div className="grid grid-cols-3 justify-between">
                <div className="col-span-3 sm:col-span-2">
                  <h2 className="text-2xl font-bold leading-8 tracking-tight">
                    <Link
                      href={`/posts/${slug}`}
                      className="text-gray-900 dark:text-gray-100"
                    >
                      {title}
                    </Link>
                  </h2>
                  <div className="flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
                <div className="col-span-3 sm:col-span-1 ">
                  <dl className="sm:ml-auto sm:w-fit h-fit">
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={date}>
                        {formatDate(date, siteMetadata.locale)}
                      </time>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="prose max-w-none text-gray-500 dark:text-gray-400">
              {summary}
            </div>
            <div className="text-base font-medium leading-6">
              <Link
                href={`/posts/${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read "${title}"`}
              >
                Read &rarr;
              </Link>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}

const Summary = ({ className }: { className?: string }) => (
  <div className={"space-y-2 " + className}>
    <p>sup, i'm ben.</p>
    <p>i'm probably building something rn. neutral good. </p>
  </div>
);

const Socials = ({ className }: { className?: string }) => {
  const links = ["github", "bluesky", "twitter", "linkedin"];
  return (
    <div className={className}>
      <strong>
        find me on
        {/*  <span className="text-primary-500">@</span> */}
      </strong>
      <ul className="list-disc list-inside ">
        {links.map((social) => (
          <li className="hover:underline" key={social}>
            <Link href={siteMetadata[social]}>{social}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function Home({ posts }) {
  return (
    <>
      {/* Mobile */}
      <div className="grid grid-cols-2 space-y-2 sm:hidden">
        <Summary className="col-span-2" />
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Profile className="mx-auto" />
        </div>
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Socials className="h-fit w-fit m-auto" />
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden sm:grid grid-cols-2">
        <div>
          <Summary className="mb-2" />
          <Socials />
        </div>
        <Profile className="mx-auto flex" />
      </div>

      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 py-4">
          <h1 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-4xl md:leading-14">
            thoughts
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && "No posts found."}
          {posts.slice(0, MAX_DISPLAY).map((post) => (
            <PostListItem key={post.slug} post={post} />
          ))}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/posts"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
