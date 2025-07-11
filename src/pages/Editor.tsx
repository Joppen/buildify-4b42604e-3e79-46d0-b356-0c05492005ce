
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Project } from '@/types';

// Component types
const componentTypes = {
  HEADER: 'header',
  HERO: 'hero',
  TEXT: 'text',
  IMAGE: 'image',
  GALLERY: 'gallery',
  CONTACT: 'contact',
  FOOTER: 'footer',
  PRODUCTS: 'products',
  PRICING: 'pricing',
  FEATURES: 'features',
  TESTIMONIALS: 'testimonials',
  FAQ: 'faq',
  CTA: 'cta',
  FORUM_SECTION: 'forum_section',
  BLOG_POST: 'blog_post',
  PORTFOLIO_ITEM: 'portfolio_item',
  DOCUMENTATION_SECTION: 'documentation_section'
};

// Draggable component
const DraggableComponent = ({ type, name, disabled = false, onDragStart }) => {
  return (
    <div
      draggable={!disabled}
      onDragStart={(e) => {
        if (!disabled) {
          e.dataTransfer.setData('componentType', type);
          onDragStart();
        }
      }}
      className={`p-2 bg-white rounded border border-gray-200 cursor-pointer hover:bg-blue-50 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {name}
    </div>
  );
};

// Droppable area
const DroppableArea = ({ onDrop, children, sections }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };
  
  const handleDragLeave = () => {
    setIsDragOver(false);
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const componentType = e.dataTransfer.getData('componentType');
    if (componentType) {
      onDrop(componentType);
    }
  };

  return (
    <div 
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`border border-gray-300 rounded-lg p-4 mb-4 min-h-[400px] ${isDragOver ? 'bg-blue-50 border-blue-300' : 'bg-white'}`}
    >
      {sections && sections.length > 0 ? (
        sections.map((section, index) => (
          <div key={index} className="bg-gray-100 p-4 mb-4 rounded relative">
            <div className="absolute top-2 right-2 flex space-x-1">
              <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
              <button className="text-xs bg-red-500 text-white px-2 py-1 rounded">×</button>
            </div>
            {section.type === 'header' && (
              <div className="flex justify-between items-center">
                <h3 className="font-bold">Logo</h3>
                <nav>
                  <ul className="flex space-x-4">
                    <li>Home</li>
                    <li>About</li>
                    <li>Services</li>
                    <li>Contact</li>
                  </ul>
                </nav>
              </div>
            )}
            {section.type === 'hero' && (
              <div className="p-8 text-center">
                <h2 className="text-2xl font-bold">{section.heading || 'Welcome to my website'}</h2>
                <p className="mt-2">{section.subheading || 'This is a hero section'}</p>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">{section.buttonText || 'Learn More'}</button>
              </div>
            )}
            {section.type === 'text' && (
              <div>
                <p>{section.content || 'This is a text section'}</p>
              </div>
            )}
            {section.type === 'image' && (
              <div className="text-center">
                <div className="bg-gray-200 h-40 flex items-center justify-center">
                  <span className="text-gray-500">Image Placeholder</span>
                </div>
                {section.caption && <p className="mt-2 text-sm text-gray-500">{section.caption}</p>}
              </div>
            )}
            {section.type === 'gallery' && (
              <div>
                <h3 className="font-bold mb-2">Image Gallery</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((item) => (
                    <div key={item} className="bg-gray-200 h-20 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">Image {item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {section.type === 'contact' && (
              <div>
                <h3 className="font-bold mb-2">Contact Form</h3>
                <div className="space-y-2">
                  <div className="bg-gray-200 h-8 w-full rounded"></div>
                  <div className="bg-gray-200 h-8 w-full rounded"></div>
                  <div className="bg-gray-200 h-24 w-full rounded"></div>
                  <div className="bg-gray-200 h-8 w-32 rounded"></div>
                </div>
              </div>
            )}
            {section.type === 'footer' && (
              <div className="flex justify-between">
                <div>
                  <h3 className="font-bold">Website Name</h3>
                  <p className="text-sm">© 2025 All rights reserved</p>
                </div>
                <div>
                  <ul className="flex space-x-4 text-sm">
                    <li>Privacy</li>
                    <li>Terms</li>
                    <li>Contact</li>
                  </ul>
                </div>
              </div>
            )}
            {section.type === 'products' && (
              <div>
                <h3 className="font-bold mb-2">Products</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border p-2 rounded">
                      <div className="bg-gray-200 h-24 mb-2"></div>
                      <h4 className="font-medium">Product {item}</h4>
                      <p className="text-sm text-gray-500">$99.99</p>
                      <button className="mt-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">Add to Cart</button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {section.type === 'forum_section' && (
              <div>
                <h3 className="font-bold mb-2">Forum Discussions</h3>
                <div className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border p-2 rounded flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">Discussion Topic {item}</h4>
                        <p className="text-xs text-gray-500">Started by User123 • 5 replies</p>
                      </div>
                      <span className="text-xs bg-gray-200 px-2 py-1 rounded">2h ago</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {section.type === 'blog_post' && (
              <div>
                <h3 className="font-bold">Blog Post Title</h3>
                <p className="text-xs text-gray-500 mb-2">Posted on July 10, 2025 by Author</p>
                <div className="bg-gray-200 h-40 mb-2"></div>
                <p className="text-sm">This is a preview of the blog post content. Click to edit and add more details to your post.</p>
                <div className="mt-2 flex items-center text-xs text-gray-500">
                  <span className="mr-4">Categories: Technology, Design</span>
                  <span>Comments: 5</span>
                </div>
              </div>
            )}
            {section.type === 'portfolio_item' && (
              <div>
                <div className="bg-gray-200 h-40 mb-2"></div>
                <h3 className="font-bold">Project Title</h3>
                <p className="text-sm mb-2">This is a description of the portfolio project. Click to edit and add more details.</p>
                <div className="flex space-x-2 text-xs">
                  <span className="bg-gray-200 px-2 py-1 rounded">Web Design</span>
                  <span className="bg-gray-200 px-2 py-1 rounded">UI/UX</span>
                  <span className="bg-gray-200 px-2 py-1 rounded">Development</span>
                </div>
              </div>
            )}
            {section.type === 'documentation_section' && (
              <div>
                <h3 className="font-bold mb-2">Documentation</h3>
                <div className="flex">
                  <div className="w-1/4 border-r pr-2">
                    <ul className="text-sm space-y-1">
                      <li className="font-medium">Getting Started</li>
                      <li>Installation</li>
                      <li>Configuration</li>
                      <li>Usage</li>
                    </ul>
                  </div>
                  <div className="w-3/4 pl-4">
                    <h4 className="font-medium mb-2">Getting Started</h4>
                    <p className="text-sm">This is the documentation content. You can add code examples, instructions, and more details here.</p>
                    <div className="mt-2 bg-gray-800 text-gray-200 p-2 rounded text-xs">
                      <code>npm install your-package</code>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center p-10 text-gray-500">
          {children}
        </div>
      )}
    </div>
  );
};

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
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    // In a real implementation, we would fetch the project from Supabase
    const fetchProject = async () => {
      try {
        // Mock data based on template type
        const urlParams = new URLSearchParams(window.location.search);
        const template = urlParams.get('template') || 'landing';
        
        let templateSections = [];
        
        switch(template) {
          case 'blog':
            templateSections = [
              { type: 'header' },
              { type: 'hero', heading: 'My Blog', subheading: 'Thoughts, stories and ideas' },
              { type: 'blog_post' },
              { type: 'blog_post' },
              { type: 'footer' }
            ];
            break;
          case 'ecommerce':
            templateSections = [
              { type: 'header' },
              { type: 'hero', heading: 'Shop Now', subheading: 'Discover our products' },
              { type: 'products' },
              { type: 'text', content: 'Free shipping on all orders over $50' },
              { type: 'footer' }
            ];
            break;
          case 'portfolio':
            templateSections = [
              { type: 'header' },
              { type: 'hero', heading: 'My Portfolio', subheading: 'Check out my work' },
              { type: 'portfolio_item' },
              { type: 'portfolio_item' },
              { type: 'contact' },
              { type: 'footer' }
            ];
            break;
          case 'social':
            templateSections = [
              { type: 'header' },
              { type: 'hero', heading: 'Join Our Community', subheading: 'Connect with like-minded people' },
              { type: 'forum_section' },
              { type: 'text', content: 'Join the conversation and share your thoughts' },
              { type: 'footer' }
            ];
            break;
          case 'content':
            templateSections = [
              { type: 'header' },
              { type: 'hero', heading: 'Documentation', subheading: 'Learn how to use our product' },
              { type: 'documentation_section' },
              { type: 'footer' }
            ];
            break;
          default:
            templateSections = [
              { type: 'header' },
              { type: 'hero', heading: 'Welcome to my website', subheading: 'This is a website created with Buildify' },
              { type: 'text', content: 'This is a sample text section. You can edit this content in the editor.' },
              { type: 'footer' }
            ];
        }
        
        setProject({
          id,
          name: `My ${template.charAt(0).toUpperCase() + template.slice(1)} Website`,
          description: `A ${template} website created with Buildify`,
          template,
          content: {
            title: `My ${template.charAt(0).toUpperCase() + template.slice(1)} Website`,
            sections: templateSections
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published: false
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        toast({
          title: "Error loading project",
          description: "Could not load the project. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };

    fetchProject();
  }, [id, toast]);

  const handleAddComponent = (componentType) => {
    const newSection = { type: componentType };
    
    // Add specific properties based on component type
    if (componentType === 'hero') {
      newSection.heading = 'New Hero Section';
      newSection.subheading = 'Add your subheading here';
      newSection.buttonText = 'Click Me';
    } else if (componentType === 'text') {
      newSection.content = 'Add your text content here';
    }
    
    const newSections = [...((project.content as any)?.sections || []), newSection];
    
    setProject({
      ...project,
      content: { ...(project.content as any), sections: newSections }
    });
    
    toast({
      title: "Component added",
      description: `Added a new ${componentType} component to your page.`,
    });
  };

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

  // Get available components based on template
  const getAvailableComponents = () => {
    const template = project.template || 'landing';
    const baseComponents = [
      { type: componentTypes.HEADER, name: 'Header' },
      { type: componentTypes.HERO, name: 'Hero Section' },
      { type: componentTypes.TEXT, name: 'Text Block' },
      { type: componentTypes.IMAGE, name: 'Image' },
      { type: componentTypes.GALLERY, name: 'Image Gallery' },
      { type: componentTypes.CONTACT, name: 'Contact Form' },
      { type: componentTypes.FOOTER, name: 'Footer' },
    ];
    
    // Add template-specific components
    switch(template) {
      case 'ecommerce':
        return [
          ...baseComponents,
          { type: componentTypes.PRODUCTS, name: 'Products Grid' },
          { type: componentTypes.PRICING, name: 'Pricing Table' },
        ];
      case 'blog':
        return [
          ...baseComponents,
          { type: componentTypes.BLOG_POST, name: 'Blog Post' },
        ];
      case 'portfolio':
        return [
          ...baseComponents,
          { type: componentTypes.PORTFOLIO_ITEM, name: 'Portfolio Item' },
        ];
      case 'social':
        return [
          ...baseComponents,
          { type: componentTypes.FORUM_SECTION, name: 'Forum Section' },
        ];
      case 'content':
        return [
          ...baseComponents,
          { type: componentTypes.DOCUMENTATION_SECTION, name: 'Documentation' },
        ];
      default:
        return [
          ...baseComponents,
          { type: componentTypes.FEATURES, name: 'Features' },
          { type: componentTypes.TESTIMONIALS, name: 'Testimonials' },
          { type: componentTypes.FAQ, name: 'FAQ' },
          { type: componentTypes.CTA, name: 'Call to Action' },
        ];
    }
  };

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
            {getAvailableComponents().map((component) => (
              <DraggableComponent 
                key={component.type} 
                type={component.type} 
                name={component.name}
                onDragStart={() => setIsDragging(true)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
          {/* Tabs Navigation */}
          <div className="h-14 border-b border-gray-200 flex items-center px-4">
            <TabsList>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="ai">AI Assistant</TabsTrigger>
            </TabsList>
          </div>
          
          {/* Tabs Content */}
          <div className="flex-1 overflow-auto p-4">
            <TabsContent value="design" className="h-full">
              <div className="bg-white border border-gray-200 rounded-lg h-full p-4">
                <DroppableArea 
                  onDrop={handleAddComponent}
                  sections={(project.content as any)?.sections}
                >
                  Drag and drop components from the sidebar to build your website.
                </DroppableArea>
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
                
                {(project.content as any)?.sections?.map((section, index) => (
                  <div key={index} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium capitalize">{section.type} Section</h3>
                      <Button variant="destructive" size="sm">Remove</Button>
                    </div>
                    
                    {section.type === 'hero' && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor={`heading-${index}`}>Heading</Label>
                          <Input 
                            id={`heading-${index}`} 
                            value={section.heading || ''} 
                            onChange={(e) => {
                              const newSections = [...((project.content as any)?.sections)];
                              newSections[index] = { ...newSections[index], heading: e.target.value };
                              setProject({
                                ...project,
                                content: { ...(project.content as any), sections: newSections }
                              });
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`subheading-${index}`}>Subheading</Label>
                          <Input 
                            id={`subheading-${index}`} 
                            value={section.subheading || ''} 
                            onChange={(e) => {
                              const newSections = [...((project.content as any)?.sections)];
                              newSections[index] = { ...newSections[index], subheading: e.target.value };
                              setProject({
                                ...project,
                                content: { ...(project.content as any), sections: newSections }
                              });
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`buttonText-${index}`}>Button Text</Label>
                          <Input 
                            id={`buttonText-${index}`} 
                            value={section.buttonText || ''} 
                            onChange={(e) => {
                              const newSections = [...((project.content as any)?.sections)];
                              newSections[index] = { ...newSections[index], buttonText: e.target.value };
                              setProject({
                                ...project,
                                content: { ...(project.content as any), sections: newSections }
                              });
                            }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {section.type === 'text' && (
                      <div>
                        <Label htmlFor={`content-${index}`}>Content</Label>
                        <Textarea 
                          id={`content-${index}`} 
                          rows={4}
                          value={section.content || ''} 
                          onChange={(e) => {
                            const newSections = [...((project.content as any)?.sections)];
                            newSections[index] = { ...newSections[index], content: e.target.value };
                            setProject({
                              ...project,
                              content: { ...(project.content as any), sections: newSections }
                            });
                          }}
                        />
                      </div>
                    )}
                    
                    {section.type === 'image' && (
                      <div className="space-y-4">
                        <div className="border-2 border-dashed border-gray-300 p-4 text-center rounded-lg">
                          <p className="text-gray-500 mb-2">Drag and drop an image here, or click to select</p>
                          <Button variant="outline" size="sm">Upload Image</Button>
                        </div>
                        <div>
                          <Label htmlFor={`caption-${index}`}>Caption (optional)</Label>
                          <Input 
                            id={`caption-${index}`} 
                            value={section.caption || ''} 
                            onChange={(e) => {
                              const newSections = [...((project.content as any)?.sections)];
                              newSections[index] = { ...newSections[index], caption: e.target.value };
                              setProject({
                                ...project,
                                content: { ...(project.content as any), sections: newSections }
                              });
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
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
                
                <div className="space-y-2">
                  <Label>Theme Colors</Label>
                  <div className="flex space-x-4">
                    <div>
                      <div className="w-10 h-10 rounded-full bg-blue-600 mb-1"></div>
                      <span className="text-xs">Primary</span>
                    </div>
                    <div>
                      <div className="w-10 h-10 rounded-full bg-gray-800 mb-1"></div>
                      <span className="text-xs">Secondary</span>
                    </div>
                    <div>
                      <div className="w-10 h-10 rounded-full bg-white border border-gray-300 mb-1"></div>
                      <span className="text-xs">Background</span>
                    </div>
                    <div>
                      <div className="w-10 h-10 rounded-full bg-gray-900 mb-1"></div>
                      <span className="text-xs">Text</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label>Font Settings</Label>
                  <div className="grid grid-cols-2 gap-4 mt-2">
                    <div>
                      <Label htmlFor="headingFont" className="text-xs">Heading Font</Label>
                      <select className="w-full border rounded p-2 text-sm">
                        <option>Inter</option>
                        <option>Roboto</option>
                        <option>Montserrat</option>
                        <option>Playfair Display</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="bodyFont" className="text-xs">Body Font</Label>
                      <select className="w-full border rounded p-2 text-sm">
                        <option>Inter</option>
                        <option>Roboto</option>
                        <option>Open Sans</option>
                        <option>Lato</option>
                      </select>
                    </div>
                  </div>
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
        </Tabs>
      </div>
    </div>
  );
};

export default Editor;

export default Editor;