
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload } from 'lucide-react';
import { useKanban } from '@/context/KanbanContext';
import { toast } from '@/hooks/use-toast';
import { Column } from '@/types/kanban';

const ExportImportButtons: React.FC = () => {
  const { columns, importBoard } = useKanban();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    try {
      // Create JSON blob
      const data = JSON.stringify(columns, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `kanban-board-${new Date().toISOString().split('T')[0]}.json`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: 'Export Successful',
        description: 'Your Kanban board has been exported successfully'
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: 'Export Failed',
        description: 'Failed to export your Kanban board',
        variant: 'destructive'
      });
    }
  };

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedData = JSON.parse(event.target?.result as string) as Column[];
        
        // Validate the imported data
        if (!Array.isArray(importedData) || !importedData.every(col => 
          col.id && col.title && Array.isArray(col.cards)
        )) {
          throw new Error('Invalid board format');
        }
        
        importBoard(importedData);
        
        toast({
          title: 'Import Successful',
          description: 'Your Kanban board has been imported successfully'
        });
      } catch (error) {
        console.error('Import failed:', error);
        toast({
          title: 'Import Failed',
          description: 'The selected file contains invalid data',
          variant: 'destructive'
        });
      }
    };
    reader.readAsText(file);
    
    // Reset file input to allow re-importing the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex gap-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleExport}
      >
        <Download className="mr-2 h-4 w-4" />
        Export Board
      </Button>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleImportClick}
      >
        <Upload className="mr-2 h-4 w-4" />
        Import Board
      </Button>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".json"
        className="hidden"
      />
    </div>
  );
};

export default ExportImportButtons;
