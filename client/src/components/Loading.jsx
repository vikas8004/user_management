import { LoaderCircle } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-base-200">
      <div className="flex flex-col items-center gap-4 p-6 rounded-xl shadow-lg bg-base-100">
        <LoaderCircle className="animate-spin h-10 w-10 text-primary" />
        <p className="text-primary font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
