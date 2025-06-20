import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="bg-gray-50 py-12">
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col items-center justify-center space-y-4
                    text-center"
        >
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to save hours of reading time?
            </h2>
            <p
              className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed 
                            lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"
            >
              Transform lenthy documents into clear, actionalble insights with
              our AI-Powered Smart PDF Reader
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <div>
              <Link
                href={"/#pricing"}
                className="inline-flex items-center justify-center
                                px-6 py-3 bg-gradient-to-r from-rose-500 to-rose-700
                                text-white font-semibold rounded-lg shadow-md hover:from-rose-600 hover:to-rose-800
                                transition-all duration-300 hover:scale-105"
              >
                Get Started{" "}
                <ArrowRight size={18} className="ml-2 h-4 w-4 animate-pulse" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
