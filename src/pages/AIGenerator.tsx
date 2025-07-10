
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const AIGenerator = () => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description of the website you want to generate.",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      // In a real implementation, we would call the Supabase edge function
      // to generate the website based on the prompt
      setTimeout(() => {
        // Mock response - create a new project ID
        const newProjectId = Math.random().toString(36).substring(2, 9);
        
        toast({
          title: "Website generated",
          description: "Your website has been generated successfully.",
        });
        
        // Navigate to the editor with the new project
        navigate(`/editor/${newProjectId}`);
      }, 3000);
    } catch (error: any) {
      toast({
        title: "Error generating website",
        description: error.message || "An error occurred while generating your website.",
        variant: "destructive",
      });
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">AI Website Generator</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Describe your website</CardTitle>
              <CardDescription>
                Tell us what kind of website you want to create, and our AI will generate it for you.
                Be as specific as possible about the purpose, style, and content of your website.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                placeholder="E.g., I need a professional portfolio website for a photographer with a dark theme, gallery section, about page, and contact form. The style should be minimalist with large image displays."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                rows={8}
                className="mb-4"
              />
              
              <div className="bg-blue-50 p-4 rounded-lg mb-4">
                <h3 className="font-medium mb-2 text-blue-800">Tips for better results:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-blue-700">
                  <li>Specify the type of website (blog, e-commerce, portfolio, etc.)</li>
                  <li>Describe the visual style you want (modern, minimalist, colorful, etc.)</li>
                  <li>List the main pages or sections you need</li>
                  <li>Mention any specific features (contact forms, galleries, etc.)</li>
                  <li>Specify your target audience</li>
                  <li>Include color preferences if you have any</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleGenerate} 
                disabled={generating || !prompt.trim()} 
                className="w-full"
              >
                {generating ? 'Generating your website...' : 'Generate Website'}
              </Button>
            </CardFooter>
          </Card>
          
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">How it works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">1</div>
                <h3 className="font-medium mb-2">Describe your website</h3>
                <p className="text-gray-600 text-sm">Tell our AI what kind of website you want to create.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">2</div>
                <h3 className="font-medium mb-2">AI generates your website</h3>
                <p className="text-gray-600 text-sm">Our AI creates a custom website based on your description.</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-3xl font-bold text-blue-600 mb-2">3</div>
                <h3 className="font-medium mb-2">Customize and publish</h3>
                <p className="text-gray-600 text-sm">Fine-tune your website in the editor and publish it.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AIGenerator;