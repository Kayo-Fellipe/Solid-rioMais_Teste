
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DivideIcon as LucideIcon } from "lucide-react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  className?: string;
}

const DashboardCard = ({ title, value, icon: Icon, description, className }: DashboardCardProps) => {
  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className={`text-sm font-medium ${className?.includes('text-white') ? 'text-white' : ''}`}>{title}</CardTitle>
        <Icon className={`h-5 w-5 ${className?.includes('text-white') ? 'text-white' : 'text-muted-foreground'}`} />
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${className?.includes('text-white') ? 'text-white' : ''}`}>{value}</div>
        {description && (
          <p className={`text-xs ${className?.includes('text-white') ? 'text-white/80' : 'text-muted-foreground'}`}>{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
