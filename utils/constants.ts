import { isDev } from "@/utils/helpers";

export const pricingPlans = [
  {
    name: "Basic",
    price: 9,
    description: "Perfect for occasional users",
    items: [
      "5 PDF summaries per month",
      "Standard processing speed",
      "Email support",
    ],
    id: "basic",
    paymentLink: isDev? 
    'https://buy.stripe.com/test_3cI00j3KX13WeKocLa0gw00':'',
    priceId: isDev? 
    'price_1RbNJoFWbb6H1WsIkSwACuvF':'',
  },
  {
    name: "Pro",
    price: 19,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 priority support",
      "Markdown export",
    ],
    id: "pro",
    paymentLink: isDev ? 
    'https://buy.stripe.com/test_cNidR91CPh2U8m09yY0gw01': '',
    priceId: isDev ? 
    'price_1RbNJoFWbb6H1WsIPIk09Odg': '',
  },
];


export const containerVariants = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const itemVariants = {
  hidden: {opacity: 0, y: 20},
  visible: {
    opacity: 1,
    transition: {
      type: "spring" as const,
      damping: 15,
      stiffness: 50,
      duration: 0.8,
    },
  },
};