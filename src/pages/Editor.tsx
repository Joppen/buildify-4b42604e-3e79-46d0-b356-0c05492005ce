
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Project } from '@/types';

const Editor = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [project, setProject] = useState<Partial<Project>>({
    name: '',
    description: '',
    content: {},
    published: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('design');
  const [aiPrompt, setAiPrompt] = useState('');
  const [generatingContent, setGeneratingContent] = useState(false);

  useEffect(() => {
    // In a real implementation, we would fetch the project from Supabase
    setProject({
      id,
      name: 'My New Website',
      description: 'A website created with Buildify',
      template: 'blog',
      content: {
        title: 'Welcome to my website',
        sections: [
          {
            type: 'hero',
            heading: 'Welcome to my website',
            subheading: 'This is a website created with Buildify',
            buttonText: 'Learn More',
            buttonLink: '#'
          },
          {
            type: 'text',
            content: 'This is a sample text section. You can edit this content in the editor.'
          }
        ]
      },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published: false
    });
    setLoading(false);
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real implementation, we would save to Supabase
      setTimeout(() => {
        toast({
          title: "Project saved",
          description: "Your changes have been saved successfully.",
        });
        setSaving(false);
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Error saving project",
        description: error.message || "An error occurred while saving your project.",
        variant: "destructive",
      });
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    try {
      // In a real implementation, we would publish to Supabase
      setProject({ ...project, published: true });
      toast({
        title: "Project published",
        description: "Your website is now live.",
      });
    } catch (error: any) {
      toast({
        title: "Error publishing project",
        description: error.message || "An error occurred while publishing your project.",
        variant: "destructive",
      });
    }
  };

  const handlePreview = () => {
    navigate(`/preview/${id}`);
  };

  const handleGenerateContent = async () => {
    if (!aiPrompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a description of what you want to generate.",
        variant: "destructive",
      });
      return;
    }

    setGeneratingContent(true);
    try {
      // In a real implementation, we would call the Supabase edge function
      setTimeout(() => {
        // Mock response
        const newContent = {
          ...project.content,
          sections: [
            ...(project.content as any).sections,
            {
              type: 'text',
              content: `Generated content based on: "${aiPrompt}"`
            }
          ]
        };
        
        setProject({ ...project, content: newContent });
        setAiPrompt('');
        
        toast({
          title: "Content generated",
          description: "AI-generated content has been added to your website.",
        });
        setGeneratingContent(false);
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Error generating content",
        description: error.message || "An error occurred while generating content.",
        variant: "destructive",
      });
      setGeneratingContent(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading editor...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 border-r border-gray-200 p-4 flex flex-col">
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">{project.name}</h2>
          <p className="text-sm text-gray-500">{project.description}</p>
        </div>
        
        <div className="space-y-2 mb-6">
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? 'Saving...' : 'Save'}
          </Button>
          <Button onClick={handlePreview} variant="outline" className="w-full">
            Preview
          </Button>
          <Button 
            onClick={handlePublish} 
            variant="outline" 
            className={`w-full ${project.published ? 'bg-green-100 text-green-800' : ''}`}
          >
            {project.published ? 'Published' : 'Publish'}
          </Button>
        </div>
        
        <div className="flex-grow">
          <h3 className="font-medium mb-2">Components</h3>
          <div className="space-y-2">
            <div className="p-2 bg-white rounded border border-gray-200 cursor-pointer hover:bg-blue-50">
              Header
            </div>
            <div className="p-2 bg-white rounded border border-gray-200 cursor-pointer hover:bg-blue-50">
              Hero Section
            </div>
            <div className="p-2 bg-white rounded border border-gray-200 cursor-pointer hover:bg-blue-50">
              Text Block
            </div>
            <div className="p-2 bg-white rounded border border-gray-200 cursor-pointer hover:bg-blue-50">
              Image Gallery
            </div>
            <div className="p-2 bg-white rounded border border-gray-200 cursor-pointer hover:bg-blue-50">
              Contact Form
            </div>
            <div className="p-2 bg-white rounded border border-gray-200 cursor-pointer hover:bg-blue-50">
              Footer
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-14 border-b border-gray-200 flex items-center px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        {/* Editor Area */}
        <div className="flex-1 overflow-auto p-4">
          <TabsContent value="design" className="h-full">
            <div className="bg-white border border-gray-200 rounded-lg h-full p-4">
              <div className="text-center p-10 text-gray-500">
                Drag and drop components from the sidebar to build your website.
              </div>
              
              {/* Preview of the website structure */}
              <div className="border border-gray-300 rounded-lg p-4 mb-4">
                <div className="bg-gray-100 p-4 mb-4 rounded">Header</div>
                <div className="bg-gray-100 p-8 mb-4 rounded text-center">
                  <h2 className="text-2xl font-bold">{(project.content as any)?.title || 'Welcome to my website'}</h2>
                  <p className="mt-2">This is a hero section. You can edit this content.</p>
                </div>
                <div className="bg-gray-100 p-4 mb-4 rounded">
                  <p>This is a text section. You can edit this content in the editor.</p>
                </div>
                <div className="bg-gray-100 p-4 rounded">Footer</div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="content" className="h-full">
            <div className="space-y-6">
              <div>
                <Label htmlFor="title">Website Title</Label>
                <Input 
                  id="title" 
                  value={(project.content as any)?.title || ''} 
                  onChange={(e) => setProject({
                    ...project,
                    content: { ...(project.content as any), title: e.target.value }
                  })}
                />
              </div>
              
              <div>
                <Label htmlFor="heroHeading">Hero Heading</Label>
                <Input 
                  id="heroHeading" 
                  value={(project.content as any)?.sections?.[0]?.heading || ''} 
                  onChange={(e) => {
                    const newSections = [...((project.content as any)?.sections || [])];
                    if (newSections[0]) {
                      newSections[0] = { ...newSections[0], heading: e.target.value };
                    }
                    setProject({
                      ...project,
                      content: { ...(project.content as any), sections: newSections }
                    });
                  }}
                />
              </div>
              
              <div>
                <Label htmlFor="heroSubheading">Hero Subheading</Label>
                <Input 
                  id="heroSubheading" 
                  value={(project.content as any)?.sections?.[0]?.subheading || ''} 
                  onChange={(e) => {
                    const newSections = [...((project.content as any)?.sections || [])];
                    if (newSections[0]) {
                      newSections[0] = { ...newSections[0], subheading: e.target.value };
                    }
                    setProject({
                      ...project,
                      content: { ...(project.content as any), sections: newSections }
                    });
                  }}
                />
              </div>
              
              <div>
                <Label htmlFor="textContent">Text Content</Label>
                <Textarea 
                  id="textContent" 
                  rows={6}
                  value={(project.content as any)?.sections?.[1]?.content || ''} 
                  onChange={(e) => {
                    const newSections = [...((project.content as any)?.sections || [])];
                    if (newSections[1]) {
                      newSections[1] = { ...newSections[1], content: e.target.value };
                    }
                    setProject({
                      ...project,
                      content: { ...(project.content as any), sections: newSections }
                    });
                  }}
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="h-full">
            <div className="space-y-6">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input 
                  id="projectName" 
                  value={project.name || ''} 
                  onChange={(e) => setProject({ ...project, name: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="projectDescription">Project Description</Label>
                <Textarea 
                  id="projectDescription" 
                  value={project.description || ''} 
                  onChange={(e) => setProject({ ...project, description: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="template">Template</Label>
                <Input id="template" value={project.template || ''} disabled />
              </div>
              
              <div>
                <Button variant="destructive">Delete Project</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="ai" className="h-full">
            <div className="space-y-6">
              <div>
                <Label htmlFor="aiPrompt">Describe what you want to generate</Label>
                <Textarea 
                  id="aiPrompt" 
                  rows={6}
                  placeholder="E.g., Generate a product description for a new smartphone with advanced camera features and long battery life."
                  value={aiPrompt} 
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleGenerateContent} 
                disabled={generatingContent || !aiPrompt.trim()}
              >
                {generatingContent ? 'Generating...' : 'Generate Content'}
              </Button>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium mb-2">AI Assistant Tips</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  <li>Be specific about what you want to generate</li>
                  <li>Mention the tone (professional, casual, friendly)</li>
                  <li>Specify the target audience</li>
                  <li>Include key points you want to highlight</li>
                  <li>Mention any specific calls-to-action</li>
                </ul>
              </div>
            </div>
          </TabsContent>
        </div>
      </div>
    </div>
  );
};

export default Editor;