import { Book, Code, Terminal } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Docs = () => {
  return (
    <div className="max-w-6xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          API Documentation
        </h1>
        <p className="text-muted-foreground">Complete guide to integrate with the model API</p>
      </div>

      <Tabs defaultValue="quickstart" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="quickstart">Quick Start</TabsTrigger>
          <TabsTrigger value="endpoints">Endpoints</TabsTrigger>
          <TabsTrigger value="client">Client SDK</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="quickstart" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Book className="h-5 w-5 text-primary" />
                <CardTitle>Getting Started</CardTitle>
              </div>
              <CardDescription>Quick introduction to the API</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Base URL</h3>
                <code className="block p-3 bg-muted rounded-md text-sm">
                  https://api.modeldeployment.com/v1
                </code>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Authentication</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Include your API key in the Authorization header:
                </p>
                <code className="block p-3 bg-muted rounded-md text-sm">
                  Authorization: Bearer YOUR_API_KEY
                </code>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Rate Limits</h3>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>100 requests per minute for single predictions</li>
                  <li>10 batch requests per minute</li>
                  <li>Maximum 50 images per batch</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="endpoints" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Terminal className="h-5 w-5 text-primary" />
                <CardTitle>POST /predict</CardTitle>
              </div>
              <CardDescription>Single image prediction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Request Body</h3>
                <pre className="p-3 bg-muted rounded-md text-sm overflow-auto">
{`{
  "image": "base64_encoded_image",
  "model_version": "v1.2.3"
}`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Response</h3>
                <pre className="p-3 bg-muted rounded-md text-sm overflow-auto">
{`{
  "prediction": {
    "class": "cat",
    "confidence": 0.985
  },
  "inference_time": 142,
  "model_version": "v1.2.3",
  "timestamp": "2024-01-15T10:30:00Z"
}`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Terminal className="h-5 w-5 text-primary" />
                <CardTitle>POST /batch-predict</CardTitle>
              </div>
              <CardDescription>Batch image prediction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Request Body</h3>
                <pre className="p-3 bg-muted rounded-md text-sm overflow-auto">
{`{
  "images": ["base64_image_1", "base64_image_2"],
  "model_version": "v1.2.3"
}`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Response</h3>
                <pre className="p-3 bg-muted rounded-md text-sm overflow-auto">
{`{
  "batch_id": "batch_123",
  "status": "processing",
  "results": [
    {
      "image_id": 0,
      "prediction": {"class": "cat", "confidence": 0.985},
      "status": "success"
    }
  ],
  "total_images": 2,
  "processed": 1
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="client" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Code className="h-5 w-5 text-primary" />
                <CardTitle>Python Client SDK</CardTitle>
              </div>
              <CardDescription>Official Python client for easy integration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Installation</h3>
                <code className="block p-3 bg-muted rounded-md text-sm">
                  pip install model-deployment-client
                </code>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Basic Usage</h3>
                <pre className="p-3 bg-muted rounded-md text-sm overflow-auto">
{`from model_client import ModelClient

client = ModelClient(api_key="YOUR_API_KEY")

# Single prediction
result = client.predict("path/to/image.jpg")
print(f"Class: {result.prediction.class}")
print(f"Confidence: {result.prediction.confidence}")

# Batch prediction
results = client.batch_predict([
    "image1.jpg",
    "image2.jpg",
    "image3.jpg"
])

for result in results:
    print(f"{result.filename}: {result.class}")`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>cURL Examples</CardTitle>
              <CardDescription>Ready-to-use command line examples</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Single Prediction</h3>
                <pre className="p-3 bg-muted rounded-md text-sm overflow-auto">
{`curl -X POST https://api.modeldeployment.com/v1/predict \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "image": "base64_encoded_image",
    "model_version": "v1.2.3"
  }'`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Health Check</h3>
                <pre className="p-3 bg-muted rounded-md text-sm overflow-auto">
{`curl https://api.modeldeployment.com/v1/health`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Python Requests Example</CardTitle>
              <CardDescription>Using the requests library</CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-3 bg-muted rounded-md text-sm overflow-auto">
{`import requests
import base64

# Read and encode image
with open("image.jpg", "rb") as f:
    image_data = base64.b64encode(f.read()).decode()

# Make prediction request
response = requests.post(
    "https://api.modeldeployment.com/v1/predict",
    headers={
        "Authorization": "Bearer YOUR_API_KEY",
        "Content-Type": "application/json"
    },
    json={
        "image": image_data,
        "model_version": "v1.2.3"
    }
)

result = response.json()
print(f"Prediction: {result['prediction']['class']}")
print(f"Confidence: {result['prediction']['confidence']}")`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Docs;
