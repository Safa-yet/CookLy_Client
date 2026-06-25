
"use client";

import { Card, Button, Chip } from "@heroui/react";
import {
  FiCheck,
  FiBookOpen,
  FiUsers,
  FiAward,
} from "react-icons/fi";

const plans = [
  {
    name: "Free",
    id: "user_free",
    price: "$0",
    description: "Perfect for beginners who want to start sharing recipes.",
    features: [
      "Publish up to 2 recipes",
      "Browse all recipes",
      "Like recipes",
      "Save favorite recipes",
      "Basic profile access",
    ],
  },

  {
    name: "Pro",
    id: "user_pro",
    price: "$9.99/mo",
    popular: true,
    description: "Best choice for active recipe creators.",
    features: [
      "Publish 10 recipes per month",
      "Browse all recipes",
      "Like & favorite recipes",
      "Purchase premium recipes",
      "Priority support",
      "Advanced creator tools",
    ],
  },

  {
    name: "Premium",
    id: "user_premium",
    price: "$19.99/mo",
    description: "Unlimited publishing with exclusive premium benefits.",
    features: [
      "Unlimited recipe publishing",
      "Premium profile badge",
      "Browse all recipes",
      "Like & favorite recipes",
      "Purchase premium recipes",
      "Priority support",
      "Early access to new features",
    ],
  },
];

function PlanCard({
  name,
  id,
  price,
  description,
  features,
  popular,
}) {
  return (
    <Card
      className={`relative overflow-hidden rounded-3xl border bg-white shadow-lg h-full ${
        popular
          ? "border-[#00B96D] ring-2 ring-[#00B96D]"
          : "border-gray-200"
      }`}
    >
      {popular && (
        <div className="absolute top-4 right-4 bg-[#00B96D] text-white px-3 py-1 rounded-full text-xs font-medium">
          Most Popular
        </div>
      )}

      <Card.Content className="p-8 flex flex-col h-full">
        <h3 className="text-3xl font-bold text-[#091E21]">
          {name}
        </h3>

        <div className="mt-6">
          <span className="text-5xl font-black text-[#091E21]">
            {price}
          </span>
        </div>

        <p className="text-gray-500 mt-4">
          {description}
        </p>

        <div className="mt-8 space-y-4 flex-grow">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-start gap-3"
            >
              <FiCheck className="text-[#00B96D] mt-1 shrink-0" />
              <span className="text-gray-700">
                {feature}
              </span>
            </div>
          ))}
        </div>

        <form
          action="/api/checkout_sessions"
          method="POST"
        >
          <input
            type="hidden"
            name="plan_id"
            value={id} 
          />
    

          <Button
            type="submit"
            className="w-full mt-8 bg-[#00B96D] text-white"
          >
            {id === "user_free"
              ? "Current Plan"
              : "Upgrade Now"}
          </Button>
        </form>
      </Card.Content>
    </Card>
  );
}

export default function PlansPage() {
  return (
    <section className="min-h-screen bg-[#F4F6F8] py-20">
      <div className="max-w-7xl mx-auto px-5">

        {/* Hero */}

        <div className="text-center mb-20">
          <Chip
            className="bg-[#DFF8EC] text-[#00B96D]"
          >
            CookLy Membership Plans
          </Chip>

          <h1 className="text-5xl md:text-6xl font-bold text-[#091E21] mt-6">
            Unlock Your Recipe Journey
          </h1>

          <p className="text-gray-500 max-w-3xl mx-auto mt-5 text-lg">
            Share recipes, inspire food lovers,
            and unlock premium publishing power.
          </p>
        </div>

        {/* Pricing Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              {...plan}
            />
          ))}
        </div>

        {/* Benefits */}

        <div className="grid md:grid-cols-3 gap-8 mt-24">

          <Card className="rounded-3xl shadow-md">
            <Card.Content className="p-8">
              <FiBookOpen
                size={40}
                className="text-[#00B96D]"
              />

              <h3 className="text-2xl font-bold mt-5">
                Share Recipes
              </h3>

              <p className="text-gray-500 mt-3">
                Publish your favorite dishes
                and inspire food lovers worldwide.
              </p>
            </Card.Content>
          </Card>

          <Card className="rounded-3xl shadow-md">
            <Card.Content className="p-8">
              <FiUsers
                size={40}
                className="text-[#00B96D]"
              />

              <h3 className="text-2xl font-bold mt-5">
                Build Community
              </h3>

              <p className="text-gray-500 mt-3">
                Connect with passionate cooks
                and grow your audience.
              </p>
            </Card.Content>
          </Card>

          <Card className="rounded-3xl shadow-md">
            <Card.Content className="p-8">
              <FiAward
                size={40}
                className="text-[#00B96D]"
              />

              <h3 className="text-2xl font-bold mt-5">
                Premium Benefits
              </h3>

              <p className="text-gray-500 mt-3">
                Unlock unlimited publishing and
                exclusive premium perks.
              </p>
            </Card.Content>
          </Card>

        </div>

        {/* CTA */}

        <div className="mt-24">
          <div className="bg-[#043330] rounded-[32px] p-12 text-center">

            <h2 className="text-4xl font-bold text-white">
              Ready To Become A Top Creator?
            </h2>

            <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
              Join thousands of food lovers already
              sharing recipes on CookLy.
            </p>

            <Button className="mt-8 bg-[#00B96D] text-white">
              Start Sharing Today
            </Button>

          </div>
        </div>

      </div>
    </section>
  );
}

