import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function Usage() {
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
          <h2
            className="text-base font-semibold leading-7
        text-primary"
          >
            Usage Based Pricing Page (Credits)
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Walkthrough checkout like a customer.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 sm:text-center">
          Pressing any of the buttons below will take you to the respective plan
          payment page.
        </p>
        <UsagePricing />
      </div>
    </div>
  );
}

const UsagePricing = () => {
  const creditPackages = [
    {
      id: 1,
      title: "Basic",
      price: 10,
      description: "100 credits added to your account.",
    },
    {
      id: 2,
      title: "Standard",
      price: 18,
      description: "200 credits added to your account.",
      recommended: true,
    },
    {
      id: 3,
      title: "Premium",
      price: 25,
      description: "300 credits added to your account.",
    },
  ];
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {creditPackages.map((pkg) => (
              <div key={pkg.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14 ">
                <div className="flex items-center justify-between">
                  <h3
                    id={`package-${pkg.id}`}
                    className="text-base font-semibold leading-7"
                  >
                    {pkg.title}
                  </h3>
                  {pkg.recommended && (
                    <Badge
                      variant={"outline"}
                      className="text-sm font-semibold leading-6 text-primary"
                    >
                      Recommended
                    </Badge>
                  )}
                </div>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight">
                    ${pkg.price}
                  </span>
                  <span className="text-sm font-semibold leading-6 ">
                    /package
                  </span>
                </p>
                <a
                  href="#"
                  aria-describedby={`package-${pkg.id}`}
                  className="mt-10 block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold leading-6 shadow-sm hover:bg-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Buy credits
                </a>
                <p className="mt-10 text-sm font-semibold leading-6">
                  {pkg.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
