import { Button } from "~/components/ui/button";
import Link from "next/link";

export default function Subscriptions() {
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
            Subcription Pricing Page
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
            Walkthrough checkout like a customer.
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8  sm:text-center">
          Pressing any of the buttons below will take you to the respective plan
          payment page.
        </p>
        <SubscriptionsPricing />
      </div>
    </div>
  );
}

const SubscriptionsPricing = () => {
  const tiers = [
    {
      name: "Basic",
      id: "tier-basic",
      href: "#",
      price: { monthly: "$15", annually: "$12" },
      description: "Everything necessary to get started.",
      features: [
        "5 products",
        "Up to 1,000 subscribers",
        "Basic analytics",
        "48-hour support response time",
      ],
    },
    {
      name: "Essential",
      id: "tier-essential",
      href: "#",
      price: { monthly: "$30", annually: "$24" },
      description:
        "Everything in Basic, plus essential tools for growing your business.",
      features: [
        "25 products",
        "Up to 10,000 subscribers",
        "Advanced analytics",
        "24-hour support response time",
        "Marketing automations",
      ],
    },
    {
      name: "Growth",
      id: "tier-growth",
      href: "#",
      price: { monthly: "$60", annually: "$48" },
      description:
        "Everything in Essential, plus collaboration tools and deeper insights.",
      features: [
        "Unlimited products",
        "Unlimited subscribers",
        "Advanced analytics",
        "1-hour, dedicated support response time",
        "Marketing automations",
        "Custom reporting tools",
      ],
    },
  ];
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mt-20 flow-root">
          <div className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
                <h3 id={tier.id} className="text-base font-semibold leading-7 ">
                  {tier.name}
                </h3>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-5xl font-bold tracking-tight">
                    {tier.price.monthly}
                  </span>
                  <span className="text-sm font-semibold leading-6">
                    /month
                  </span>
                </p>
                <p className="mt-3 text-sm leading-6 ">
                  {tier.price.annually} per month if paid annually
                </p>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className="mt-10 block rounded-md bg-primary px-3 py-2 text-center text-sm font-semibold leading-6 shadow-sm hover:bg-primary/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Buy plan
                </a>
                <p className="mt-10 text-sm font-semibold leading-6">
                  {tier.description}
                </p>
                <ul role="list" className="mt-6 space-y-3 text-sm leading-6">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
