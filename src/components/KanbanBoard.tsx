
import React, { useState } from 'react';
import ColumnComponent from './ColumnComponent';
import { useKanban } from '@/context/KanbanContext';
import { Card } from '@/types/kanban';
import { toast } from '@/hooks/use-toast';

interface DragItem {
  cardId: string;
  sourceColumn: string;
  index: number;
}

const KanbanBoard: React.FC = () => {
  const { columns, moveCard, updateCardOrder } = useKanban();
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);

  const handleDragStart = (e: React.DragEvent, cardId: string, sourceColumn: string, index: number) => {
    setDraggedItem({ cardId, sourceColumn, index });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumn: string, targetIndex?: number) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const { cardId, sourceColumn, index: sourceIndex } = draggedItem;
    
    if (sourceColumn === targetColumn && targetIndex !== undefined) {
      // Same column - reorder cards
      const columnObj = columns.find(col => col.id === sourceColumn);
      if (!columnObj) return;
      
      const newCards = [...columnObj.cards];
      const [movedCard] = newCards.splice(sourceIndex, 1);
      newCards.splice(targetIndex, 0, movedCard);
      
      updateCardOrder(sourceColumn as any, newCards);
      
      toast({
        title: "Goal Reordered",
        description: "Goal has been reordered within the column"
      });
    } else if (sourceColumn !== targetColumn) {
      // Different column - move card to new column
      moveCard(cardId, sourceColumn as any, targetColumn as any);
      
      toast({
        title: "Goal Moved",
        description: `Goal moved to ${targetColumn === 'future' ? 'Future To-Do' : 
          targetColumn === 'completed' ? 'Completed' : targetColumn}`,
      });
    }
    
    setDraggedItem(null);
  };

  const mainColumns = columns.filter(col => !['future', 'completed'].includes(col.id));
  const futureColumn = columns.find(col => col.id === 'future');
  const completedColumn = columns.find(col => col.id === 'completed');

  return (
    <div className="flex flex-col space-y-8">
      <div className="flex flex-col lg:flex-row gap-4">
        {mainColumns.map(column => (
          <ColumnComponent
            key={column.id}
            column={column}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 max-w-full">
        {futureColumn && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Future To-Do</h2>
            <ColumnComponent
              column={futureColumn}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          </div>
        )}
        
        {completedColumn && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-emerald-600">Completed</h2>
            <ColumnComponent
              column={completedColumn}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default KanbanBoard;
