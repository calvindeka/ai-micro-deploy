import { useState } from "react";
import { Upload, Image as ImageIcon, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Predict = () => {
  const [predicting, setPredicting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { toast } = useToast();

  const handlePredict = async () => {
    setPredicting(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockResults = [
        { class: "Cat", confidence: 98.5 },
        { class: "Dog", confidence: 94.2 },
        { class: "Bird", confidence: 89.7 },
        { class: "Tiger", confidence: 87.3 },
        { class: "Horse", confidence: 76.1 },
      ];
      
      setResult({
        prediction: mockResults[Math.floor(Math.random() * mockResults.length)],
        inference_time: Math.random() * 200 + 50,
        model_version: "v1.2.3",
        timestamp: new Date().toISOString(),
      });
      
      setPredicting(false);
      toast({
        title: "Prediction Complete",
        description: "Model inference completed successfully",
      });
    }, 2000);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Test Predictions
        </h1>
        <p className="text-muted-foreground">Upload an image and get real-time predictions</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Select an image file for classification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
              <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Model Version</label>
              <select className="w-full px-3 py-2 border border-border rounded-md bg-background">
                <option>v1.2.3 (Production)</option>
                <option>v1.2.2</option>
                <option>v1.1.0</option>
              </select>
            </div>

            <Button 
              onClick={handlePredict} 
              disabled={predicting}
              className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            >
              {predicting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Run Prediction
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Prediction Results</CardTitle>
            <CardDescription>Model inference output and metadata</CardDescription>
          </CardHeader>
          <CardContent>
            {result ? (
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Top Prediction</p>
                  <p className="text-2xl font-bold">{result.prediction.class}</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Confidence: {result.prediction.confidence.toFixed(1)}%
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Inference Time</span>
                    <Badge variant="outline">{result.inference_time.toFixed(0)}ms</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Model Version</span>
                    <Badge variant="outline">{result.model_version}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Timestamp</span>
                    <Badge variant="outline">{new Date(result.timestamp).toLocaleTimeString()}</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-medium mb-2">Response JSON</p>
                  <pre className="text-xs bg-muted p-3 rounded-md overflow-auto max-h-40">
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No predictions yet</p>
                <p className="text-xs mt-1">Upload an image to get started</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Predict;
