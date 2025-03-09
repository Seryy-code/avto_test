import { defineStore } from 'pinia'
import { httpClient } from '@/stores/httpClient'

export const useTableStore = defineStore('TableStore', {
  state: () => ({
    tasks: [] as Tasks.Task[]
  }),
  actions: {
    async getAllTasks(allowEmpty: number = 0) {
      this.tasks.length = 0
      return httpClient
        .get('http://admin.devtowns.ru/', {
          params: {
            allowEmpty
          }
        })
        .then((response) => {
          console.log(response.data)
        })
    }
  }
})
