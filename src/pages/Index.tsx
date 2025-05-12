
import { KanbanProvider } from '@/context/KanbanContext';
import KanbanBoard from '@/components/KanbanBoard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Index = () => {
  const { signOut, user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Personal Kanban Board</h1>
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-sm text-gray-600">
                Logged in as: {user.email}
              </div>
            )}
            <Button variant="outline" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <KanbanProvider>
          <KanbanBoard />
        </KanbanProvider>
      </div>
    </div>
  );
};

export default Index;
