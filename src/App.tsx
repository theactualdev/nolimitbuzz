import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserData } from './UserData';
import { Card, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { User } from 'lucide-react';
import { Link } from 'react-router';

const App = () => {
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get<UserData[]>('https://jsonplaceholder.typicode.com/users');
          setUsers(response.data);
          console.log(response.data);
        } catch (err) {
          setError('Failed to fetch users');
        } finally {
          setLoading(false);
        }
      };
  
      fetchUsers();
    }, []);
  
    if (loading) return <div className="p-4 flex h-screen items-center justify-center">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
  
    return (
      <div className="flex flex-col gap-4 p-4 md:items-center">
        {users.map(user => (
          <Card key={user.id} className="hover:shadow-lg md:w-[500px] transition-shadow">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8 text-gray-400" />
                <span className="font-medium">{user.name}</span>
              </div>
              <Link to={`/user/${user.id}`}>
                <Button variant="outline">View Details</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    );
};

export default App;