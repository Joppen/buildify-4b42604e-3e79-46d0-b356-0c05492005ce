
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Template } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const templates: Template[] = [
  {
    id: '1',
    name: 'Blog',
    description: 'Perfect for personal or company blogs',
    category: 'content',
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    components: []
  },
  {
    id: '2',
    name: 'E-commerce',
    description: 'Online store with product listings and cart',
    category: 'business',
    thumbnail: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
    components: []
  },
  {
    id: '3',
    name: 'Portfolio',
    description: 'Showcase your work and skills',
    category: 'personal',
    thumbnail: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b',
    components: []
  },
  {
    id: '4',
    name: 'Landing Page',
    description: 'Promote your product or service',
    category: 'business',
    thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    components: []
  },
  {
    id: '5',
    name: 'Community Forum',
    description: 'Build a community around your brand',
    category: 'social',
    thumbnail: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
    components: []
  },
  {
    id: '6',
    name: 'Documentation',
    description: 'Create documentation for your product',
    category: 'content',
    thumbnail: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06',
    components: []
  }
];

// Template preview images
const templatePreviews = {
  blog: '/src/assets/skärmbild_11-7-2025_73224_be14c8b0-fe74-40.jpeg',
  ecommerce: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc',
  portfolio: 'https://images.unsplash.com/photo-1545239351-ef35f43d514b',
  landing: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
  social: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac',
  content: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06'
};

const Templates = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const navigate = useNavigate();
  const { toast } = useToast();

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = category === 'all' || template.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleSelectTemplate = (template: Template) => {
    // Map template names to template types for the URL
    const templateTypeMap = {
      'Blog': 'blog',
      'E-commerce': 'ecommerce',
      'Portfolio': 'portfolio',
      'Landing Page': 'landing',
      'Community Forum': 'social',
      'Documentation': 'content'
    };
    
    const templateType = templateTypeMap[template.name] || 'landing';
    
    toast({
      title: "Template selected",
      description: `You selected the ${template.name} template.`,
    });
    
    // Mock project creation with template type in query params
    const newProjectId = Math.random().toString(36).substring(2, 9);
    navigate(`/editor/${newProjectId}?template=${templateType}`);
  };

  const handleAIGeneration = () => {
    navigate('/ai-generator');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Choose a Template</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Select a template to get started or use our AI to generate a custom website based on your description.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/3">
            <Input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="w-full md:w-2/3">
            <Tabs defaultValue="all" value={category} onValueChange={setCategory} className="w-full">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="business">Business</TabsTrigger>
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>
              {/* Add hidden TabsContent components to satisfy the requirement */}
              <TabsContent value="all" className="hidden"></TabsContent>
              <TabsContent value="business" className="hidden"></TabsContent>
              <TabsContent value="personal" className="hidden"></TabsContent>
              <TabsContent value="content" className="hidden"></TabsContent>
              <TabsContent value="social" className="hidden"></TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="mb-10">
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle>AI Website Generator</CardTitle>
              <CardDescription className="text-blue-100">
                Describe your website and let our AI build it for you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>Just tell us what kind of website you want, and our AI will generate it based on your description.</p>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleAIGeneration}
                variant="secondary"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Try AI Generator
              </Button>
            </CardFooter>
          </Card>
        </div>

        {filteredTemplates.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={template.thumbnail} 
                    alt={template.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500 mb-4">
                    {template.name === 'Blog' && (
                      <p>Includes blog posts, categories, author profiles, and comments.</p>
                    )}
                    {template.name === 'E-commerce' && (
                      <p>Includes product listings, shopping cart, checkout, and order management.</p>
                    )}
                    {template.name === 'Portfolio' && (
                      <p>Includes project showcases, skills section, about page, and contact form.</p>
                    )}
                    {template.name === 'Landing Page' && (
                      <p>Includes hero section, features, testimonials, pricing, and call-to-action.</p>
                    )}
                    {template.name === 'Community Forum' && (
                      <p>Includes discussion boards, user profiles, notifications, and search.</p>
                    )}
                    {template.name === 'Documentation' && (
                      <p>Includes searchable docs, code examples, navigation, and versioning.</p>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {template.name === 'Blog' && (
                      <>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Posts</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Categories</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Comments</span>
                      </>
                    )}
                    {template.name === 'E-commerce' && (
                      <>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Products</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Cart</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Checkout</span>
                      </>
                    )}
                    {template.name === 'Portfolio' && (
                      <>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Projects</span>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Skills</span>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">Contact</span>
                      </>
                    )}
                    {template.name === 'Landing Page' && (
                      <>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Hero</span>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Features</span>
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">CTA</span>
                      </>
                    )}
                    {template.name === 'Community Forum' && (
                      <>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Discussions</span>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Profiles</span>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Search</span>
                      </>
                    )}
                    {template.name === 'Documentation' && (
                      <>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Docs</span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Code</span>
                        <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">Search</span>
                      </>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleSelectTemplate(template)}
                    className="w-full"
                  >
                    Use this template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">No templates found</h3>
            <p className="text-gray-500 mt-2">Try a different search term or category</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Templates;