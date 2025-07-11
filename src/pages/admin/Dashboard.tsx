
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import AdminNavbar from '@/components/admin/AdminNavbar';
import AdminSidebar from '@/components/admin/AdminSidebar';
import UsersTable from '@/components/admin/UsersTable';
import ProjectsTable from '@/components/admin/ProjectsTable';
import TicketsTable from '@/components/admin/TicketsTable';
import PaymentsTable from '@/components/admin/PaymentsTable';
import StatsCards from '@/components/admin/StatsCards';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkUser = async () => {
      // Check if user is logged in and is an admin
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        navigate('/login');
        return;
      }
      
      const user = JSON.parse(userStr);
      if (user.role !== 'admin') {
        toast({
          title: "Access denied",
          description: "You don't have permission to access the admin dashboard.",
          variant: "destructive",
        });
        navigate('/dashboard');
        return;
      }
      
      setUser(user);
      setLoading(false);
    };

    checkUser();
  }, [navigate, toast]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading admin dashboard...</div>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar user={user} />
        
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            
            <StatsCards />
            
            <Tabs defaultValue="users" className="mt-8">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="tickets">Support Tickets</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Users Management</CardTitle>
                        <CardDescription>Manage user accounts, roles, and permissions</CardDescription>
                      </div>
                      <Button>Add New User</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <UsersTable />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="projects">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Projects Management</CardTitle>
                        <CardDescription>View and manage all user projects</CardDescription>
                      </div>
                      <Button>Create Project</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ProjectsTable />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="tickets">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Support Tickets</CardTitle>
                        <CardDescription>Manage customer support tickets</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline">Export</Button>
                        <Button>Create Ticket</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <TicketsTable />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="payments">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Payment Management</CardTitle>
                        <CardDescription>View and manage subscription payments</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline">Export</Button>
                        <Button>Manage Plans</Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <PaymentsTable />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;