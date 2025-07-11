
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  ShoppingCart, 
  MessageSquare, 
  CreditCard, 
  Settings, 
  HelpCircle, 
  BarChart
} from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };
  
  const menuItems = [
    { 
      icon: <LayoutDashboard size={20} />, 
      label: 'Dashboard', 
      path: '/admin/dashboard',
      active: isActive('/admin/dashboard')
    },
    { 
      icon: <Users size={20} />, 
      label: 'Users', 
      path: '/admin/users',
      active: isActive('/admin/users')
    },
    { 
      icon: <FileText size={20} />, 
      label: 'Projects', 
      path: '/admin/projects',
      active: isActive('/admin/projects')
    },
    { 
      icon: <MessageSquare size={20} />, 
      label: 'Support Tickets', 
      path: '/admin/tickets',
      active: isActive('/admin/tickets')
    },
    { 
      icon: <CreditCard size={20} />, 
      label: 'Payments', 
      path: '/admin/payments',
      active: isActive('/admin/payments')
    },
    { 
      icon: <BarChart size={20} />, 
      label: 'Analytics', 
      path: '/admin/analytics',
      active: isActive('/admin/analytics')
    },
    { 
      icon: <Settings size={20} />, 
      label: 'Settings', 
      path: '/admin/settings',
      active: isActive('/admin/settings')
    },
  ];
  
  return (
    <aside className="w-64 bg-gray-900 text-white hidden lg:block">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold">Buildify</span>
            <span className="ml-2 text-xs bg-blue-600 px-2 py-0.5 rounded">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                item.active 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <Link 
            to="/admin/help"
            className="flex items-center space-x-3 px-3 py-2 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <HelpCircle size={20} />
            <span>Help & Support</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;