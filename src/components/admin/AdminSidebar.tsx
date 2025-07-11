
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  HelpCircle, 
  MessageSquare,
  CreditCard,
  FileText,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState({
    users: false,
    projects: false,
    billing: false,
    reports: false
  });

  const toggleExpand = (section: keyof typeof expanded) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section]
    });
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-full">
      <div className="p-6">
        <h1 className="text-2xl font-bold">Buildify Admin</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-1 px-3">
          <li>
            <Link 
              to="/admin/dashboard" 
              className={`flex items-center px-3 py-2 rounded-md ${isActive('/admin/dashboard') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            >
              <LayoutDashboard className="mr-3" size={20} />
              <span>Dashboard</span>
            </Link>
          </li>
          
          <li>
            <button 
              onClick={() => toggleExpand('users')}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-800"
            >
              <div className="flex items-center">
                <Users className="mr-3" size={20} />
                <span>Users</span>
              </div>
              {expanded.users ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {expanded.users && (
              <ul className="pl-10 space-y-1 mt-1">
                <li>
                  <Link 
                    to="/admin/users" 
                    className={`block px-3 py-2 rounded-md ${isActive('/admin/users') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                  >
                    All Users
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/users/new" 
                    className={`block px-3 py-2 rounded-md ${isActive('/admin/users/new') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                  >
                    Add User
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/users/roles" 
                    className={`block px-3 py-2 rounded-md ${isActive('/admin/users/roles') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                  >
                    Roles & Permissions
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          <li>
            <button 
              onClick={() => toggleExpand('projects')}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-800"
            >
              <div className="flex items-center">
                <FolderKanban className="mr-3" size={20} />
                <span>Projects</span>
              </div>
              {expanded.projects ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {expanded.projects && (
              <ul className="pl-10 space-y-1 mt-1">
                <li>
                  <Link 
                    to="/admin/projects" 
                    className={`block px-3 py-2 rounded-md ${isActive('/admin/projects') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                  >
                    All Projects
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/projects/templates" 
                    className={`block px-3 py-2 rounded-md ${isActive('/admin/projects/templates') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                  >
                    Templates
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          <li>
            <Link 
              to="/admin/tickets" 
              className={`flex items-center px-3 py-2 rounded-md ${isActive('/admin/tickets') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            >
              <MessageSquare className="mr-3" size={20} />
              <span>Support Tickets</span>
            </Link>
          </li>
          
          <li>
            <button 
              onClick={() => toggleExpand('billing')}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-800"
            >
              <div className="flex items-center">
                <ShoppingCart className="mr-3" size={20} />
                <span>Billing</span>
              </div>
              {expanded.billing ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {expanded.billing && (
              <ul className="pl-10 space-y-1 mt-1">
                <li>
                  <Link 
                    to="/admin/billing/plans" 
                    className={`block px-3 py-2 rounded-md ${isActive('/admin/billing/plans') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                  >
                    Plans
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/billing/payments" 
                    className={`block px-3 py-2 rounded-md ${isActive('/admin/billing/payments') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                  >
                    Payments
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/billing/invoices" 
                    className={`block px-3 py-2 rounded-md ${isActive('/admin/billing/invoices') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                  >
                    Invoices
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          <li>
            <button 
              onClick={() => toggleExpand('reports')}
              className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-gray-800"
            >
              <div className="flex items-center">
                <BarChart3 className="mr-3" size={20} />
                <span>Reports</span>
              </div>
              {expanded.reports ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
            
            {expanded.reports && (
              <ul className="pl-10 space-y-1 mt-1">
                <li>
                  <Link 
                    to="/admin/reports/users" 
                    className={`block px-3 py-2 rounded-md ${isActive('/admin/reports/users') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                  >
                    User Activity
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/reports/revenue" 
                    className={`block px-3 py-2 rounded-md ${isActive('/admin/reports/revenue') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                  >
                    Revenue
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/reports/usage" 
                    className={`block px-3 py-2 rounded-md ${isActive('/admin/reports/usage') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
                  >
                    System Usage
                  </Link>
                </li>
              </ul>
            )}
          </li>
          
          <li>
            <Link 
              to="/admin/settings" 
              className={`flex items-center px-3 py-2 rounded-md ${isActive('/admin/settings') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            >
              <Settings className="mr-3" size={20} />
              <span>Settings</span>
            </Link>
          </li>
          
          <li>
            <Link 
              to="/admin/help" 
              className={`flex items-center px-3 py-2 rounded-md ${isActive('/admin/help') ? 'bg-blue-600' : 'hover:bg-gray-800'}`}
            >
              <HelpCircle className="mr-3" size={20} />
              <span>Help & Support</span>
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          <div className="ml-3">
            <div className="font-medium">Admin User</div>
            <div className="text-sm text-gray-400">admin@buildify.com</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;