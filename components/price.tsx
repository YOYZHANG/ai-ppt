import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Check, X } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface Plan {
  name: string
  description: string
  price: number
  credits: number
  features: {
    name: string
    included: boolean
  }[]
}

const PricingPlans = () => {
  const [isYearly, setIsYearly] = useState(false);
  const [loading, setLoading] = useState(false);

  const plans: Plan[] = [
    {
      name: "Free",
      description: "No credit card needed",
      price: 0,
      credits: 20,
      features: [
        { name: "20 credits per month", included: true },
        { name: "1 task waiting in queue", included: true },
        { name: "Limited queue priority", included: true },
        { name: "Assets are under CC BY 4.0 license", included: true },
      ],
    },
    {
      name: "Pro",
      description: "Best for individual creators",
      price: 20,
      credits: 100,
      features: [
        { name: "1,000 credits per month", included: true },
        { name: "10 tasks waiting in queue", included: true },
        { name: "Standard queue priority", included: true },
        { name: "Assets are private & customer owned", included: true },
      ],
    },
  ];

  const handleSubscribe = async (plan: Plan) => {
    try {
      if (!process.env.STRIPE_PRIVATE_KEY)  {
        console.error('xxxxxx')
        toast("👷 Feature Coming Soon....");
        return
      }
      setLoading(true);

      const response = await fetch("/api/stripe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(plan),
      });

      const { message, data } = await response.json();
    
      if (!data) {
        setLoading(false);
        toast.error(message);

        return;
      }
    } catch (e) {
      setLoading(false);
      toast.error("checkout failed");
    }
  };


  return (
    <div className=" text-white p-8 mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Upgrade Your Plan</h2>
      <div className="flex justify-center items-center mb-8 space-x-4">
        <span className={`${!isYearly ? 'text-green-400' : 'text-gray-400'}`}>Monthly</span>
        <Switch checked={isYearly} onCheckedChange={setIsYearly} />
        <span className={`${isYearly ? 'text-green-400' : 'text-gray-400'}`}>Yearly <span className="text-green-400 text-sm">Save 20%</span></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className={`text-2xl font-bold ${plan.name === 'Free' ? 'text-green-400' : plan.name === 'Pro' ? 'text-blue-400' : plan.name === 'Max' ? 'text-purple-400' : 'text-yellow-400'}`}>
                {plan.name}
              </CardTitle>
              <p className="text-sm text-gray-400">{plan.description}</p>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold mb-4">${isYearly ? plan.price * 12 * 0.8 : plan.price}<span className="text-sm font-normal text-gray-400">/{isYearly ? 'year' : 'month'}</span></p>
              {plan.credits && <p className="text-sm text-gray-400 mb-4">${(plan.price / plan.credits).toFixed(2)} / 100 credits</p>}
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    {feature.included ? (
                      <Check className="mr-2 h-5 w-5 text-green-400" />
                    ) : (
                      <X className="mr-2 h-5 w-5 text-red-400" />
                    )}
                    <span className={feature.included ? 'text-gray-200' : 'text-gray-500'}>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button disabled={loading || plan.name === 'Free'} className="w-full bg-green-500 hover:bg-green-600 text-white" onClick={() => handleSubscribe(plan)}>
                {plan.name === 'Free' ? 'Current plan' : 'Subscribe Now'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
