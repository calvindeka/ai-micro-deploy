import { Activity, Zap, CheckCircle, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Requests",
      value: "12,847",
      change: "+12.3%",
      icon: Activity,
      color: "text-primary",
    },
    {
      title: "Avg Response Time",
      value: "142ms",
      change: "-8.1%",
      icon: Zap,
      color: "text-success",
    },
    {
      title: "Success Rate",
      value: "99.8%",
      change: "+0.2%",
      icon: CheckCircle,
      color: "text-success",
    },
    {
      title: "Active Models",
      value: "3",
      change: "Stable",
      icon: TrendingUp,
      color: "text-accent",
    },
  ];

  const recentPredictions = [
    { id: 1, type: "Image Classification", result: "Cat (98.5%)", status: "success", time: "2 min ago" },
    { id: 2, type: "Batch Processing", result: "45/50 completed", status: "processing", time: "5 min ago" },
    { id: 3, type: "Image Classification", result: "Dog (94.2%)", status: "success", time: "8 min ago" },
    { id: 4, type: "Single Prediction", result: "Bird (89.7%)", status: "success", time: "12 min ago" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Model Deployment Dashboard
        </h1>
        <p className="text-muted-foreground">Monitor your AI model performance and system health</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border/50 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.change.startsWith("+") || stat.change.startsWith("-") ? "text-success" : ""}>
                  {stat.change}
                </span>{" "}
                from last hour
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Real-time monitoring of system components</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>API Server</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Healthy
                </Badge>
              </div>
              <Progress value={98} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Model Service</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Healthy
                </Badge>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Batch Processor</span>
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  Active
                </Badge>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Database</span>
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  Healthy
                </Badge>
              </div>
              <Progress value={92} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Recent Predictions</CardTitle>
            <CardDescription>Latest model inference requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPredictions.map((pred) => (
                <div key={pred.id} className="flex items-center justify-between pb-4 border-b border-border/50 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{pred.type}</p>
                    <p className="text-xs text-muted-foreground">{pred.result}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge
                      variant="outline"
                      className={
                        pred.status === "success"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-primary/10 text-primary border-primary/20"
                      }
                    >
                      {pred.status}
                    </Badge>
                    <p className="text-xs text-muted-foreground">{pred.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
