
import React, { useState } from 'react';
import ColumnComponent from './ColumnComponent';
import { useKanban } from '@/context/KanbanContext';
import { Card } from '@/types/kanban';
import { toast } from '@/hooks/use-toast';

interface DragItem {
  cardId: string;
  sourceColumn: string;
}

const KanbanBoard: React.FC = () => {
  const { columns, moveCard, updateCardOrder } = useKanban();
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);

  const handleDragStart = (e: React.DragEvent, cardId: string, sourceColumn: string) => {
    setDraggedItem({ cardId, sourceColumn });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetColumn: string) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    const { cardId, sourceColumn } = draggedItem;
    
    if (sourceColumn === targetColumn) {
      // Reordering within the same column could be implemented here
      return;
    }
    
    moveCard(cardId, sourceColumn as any, targetColumn as any);
    
    toast({
      title: "Goal Moved",
      description: `Goal moved to ${targetColumn === 'parking' ? 'Parking Lot' : targetColumn}`,
    });
    
    setDraggedItem(null);
  };

  const mainColumns = columns.filter(col => col.id !== 'parking');
  const parkingColumn = columns.find(col => col.id === 'parking');

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
      
      {parkingColumn && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Parking Lot</h2>
          <ColumnComponent
            column={parkingColumn}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
