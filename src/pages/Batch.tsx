import { useState } from "react";
import { Upload, Loader2, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Batch = () => {
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<any[]>([]);
  const { toast } = useToast();

  const handleBatchProcess = async () => {
    setProcessing(true);
    setProgress(0);
    setResults([]);

    // Simulate batch processing
    const mockItems = 10;
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setProcessing(false);
          
          // Generate mock results
          const mockResults = Array.from({ length: mockItems }, (_, i) => ({
            id: i + 1,
            filename: `image_${i + 1}.jpg`,
            class: ["Cat", "Dog", "Bird", "Tiger", "Horse"][Math.floor(Math.random() * 5)],
            confidence: Math.random() * 30 + 70,
            status: Math.random() > 0.1 ? "success" : "error",
            inference_time: Math.random() * 200 + 50,
          }));
          
          setResults(mockResults);
          
          toast({
            title: "Batch Processing Complete",
            description: `Processed ${mockResults.filter(r => r.status === "success").length}/${mockItems} images successfully`,
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Batch Processing
        </h1>
        <p className="text-muted-foreground">Process multiple images in parallel for efficient inference</p>
      </div>

      <Card className="border-border/50">
        <CardHeader>
          <CardTitle>Upload Batch</CardTitle>
          <CardDescription>Select multiple images for batch processing (up to 50 images)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">Multiple PNG, JPG files up to 100MB total</p>
          </div>

          {processing && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Processing batch...</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3" />
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing images in parallel</span>
              </div>
            </div>
          )}

          <Button
            onClick={handleBatchProcess}
            disabled={processing}
            className="w-full bg-gradient-to-r from-primary to-accent hover:opacity-90"
            size="lg"
          >
            {processing ? "Processing..." : "Start Batch Processing"}
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Batch Results</CardTitle>
            <CardDescription>
              {results.filter(r => r.status === "success").length} successful, {results.filter(r => r.status === "error").length} failed
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    {result.status === "success" ? (
                      <CheckCircle className="h-5 w-5 text-success" />
                    ) : (
                      <XCircle className="h-5 w-5 text-destructive" />
                    )}
                    <div>
                      <p className="text-sm font-medium">{result.filename}</p>
                      <p className="text-xs text-muted-foreground">
                        {result.status === "success" 
                          ? `${result.class} (${result.confidence.toFixed(1)}%)`
                          : "Processing failed"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {result.inference_time.toFixed(0)}ms
                    </Badge>
                    <Badge
                      variant="outline"
                      className={
                        result.status === "success"
                          ? "bg-success/10 text-success border-success/20"
                          : "bg-destructive/10 text-destructive border-destructive/20"
                      }
                    >
                      {result.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Batch;
