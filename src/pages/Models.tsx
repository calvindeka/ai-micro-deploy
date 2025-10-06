import { Box, Download, RefreshCw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Models = () => {
  const models = [
    {
      version: "v1.2.3",
      status: "production",
      accuracy: "94.2%",
      size: "245 MB",
      deployed: "2024-01-15",
      requests: "12.8K",
    },
    {
      version: "v1.2.2",
      status: "staging",
      accuracy: "93.8%",
      size: "242 MB",
      deployed: "2024-01-10",
      requests: "847",
    },
    {
      version: "v1.1.0",
      status: "archived",
      accuracy: "91.5%",
      size: "238 MB",
      deployed: "2023-12-20",
      requests: "8.2K",
    },
  ];

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Model Management
        </h1>
        <p className="text-muted-foreground">Manage model versions and deployment configurations</p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Models</CardTitle>
              <CardDescription>Currently deployed model versions</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-2 h-4 w-4" />
              Reload
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {models.map((model) => (
              <div
                key={model.version}
                className="p-6 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Box className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{model.version}</h3>
                      <p className="text-sm text-muted-foreground">
                        Deployed {new Date(model.deployed).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      model.status === "production"
                        ? "bg-success/10 text-success border-success/20"
                        : model.status === "staging"
                        ? "bg-primary/10 text-primary border-primary/20"
                        : "bg-muted text-muted-foreground"
                    }
                  >
                    {model.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                    <p className="text-sm font-semibold">{model.accuracy}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Model Size</p>
                    <p className="text-sm font-semibold">{model.size}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Total Requests</p>
                    <p className="text-sm font-semibold">{model.requests}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Framework</p>
                    <p className="text-sm font-semibold">PyTorch 2.0</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  {model.status === "production" ? (
                    <>
                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Hot Reload
                      </Button>
                      <Button variant="outline" size="sm">
                        View Logs
                      </Button>
                    </>
                  ) : model.status === "staging" ? (
                    <>
                      <Button size="sm" className="bg-gradient-to-r from-primary to-accent">
                        Promote to Production
                      </Button>
                      <Button variant="outline" size="sm">
                        View Logs
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Model Configuration</CardTitle>
            <CardDescription>Current production model settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Input Size</span>
              <code className="text-sm">224x224x3</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Batch Size</span>
              <code className="text-sm">32</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Number of Classes</span>
              <code className="text-sm">1000</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Preprocessing</span>
              <code className="text-sm">ImageNet Normalization</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Device</span>
              <Badge variant="outline">CUDA (GPU)</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Deployment Info</CardTitle>
            <CardDescription>Container and runtime details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Container</span>
              <code className="text-sm">pytorch/pytorch:2.0.0</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Port</span>
              <code className="text-sm">8000</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Workers</span>
              <code className="text-sm">4</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Max Requests</span>
              <code className="text-sm">1000/min</code>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Timeout</span>
              <code className="text-sm">30s</code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Models;
