
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { Project } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      
      if (!data.user) {
        navigate('/login');
        return;
      }
      
      setUser(data.user);
      fetchProjects(data.user.id);
    };

    checkUser();
  }, [navigate]);

  const fetchProjects = async (userId: string) => {
    try {
      // This is a mock implementation since we don't have actual DB access
      // In a real implementation, we would fetch from Supabase
      setProjects([
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
        }
      ]);
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

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <Link to="/templates">
            <Button>Create New Website</Button>
          </Link>
        </div>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="projects">
            {loading ? (
              <div className="text-center py-10">Loading projects...</div>
            ) : projects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
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
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link to={`/editor/${project.id}`}>
                        <Button variant="outline">Edit</Button>
                      </Link>
                      <Link to={`/preview/${project.id}`}>
                        <Button>Preview</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h3 className="text-lg font-medium">No projects yet</h3>
                <p className="text-gray-500 mt-2">Create your first website to get started</p>
                <Link to="/templates" className="mt-4 inline-block">
                  <Button>Create New Website</Button>
                </Link>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics</CardTitle>
                <CardDescription>View statistics for your websites</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Analytics features coming soon!</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-gray-500">{user?.email}</p>
                </div>
                <div>
                  <h3 className="font-medium">Subscription</h3>
                  <p className="text-gray-500">Free Plan</p>
                </div>
                <Button variant="outline">Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;