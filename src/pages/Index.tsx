
import { KanbanProvider } from '@/context/KanbanContext';
import KanbanBoard from '@/components/KanbanBoard';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Personal Kanban Board</h1>
        
        <KanbanProvider>
          <KanbanBoard />
        </KanbanProvider>
      </div>
    </div>
  );
};

export default Index;
