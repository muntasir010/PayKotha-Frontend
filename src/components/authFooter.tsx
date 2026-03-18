import { Link } from "react-router";

export default function AuthFooter() {
  return (
    <div className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
      <Link to="/privacy" className="hover:underline">
        Privacy
      </Link>
      <Link to="/terms" className="hover:underline">
        Terms
      </Link>
      <Link to="/support" className="hover:underline">
        Support
      </Link>
    </div>
  );
}