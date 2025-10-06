import { Activity, Cpu, HardDrive, Network } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Metrics = () => {
  const systemMetrics = [
    { name: "CPU Usage", value: 45, icon: Cpu, color: "text-primary" },
    { name: "Memory Usage", value: 62, icon: HardDrive, color: "text-accent" },
    { name: "Network I/O", value: 38, icon: Network, color: "text-success" },
    { name: "Request Rate", value: 78, icon: Activity, color: "text-warning" },
  ];

  const performanceData = [
    { endpoint: "/predict", avgTime: "142ms", requests: "8,431", successRate: "99.9%" },
    { endpoint: "/batch-predict", avgTime: "2.3s", requests: "1,247", successRate: "99.5%" },
    { endpoint: "/health", avgTime: "8ms", requests: "24,891", successRate: "100%" },
    { endpoint: "/metrics", avgTime: "15ms", requests: "3,245", successRate: "100%" },
  ];

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Performance Metrics
        </h1>
        <p className="text-muted-foreground">Real-time system monitoring and performance analytics</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.name} className="border-border/50">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                <metric.icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">{metric.value}%</span>
                  <Badge variant="outline" className="text-xs">Normal</Badge>
                </div>
                <Progress value={metric.value} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>API Endpoint Performance</CardTitle>
          <CardDescription>Response times and success rates per endpoint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performanceData.map((data) => (
              <div key={data.endpoint} className="p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <code className="text-sm font-mono font-medium">{data.endpoint}</code>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    {data.successRate}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Avg Response Time</p>
                    <p className="font-semibold">{data.avgTime}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Requests</p>
                    <p className="font-semibold">{data.requests}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Model Performance</CardTitle>
            <CardDescription>Inference metrics and accuracy</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Average Inference Time</span>
              <Badge variant="outline">142ms</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">P95 Latency</span>
              <Badge variant="outline">287ms</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">P99 Latency</span>
              <Badge variant="outline">451ms</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Model Accuracy</span>
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                94.2%
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Cache Hit Rate</span>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                67.8%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
            <CardDescription>Container and infrastructure metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Container Memory</span>
                <span className="text-muted-foreground">2.4 GB / 4 GB</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Disk Usage</span>
                <span className="text-muted-foreground">15.2 GB / 50 GB</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span>Network Bandwidth</span>
                <span className="text-muted-foreground">142 MB/s</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="text-sm">Uptime</span>
                <Badge variant="outline">14d 7h 23m</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Metrics;
