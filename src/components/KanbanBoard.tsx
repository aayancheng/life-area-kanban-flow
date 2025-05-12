
import React, { useState } from 'react';
import ColumnComponent from './ColumnComponent';
import { useKanban } from '@/context/KanbanContext';
import { Card } from '@/types/kanban';
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

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
        description: `Goal moved to ${targetColumn === 'parking' ? 'Parking Lot' : targetColumn}`
      });
    }
    
    setDraggedItem(null);
  };

  const mainColumns = columns.filter(col => col.id !== 'parking');
  const parkingColumn = columns.find(col => col.id === 'parking');

  return (
    <div className="flex flex-col space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
      
      <Separator className="my-8 h-1 bg-gray-200 rounded" />
      
      {parkingColumn && (
        <div>
          <h2 className="text-2xl font-bold mb-4 text-slate-600">Parking Lot</h2>
          <ColumnComponent
            column={parkingColumn}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            isParkingLot={true}
          />
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
