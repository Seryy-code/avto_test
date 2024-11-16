declare module Tasks {
  interface Task {
    id: number
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
    // id: number
    name: string
    price: number
  }
  interface partTask {
    // id: number
    name: string
    price: number
    result_price: number
  }
  interface noteTask {
    // id: number
    description: string
  }
}
