
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Project } from '@/types';

const Preview = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [project, setProject] = useState<Partial<Project> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, we would fetch the project from Supabase
    setTimeout(() => {
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
    }, 500);
  }, [id]);

  const handlePublish = async () => {
    try {
      // In a real implementation, we would publish to Supabase
      setProject(project ? { ...project, published: true } : null);
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

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading preview...</div>;
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Project not found</h1>
          <p className="text-gray-500 mb-4">The project you're looking for doesn't exist or you don't have access to it.</p>
          <Link to="/projects">
            <Button>Back to Projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Preview Controls */}
      <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-medium">{project.name}</h1>
          <p className="text-sm text-gray-400">Preview Mode</p>
        </div>
        <div className="flex space-x-4">
          <Link to={`/editor/${id}`}>
            <Button variant="outline" className="text-white border-white hover:bg-gray-800">
              Back to Editor
            </Button>
          </Link>
          <Button 
            onClick={handlePublish}
            className={project.published ? 'bg-green-600 hover:bg-green-700' : ''}
          >
            {project.published ? 'Published' : 'Publish Website'}
          </Button>
        </div>
      </div>
      
      {/* Preview Content */}
      <div className="flex-grow bg-gray-100">
        <div className="max-w-5xl mx-auto bg-white min-h-screen shadow-lg">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">{(project.content as any)?.title || 'Website Title'}</h1>
              <nav>
                <ul className="flex space-x-6">
                  <li><a href="#" className="text-blue-600 hover:text-blue-800">Home</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-800">About</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-800">Services</a></li>
                  <li><a href="#" className="text-gray-600 hover:text-gray-800">Contact</a></li>
                </ul>
              </nav>
            </div>
          </header>
          
          {/* Hero Section */}
          <section className="bg-blue-50 py-16 px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              {(project.content as any)?.sections?.[0]?.heading || 'Welcome to my website'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {(project.content as any)?.sections?.[0]?.subheading || 'This is a website created with Buildify'}
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              {(project.content as any)?.sections?.[0]?.buttonText || 'Learn More'}
            </button>
          </section>
          
          {/* Content Section */}
          <section className="py-12 px-4 max-w-3xl mx-auto">
            <div className="prose lg:prose-xl">
              <p>
                {(project.content as any)?.sections?.[1]?.content || 
                  'This is a sample text section. You can edit this content in the editor.'}
              </p>
            </div>
          </section>
          
          {/* Footer */}
          <footer className="bg-gray-800 text-white py-8 px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-lg font-bold">{(project.content as any)?.title || 'Website Title'}</h3>
                  <p className="text-gray-400">© 2025 All rights reserved.</p>
                </div>
                <div>
                  <ul className="flex space-x-4">
                    <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Terms of Service</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Preview;