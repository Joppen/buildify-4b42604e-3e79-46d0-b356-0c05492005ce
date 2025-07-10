
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTA = () => {
  return (
    <div className="bg-blue-700">
      <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
          <span className="block">Ready to build your website?</span>
          <span className="block">Start your free trial today.</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-blue-200">
          No credit card required. Cancel anytime.
        </p>
        <Link to="/register">
          <Button size="lg" className="mt-8 w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-50">
            Get started for free
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CTA;