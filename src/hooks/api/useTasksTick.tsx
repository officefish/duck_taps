import { useCallback } from 'react'
import { useSnackbar } from 'notistack' // Assuming you're using notistack for notifications
import { useUserStore } from '@/providers/user'
import { ITask } from '@/types';

export const useTasksTick = (apiFetch: any, onSuccess: any) => {
  const { enqueueSnackbar } = useSnackbar();

  const { updatePlayerBalance,
    setDailyTasks, setSeasonTasks, setTotalProgress
   } = useUserStore();

  const tick = useCallback(
    async (data: {
      taps: number,
    }) => {
   
      try {
        const res = await apiFetch('/tasks/tick', 'POST', {...data}, enqueueSnackbar);

        const tasks = res.tasks

        if (tasks) {
          // Filter tasks into dailyTasks and seasonTasks
          const dailyTasks = tasks.filter((task: ITask) => task.templateTask.isDaily);
          const seasonTasks = tasks.filter((task: ITask) => !task.templateTask.isDaily);
    
          setDailyTasks(dailyTasks);
          setSeasonTasks(seasonTasks);    
        }
  
        if (res.totalProgress) {
          setTotalProgress(res.totalProgress);
        }
  
        if (res.balance) {
          updatePlayerBalance(res.balance)
          onSuccess(res.balance)
        }

      } catch (error: any) {

        enqueueSnackbar(`Error during gameplay tick: ${error}`, { variant: 'error' });
      } finally {}
    },
    [apiFetch, onSuccess, enqueueSnackbar] // Dependencies
  )

  return { tick, onSuccess }
}
