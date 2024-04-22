import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function OneTimePayment() {
  return (
    <div>
      <Button
        variant="link"
        className="mb-4 pt-4 text-xl text-primary underline hover:text-primary/70"
      >
        <Link href="/">Back Home</Link>
      </Button>

      <div className="py-12 sm:py-24">
        <div className="mx-auto max-w-4xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            One Time Payment Page
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Walkthrough checkout like a customer.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 sm:text-center">
          Pressing any of the buttons below will take you to the respective plan
          payment page.
        </p>
        <Tutorials />
      </div>
    </div>
  );
}

const Tutorials = () => {
  const tutorials = [
    {
      name: "Subscription Tutorial",
      description: "Everything Recurring payments",
      features: [
        "Learn how to set up a subscription service",
        "Recurring payments",
        "Customer management",
      ],
      price: "$15",
    },
    {
      name: "One Time Payment Tutorial",
      description: "Everything One-time payment",
      features: [
        "Learn how to set up a one-time payment",
        "Customer management",
        "Payment processing",
      ],
      price: "$10",
    },
    {
      name: "Usage Tutorial",
      description: "Everything Usage-based pricing",
      features: [
        "Learn how to set up usage-based pricing",
        "Customer management",
        "Payment processing",
      ],
      price: "$20",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center ">
      {tutorials.map((tutorial) => (
        <div
          key={tutorial.name}
          className="mt-16 w-full max-w-4xl rounded-lg border border-primary bg-card"
        >
          <div className="p-6">
            <h3 className="text-3xl font-bold tracking-tight ">
              {tutorial.name}
            </h3>
            <p className="mt-4 text-lg leading-8 ">{tutorial.description}</p>
            <div className="mt-8 flex items-center gap-x-4">
              <h4 className="flex-none text-lg font-semibold leading-7 text-primary">
                Features
              </h4>
              <div className="h-px flex-auto bg-primary" />
            </div>
            <ul
              role="list"
              className="0 mt-6 grid grid-cols-1 gap-3 text-lg leading-7"
            >
              {tutorial.features.map((feature, index) => (
                <li key={index} className="flex gap-x-3">
                  <svg
                    className="h-6 w-5 flex-none text-primary"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="p-4">
            <div className="rounded-xl bg-secondary py-8 text-center ring-1 ring-inset ring-gray-900/5">
              <div className="mx-auto max-w-sm px-6">
                <p className="text-lg font-semibold ">Price</p>
                <p className="mt-4 flex items-baseline justify-center gap-x-2">
                  <span className="text-4xl font-bold tracking-tight ">
                    {tutorial.price}
                  </span>
                </p>
                <a
                  href="#"
                  className="mt-8 block w-full rounded-md bg-primary px-4 py-3 text-center text-lg font-semibold shadow-sm hover:bg-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Get access
                </a>
                <p className="mt-4 text-sm leading-6 ">
                  Buy now, own forever.{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
