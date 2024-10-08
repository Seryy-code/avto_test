<template>
  <el-table :data="tableData" style="width: 100%">
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
      <template #default="{ $index }">
        <FormDeleteModal @row-delete="RowDelete($index)" :row="tableData[$index]" />
      </template>
    </el-table-column>
  </el-table>
</template>
<style>
.el-table--fit .el-table__inner-wrapper:before {
  z-index: 1;
}
</style>
<script lang="ts">
import FormDeleteModal from '../FormDeleteModal/FormDeleteModal.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    FormDeleteModal
  },
  props: {
    newform: {
      type: Object as () => Tasks.Task,
      required: true
    }
  },
  data() {
    return {
      tableData: [] as Tasks.Task[]
    }
  },
  methods: {
    RowAdd(newform: Tasks.Task) {
      const newFormCopy = JSON.parse(JSON.stringify(newform))
      this.tableData.push(newFormCopy)
    },
    RowDelete(index: number) {
      this.tableData.splice(index, 1)
    }
  },
  watch: {
    newform(newVal) {
      console.log(newVal)
      this.RowAdd(newVal)
    }
  }
})
</script>
