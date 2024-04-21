import Link from "next/link";
import { Auth } from "~/components/auth";
import { auth } from "~/lib/auth";

export default async function Home() {
  const session = await auth();
  const user = session ? session.user : null;

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="space-y-4 px-4 py-8">
        <div>
          <h1 className="pt-24 text-center text-6xl font-bold">
            Next Stripe Examples
          </h1>
        </div>
        <ExampleLinks />
        <div>
          <p className="pt-2">
            Each link takes you to a page that with an the associated example
            setup.
          </p>
        </div>
        {user ? (
          <div>
            <p className="pt-2">You are logged in as {user.name}.</p>
          </div>
        ) : (
          <Auth />
        )}
      </div>
    </main>
  );
}

const ExampleLinks = () => {
  const examples = ["Subscription", "One Time Payment", "Usage"];

  return (
    <div className="mt-8 flex flex-col">
      {examples.map((example) => (
        <Link
          key={example}
          href={`/${example.toLowerCase().replace(" ", "-")}`}
          className="my-2 text-4xl text-blue-500 hover:underline"
        >
          {example}
        </Link>
      ))}
    </div>
  );
};
