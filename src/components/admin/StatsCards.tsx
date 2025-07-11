
import { 
  Users, 
  FolderKanban, 
  MessageSquare, 
  CreditCard,
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
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Projects',
      value: '1,873',
      change: '+8.2%',
      trend: 'up',
      icon: FolderKanban,
      color: 'bg-green-500'
    },
    {
      title: 'Support Tickets',
      value: '42',
      change: '-5.1%',
      trend: 'down',
      icon: MessageSquare,
      color: 'bg-yellow-500'
    },
    {
      title: 'Monthly Revenue',
      value: '$32,594',
      change: '+18.3%',
      trend: 'up',
      icon: CreditCard,
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <div className={`flex items-center mt-2 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {stat.trend === 'up' ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                <span className="text-sm font-medium">{stat.change} from last month</span>
              </div>
            </div>
            <div className={`${stat.color} p-3 rounded-lg text-white`}>
              <stat.icon size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;