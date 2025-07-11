
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { 
  MoreHorizontal, 
  ChevronLeft, 
  ChevronRight,
  Search,
  Filter,
  Download,
  Plus
} from 'lucide-react';

const ProjectsTable = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: 'E-commerce Website',
      owner: 'John Doe',
      template: 'E-commerce',
      status: 'Published',
      created: '2023-06-15',
      updated: '2023-07-02'
    },
    {
      id: 2,
      name: 'Personal Blog',
      owner: 'Jane Smith',
      template: 'Blog',
      status: 'Draft',
      created: '2023-07-10',
      updated: '2023-07-10'
    },
    {
      id: 3,
      name: 'Portfolio Site',
      owner: 'Robert Johnson',
      template: 'Portfolio',
      status: 'Published',
      created: '2023-05-22',
      updated: '2023-06-18'
    },
    {
      id: 4,
      name: 'Community Forum',
      owner: 'Emily Davis',
      template: 'Forum',
      status: 'Draft',
      created: '2023-07-05',
      updated: '2023-07-08'
    },
    {
      id: 5,
      name: 'Product Documentation',
      owner: 'Michael Wilson',
      template: 'Documentation',
      status: 'Published',
      created: '2023-06-30',
      updated: '2023-07-12'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const filteredProjects = projects.filter(project => 
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.template.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Search projects..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2 w-full md:w-auto">
          <Button variant="outline" size="sm">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download size={16} className="mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus size={16} className="mr-2" />
            New Project
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Project Name</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Owner</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Template</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Created</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Last Updated</th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project) => (
              <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-4 text-sm font-medium">{project.name}</td>
                <td className="px-4 py-4 text-sm">{project.owner}</td>
                <td className="px-4 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.template === 'E-commerce' ? 'bg-green-100 text-green-800' : 
                    project.template === 'Blog' ? 'bg-blue-100 text-blue-800' : 
                    project.template === 'Portfolio' ? 'bg-purple-100 text-purple-800' : 
                    project.template === 'Forum' ? 'bg-red-100 text-red-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {project.template}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    project.status === 'Published' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm">{new Date(project.created).toLocaleDateString()}</td>
                <td className="px-4 py-4 text-sm">{new Date(project.updated).toLocaleDateString()}</td>
                <td className="px-4 py-4 text-sm text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>View Project</DropdownMenuItem>
                      <DropdownMenuItem>Edit Project</DropdownMenuItem>
                      <DropdownMenuItem>Duplicate</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete Project</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredProjects.length)} of {filteredProjects.length} projects
          </div>
          <div className="flex space-x-1">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={16} />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={16} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsTable;