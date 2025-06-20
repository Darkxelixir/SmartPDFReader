import { ArrowRight, Sparkles } from "lucide-react";
import BgGradient from "./bg-gradient";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function UpgradeRequired() {
  return (
    <div className="relative min-h-[50vh]">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container px-8 py-16">
        <div className="flex flex-col items-center justify-center gap-8 text-center max-w-2xl mx-auto">
          <div className="relative p-[1px] overflow-hidden rounded-full bg-linear-to-r from-rose-300 via-rose-500 to-rose-800 animate-gradient-x group">
            <Badge className="relative px-6 py-2 text-base font-medium bg-white rounded-full group-hover:bg-rose-200 transition-colors duration-200">
              <Sparkles className="!h-6 !w-6 mr-2 text-rose-600 animate-pulse" />
              <p className="text-base text-rose-600">Premium Feature</p>
            </Badge>
          </div>
          <h1
            className="text-4xl font-bold tracking-tight bg-linear-to-r 
                        from-gray-900 to-gray-600 bg-clip-text text-transparent"
          >
            Subscription Required
          </h1>
          <p
            className="text-lg leading-8 text-gray-600 border-2 border-rose-200 
                    bg-white/50 backdrop-blur-xs rounded-lg p-6 border-dashed max-w-xl"
          >
            You need to upgrade to the Basic Plan or the Pro Plan to access this
            feature 💖
          </p>
          <Button
            asChild
            className="bg-linear-to-r from-rose-500 to-rose-700 hover:from-rose-600 hover:to-rose-800 text-white"
          >
            <Link href="/#pricing" className="flex gap-2 items-center">
              View Pricing Plans <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
