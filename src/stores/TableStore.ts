import { defineStore } from 'pinia'
import { httpClient } from '@/stores/httpClient'
import { Loading } from '@element-plus/icons-vue'

export const useTableStore = defineStore('TableStore', {
  state: () => ({
    tasks: [] as Tasks.Task[],
    loading: false,
    error: null as string | null
  }),
  actions: {
    async getAllTasks(allowEmpty: number = 0) {
      this.loading = true
      this.error = null
      try {
        const response = await httpClient.get('/task', {
          params: {
            allowEmpty
          }
        })
        this.tasks = response.data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async updateTask(payload: Tasks.Task) {
      this.loading = true
      this.error = null
      try {
        const response = await httpClient.patch(`/task/${payload.id}`, payload)
        const index = this.tasks.findIndex((task) => task.id === payload.id)
        this.tasks[index] = response.data
      } catch (err: any) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    }
  }
})
