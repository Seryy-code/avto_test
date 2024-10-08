declare module Tasks {
  interface Task {
    mark: string
    num: string
    vin: string
    date: string
    workTasks: workTask[]
    parts: partTask[]
    prepaid: number
    notes: noteTask[]
    paidstate: number
  }
  interface workTask {
    name: string
    price: number
  }
  interface partTask {
    name: string
    price: number
    result_price: number
  }
  interface noteTask {
    description: string
  }
}
