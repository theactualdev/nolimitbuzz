import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserData } from './UserData';
import { Card, CardContent, CardHeader } from './components/ui/card';
import { Button } from './components/ui/button';
import { ChevronLeft, User } from 'lucide-react';
import { useParams, useNavigate } from 'react-router';

const UserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const response = await axios.get<UserData>(`https://jsonplaceholder.typicode.com/users/${id}`);
          console.log(response.data);
          setUser(response.data);
        } catch (err) {
          setError('Failed to fetch user details');
        } finally {
          setLoading(false);
        }
      };
  
      fetchUser();
    }, [id]);
  
    if (loading) return <div className="p-4">Loading...</div>;
    if (error) return <div className="p-4 text-red-500">{error}</div>;
    if (!user) return null;
  
    return (
      <div className="p-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <User className="h-12 w-12 text-gray-400" />
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-gray-500">{user.company.name}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div>
                <label className="font-medium">Email</label>
                <p>{user.email}</p>
              </div>
              <div>
                <label className="font-medium">Phone</label>
                <p>{user.phone}</p>
              </div>
              <div>
                <label className="font-medium">Website</label>
                <p>{user.website}</p>
              </div>
              <div>
                <label className="font-medium">Address</label>
                <p>
                  {user.address.street}, {user.address.suite}<br />
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
};

export default UserDetails;