<template>
  <div class="flex gap-3">
    <el-button @click="openAddModal()" type="success"> Создать </el-button>

    <FormAddModal
      @send-form="giveRow"
      @close="closeAddModal"
      :is-modal="state.isAddModal"
      v-if="state.isAddModal"
    />
  </div>

  <el-table class="before:z-0" :data="tableData" style="width: 100%">
    <el-table-column prop="mark" label="Марка" />
    <el-table-column prop="num" label="Номер" />
    <el-table-column prop="vin" label="Вин-код" />
    <el-table-column prop="date" label="Дата" />
    <el-table-column label="Описание работы">
      <template #default="{ row }">
        <div>
          <p v-for="workTask in row.workTasks">{{ workTask.name }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Cтоимость работы">
      <template #default="{ row }">
        <div>
          <p v-for="workTask in row.workTasks">{{ workTask.price }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Запчасти">
      <template #default="{ row }">
        <div>
          <p v-for="part in row.parts">{{ part.name }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Cтоимость запчастей">
      <template #default="{ row }">
        <div>
          <p v-for="part in row.parts">{{ part.price }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Cтоимость запчастей +20%">
      <template #default="{ row }">
        <div>
          <p v-for="part in row.parts">{{ part.result_price }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="prepaid" label="Предоплата" />
    <el-table-column prop="paidstate" label="Статус оплаты" />
    <el-table-column label="Блокнот">
      <template #default="{ row }">
        <div>
          <p v-for="note in row.notes">{{ note.description }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="" label="Изменение">
      <template #default="{ row }">
        <el-button @click="openDeleteModal(row)" type="danger" plain> Удалить </el-button>
      </template>
    </el-table-column>
  </el-table>

  <FormDeleteModal
    :row="element"
    @close="closeDeleteModal"
    @delete="deleteRow"
    :is-modal="state.isDeleteModal"
    v-if="state.isDeleteModal"
  />
</template>

<script lang="ts">
import FormAddModal from '@/components/FormAddModal/FormAddModal.vue'
import FormDeleteModal from '@/components//FormDeleteModal/FormDeleteModal.vue'
import { useTableStore } from '@/stores/TableStore'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  data() {
    return {
      tableData: [] as Tasks.Task[],
      receivedRow: {} as Tasks.Task,
      element: {} as Tasks.Task,
      state: {
        isDeleteModal: false,
        isAddModal: false
      }
    }
  },
  components: {
    FormAddModal,
    FormDeleteModal
  },
  methods: {
    giveRow(data: Tasks.Task) {
      this.receivedRow = data
    },
    addRow(newRow: Tasks.Task) {
      this.state.isAddModal = false
      this.tableData.push(newRow)
    },
    deleteRow(element: Tasks.Task) {
      this.state.isDeleteModal = false
      const index = this.tableData.indexOf(element)
      if (index !== -1) {
        this.tableData.splice(index, 1)
      }
    },
    openAddModal() {
      this.state.isAddModal = true
    },
    closeAddModal() {
      this.state.isAddModal = false
    },
    openDeleteModal(element: Tasks.Task) {
      console.log(element)
      this.element = element
      this.state.isDeleteModal = true
    },
    closeDeleteModal() {
      this.state.isDeleteModal = false
    }
  },
  watch: {
    receivedRow(newVal) {
      console.log(newVal)
      this.addRow(newVal)
    }
  },
  setup() {
    const tableStore = useTableStore()

    onMounted(async () => {
      console.log('Компонент смонтирован, начало выполнения getAllTasks')
      await tableStore.getAllTasks(1)
      console.log('Завершение выполнения getAllTasks')
    })

    return { tableStore }
  }
})
</script>
