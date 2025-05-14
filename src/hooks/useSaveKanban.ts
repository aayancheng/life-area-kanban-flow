
import { useEffect } from 'react';
import { Column } from '@/types/kanban';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Json } from '@/integrations/supabase/types';

export const useSaveKanban = (columns: Column[], user: any, loading: boolean) => {
  // Save to database whenever columns change
  useEffect(() => {
    const saveToDatabase = async () => {
      if (!user || !columns.length || loading) return;

      try {
        const { error } = await supabase
          .from('kanban_boards')
          .upsert({
            user_id: user.id,
            columns: columns as unknown as Json,
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'user_id'
          });

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error('Error saving kanban board:', error);
        // Fallback to localStorage
        localStorage.setItem('kanbanColumns', JSON.stringify(columns));
        toast({
          title: "Failed to save to the cloud",
          description: "Your board was saved locally, but not to the cloud.",
          variant: "destructive"
        });
      }
    };

    // Wait a bit before saving to reduce database calls during rapid changes
    const timeoutId = setTimeout(() => {
      saveToDatabase();
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [columns, user, loading]);
};
