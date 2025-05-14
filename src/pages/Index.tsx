
import { KanbanProvider } from '@/context/KanbanContext';
import KanbanBoard from '@/components/KanbanBoard';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Skeleton } from '@/components/ui/skeleton';
import { useKanban } from '@/context/KanbanContext';

// Loading component to show when data is being fetched
const LoadingBoard = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-lg shadow p-4">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="space-y-4">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BoardContainer = () => {
  const { loading } = useKanban();
  
  return loading ? <LoadingBoard /> : <KanbanBoard />;
};

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
          <BoardContainer />
        </KanbanProvider>
      </div>
    </div>
  );
};

export default Index;
