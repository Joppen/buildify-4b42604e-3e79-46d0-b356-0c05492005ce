
import { 
  Users, 
  FileText, 
  CreditCard, 
  MessageSquare, 
  TrendingUp, 
  TrendingDown 
} from 'lucide-react';

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Users',
      value: '2,543',
      change: '+12.5%',
      trend: 'up',
      icon: <Users size={24} className="text-blue-500" />,
    },
    {
      title: 'Active Projects',
      value: '1,875',
      change: '+8.2%',
      trend: 'up',
      icon: <FileText size={24} className="text-green-500" />,
    },
    {
      title: 'Monthly Revenue',
      value: '$32,621',
      change: '+15.3%',
      trend: 'up',
      icon: <CreditCard size={24} className="text-purple-500" />,
    },
    {
      title: 'Support Tickets',
      value: '42',
      change: '-5.8%',
      trend: 'down',
      icon: <MessageSquare size={24} className="text-orange-500" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-white rounded-lg shadow p-6 flex flex-col"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 rounded-lg bg-gray-100">
              {stat.icon}
            </div>
            <div className={`flex items-center ${
              stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              <span className="text-sm font-medium">{stat.change}</span>
              {stat.trend === 'up' ? (
                <TrendingUp size={16} className="ml-1" />
              ) : (
                <TrendingDown size={16} className="ml-1" />
              )}
            </div>
          </div>
          <div className="text-3xl font-bold mb-1">{stat.value}</div>
          <div className="text-sm text-gray-500">{stat.title}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;