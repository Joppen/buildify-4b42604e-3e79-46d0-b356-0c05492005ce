
import { CheckCircle } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered Website Generation',
    description: 'Describe your website in plain English, and our AI will build it for you in seconds.',
    icon: CheckCircle,
  },
  {
    name: 'Customizable Templates',
    description: 'Choose from dozens of professionally designed templates for any type of website.',
    icon: CheckCircle,
  },
  {
    name: 'Responsive Design',
    description: 'All websites are fully responsive and look great on any device.',
    icon: CheckCircle,
  },
  {
    name: 'No Coding Required',
    description: 'Build complex websites without writing a single line of code.',
    icon: CheckCircle,
  },
  {
    name: 'SEO Optimized',
    description: 'All websites are optimized for search engines out of the box.',
    icon: CheckCircle,
  },
  {
    name: 'Fast Hosting',
    description: 'Host your website on our lightning-fast servers with one click.',
    icon: CheckCircle,
  },
];

const Features = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to build amazing websites
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Buildify combines the power of AI with beautiful design to help you create websites faster than ever before.
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;