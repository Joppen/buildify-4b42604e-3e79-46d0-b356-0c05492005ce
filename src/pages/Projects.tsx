
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      
      if (!data.user) {
        navigate('/login');
        return;
      }
      
      fetchProjects(data.user.id);
    };

    checkUser();
  }, [navigate]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter(project => 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchQuery, projects]);

  const fetchProjects = async (userId: string) => {
    try {
      // This is a mock implementation since we don't have actual DB access
      // In a real implementation, we would fetch from Supabase
      const mockProjects = [
        {
          id: '1',
          name: 'Personal Blog',
          description: 'A simple blog website',
          template: 'blog',
          content: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published: false
        },
        {
          id: '2',
          name: 'E-commerce Store',
          description: 'Online store for selling products',
          template: 'ecommerce',
          content: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published: true,
          published_url: 'https://example.com/store'
        },
        {
          id: '3',
          name: 'Portfolio',
          description: 'Professional portfolio website',
          template: 'portfolio',
          content: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published: true,
          published_url: 'https://example.com/portfolio'
        }
      ];
      
      setProjects(mockProjects);
      setFilteredProjects(mockProjects);
    } catch (error: any) {
      toast({
        title: "Error fetching projects",
        description: error.message || "An error occurred while fetching your projects.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    try {
      // In a real implementation, we would delete from Supabase
      setProjects(projects.filter(project => project.id !== id));
      setFilteredProjects(filteredProjects.filter(project => project.id !== id));
      
      toast({
        title: "Project deleted",
        description: "Your project has been deleted successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting project",
        description: error.message || "An error occurred while deleting your project.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Projects</h1>
          <Link to="/templates">
            <Button>Create New Website</Button>
          </Link>
        </div>

        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md"
          />
        </div>

        {loading ? (
          <div className="text-center py-10">Loading projects...</div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <CardTitle>{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Template: {project.template}</span>
                    <span>•</span>
                    <span>{project.published ? 'Published' : 'Draft'}</span>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Last updated: {new Date(project.updated_at).toLocaleDateString()}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-2">
                    <Link to={`/editor/${project.id}`}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteProject(project.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  <Link to={`/preview/${project.id}`}>
                    <Button size="sm">Preview</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">No projects found</h3>
            {searchQuery ? (
              <p className="text-gray-500 mt-2">Try a different search term</p>
            ) : (
              <>
                <p className="text-gray-500 mt-2">Create your first website to get started</p>
                <Link to="/templates" className="mt-4 inline-block">
                  <Button>Create New Website</Button>
                </Link>
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Projects;