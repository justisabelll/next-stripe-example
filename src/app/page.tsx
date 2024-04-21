import Link from "next/link";
import { Auth } from "~/components/auth";
import { auth } from "~/lib/auth";

export default async function Home() {
  const session = await auth();
  const user = session ? session.user : null;

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <div className="mx-auto w-full max-w-4xl space-y-4 px-4 py-8">
        <h1 className="pt-24 text-6xl font-bold">Next Stripe Examples</h1>
        <ExampleLinks isLoggedIn={user ? true : false} />
        <div className="w-full text-lg">
          <p className="pt-2 ">
            Each link takes you to a page with the associated example setup.
          </p>
          <p className="pt-2">
            You need to be logged in to see the examples in action besides the
            one-time payment.
          </p>
          <p className="pt-2">
            Just like in a real-world scenario, you would need to be logged in
            to purchase a subscription or use a service.
          </p>
        </div>
        {user ? (
          <p className="pt-2">
            You are logged in as <b>{user.name}</b>.
          </p>
        ) : (
          <div className="flex justify-center">
            <Auth />
          </div>
        )}
      </div>
    </main>
  );
}

const ExampleLinks = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const examples = ["Subscription", "One Time Payment", "Usage"];

  return (
    <div className="">
      {examples.map((example) => (
        <div key={example}>
          <button
            disabled={!isLoggedIn}
            className="my-2 text-4xl text-blue-500 hover:underline disabled:pointer-events-none disabled:opacity-50"
          >
            <Link href={`/${example.toLowerCase().replace(" ", "-")}`}>
              {example}
            </Link>
          </button>
        </div>
      ))}
    </div>
  );
};
