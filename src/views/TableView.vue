<template>
  <div class="flex gap-3">
    <el-button @click="openAddModal()" type="success"> Создать </el-button>

    <FormAddModal
      @send-form="giveRow"
      @close="closeAddModal"
      :is-modal="state.isAddModal"
      v-if="state.isAddModal"
    />

    <FormEditModal
      @send-form="updateRow"
      @close="closeEditModal"
      :row="element"
      :is-modal="state.isEditModal"
      v-if="state.isEditModal"
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
          <p v-for="WorkTasks in row.WorkTasks">{{ WorkTasks.name }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Cтоимость работы">
      <template #default="{ row }">
        <div>
          <p v-for="WorkTasks in row.WorkTasks">{{ WorkTasks.price }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Запчасти">
      <template #default="{ row }">
        <div>
          <p v-for="PartTasks in row.PartTasks">{{ PartTasks.name }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Cтоимость запчастей">
      <template #default="{ row }">
        <div>
          <p v-for="PartTasks in row.PartTasks">{{ PartTasks.price }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Cтоимость запчастей +20%">
      <template #default="{ row }">
        <div>
          <p v-for="PartTasks in row.PartTasks">{{ PartTasks.result_price }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="prepaid" label="Предоплата" />
    <el-table-column prop="paidstate" label="Статус оплаты" />
    <el-table-column label="Блокнот">
      <template #default="{ row }">
        <div>
          <p v-for="NoteTasks in row.NoteTasks">{{ NoteTasks.description }}</p>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="" label="Изменение">
      <template #default="{ row }">
        <el-button @click="openDeleteModal(row)" type="danger" plain>
          <el-icon><Delete /></el-icon>
        </el-button>

        <el-button @click="openEditModal(row)" type="action">
          <el-icon><Edit /></el-icon>
        </el-button>
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
import FormEditModal from '@/components/FormEditModal/FormEditModal.vue'
import { useTableStore } from '@/stores/TableStore'
import { defineComponent, onMounted } from 'vue'

export default defineComponent({
  data() {
    return {
      tableData: [] as Tasks.Task[],
      receivedRow: {} as Tasks.Task,
      element: {
        mark: '',
        num: '',
        vin: '',
        date: '',
        prepaid: 0,
        paidstate: 0,
        WorkTasks: [],
        PartTasks: [],
        NoteTasks: []
      } as unknown as Tasks.Task,
      state: {
        isDeleteModal: false,
        isAddModal: false,
        isEditModal: false
      }
    }
  },
  components: {
    FormAddModal,
    FormDeleteModal,
    FormEditModal
  },
  methods: {
    giveRow(data: Tasks.Task) {
      this.receivedRow = data
    },
    async addRow(newRow: Tasks.Task) {
      this.state.isAddModal = false
      this.tableData.push(newRow)
    },
    async deleteRow(element: Tasks.Task) {
      this.state.isDeleteModal = false
      const index = this.tableData.indexOf(element)
      if (index !== -1) {
        this.tableData.splice(index, 1)
      }
    },
    async updateRow(element: Tasks.Task) {
      this.state.isEditModal = false
      const tableStore = useTableStore()
      console.log('Компонент смонтирован, начало выполнения updateRow')
      await tableStore.updateTask(element)
      this.tableData = tableStore.tasks
      console.log('Завершение выполнения updateRow : ', this.tableData)
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
    },
    openEditModal(element: Tasks.Task) {
      console.log(element)
      this.element = element
      this.state.isEditModal = true
    },
    closeEditModal() {
      this.state.isEditModal = false
    }
  },
  watch: {
    receivedRow(newVal) {
      console.log(newVal)
      this.addRow(newVal)
    }
  },
  async mounted() {
    const tableStore = useTableStore()
    console.log('Компонент смонтирован, начало выполнения getAllTasks')
    await tableStore.getAllTasks(0)
    this.tableData = tableStore.tasks
    console.log('Завершение выполнения getAllTasks : ', this.tableData)
  }
})
</script>
