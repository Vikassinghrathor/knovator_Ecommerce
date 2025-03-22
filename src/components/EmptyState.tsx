
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4 max-w-md mx-auto space-y-6">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
      
      <div className="space-y-2">
        <h2 className="text-xl font-medium">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      {action && (
        <Button asChild>
          <Link to={action.href}>{action.label}</Link>
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
