
import { useEffect } from 'react';
import { Column } from '@/types/kanban';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { handleLocalStorageData, saveDefaultBoard } from '@/utils/kanbanUtils';
import { initialColumns } from '@/data/initialKanbanData';

export const useLoadKanban = (
  user: any,
  setLoading: (loading: boolean) => void,
  setColumns: React.Dispatch<React.SetStateAction<Column[]>>
) => {
  // Load data from Supabase when user changes
  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      try {
        // Attempt to fetch the user's board from the database
        const { data, error } = await supabase
          .from('kanban_boards')
          .select('columns')
          .eq('user_id', user.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          // If board exists, use it - properly cast the JSON data to our Column[] type
          setColumns(data.columns as unknown as Column[]);
        } else {
          // If no board exists for the user, create a new one with default data
          await saveDefaultBoard(user.id, initialColumns, supabase);
          setColumns(initialColumns);
        }
      } catch (error) {
        console.error('Error loading kanban board:', error);
        // Fallback to localStorage if database fetch fails
        const savedColumns = localStorage.getItem('kanbanColumns');
        if (savedColumns) {
          handleLocalStorageData(savedColumns, setColumns);
        } else {
          setColumns(initialColumns);
        }
        toast({
          title: "Failed to load your board from the cloud",
          description: "Using local data instead. Your changes may not be saved to the cloud.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, setColumns, setLoading]);
};
