<template>
  <el-button @click="dialogVisible = true" type="success"> Создать </el-button>
  <el-dialog v-model="dialogVisible" title="Введите данные машины:">
    <div>
      <div>Марка :</div>
      <el-input v-model="form.mark" />
    </div>
    <div>
      <div>Номер :</div>
      <el-input v-model="form.num" />
    </div>
    <div>
      <div>Вин-код :</div>
      <el-input v-model="form.vin" />
    </div>
    <div>
      <div>Дата :</div>
      <el-date-picker v-model="form.date" type="date" />
    </div>
    <div class="flex gap-4 flex-col">
      <div>Описание работы :</div>
      <el-input v-model="workTasks.name" placeholder="Название работы" />
      <el-input v-model="workTasks.price" placeholder="Цена работы" />

      <el-button type="success" class="mx-auto" round>+</el-button>
    </div>
    <div class="flex gap-4 flex-col">
      <div>Детали :</div>
      <el-input v-model="parts.name" placeholder="Название детали" />
      <el-input v-model="parts.price" placeholder="Цена детали" />
      <el-input v-model="parts.result_price" placeholder="Цена детали" />
      <el-button type="success" class="mx-auto" round>+</el-button>
    </div>
    <div>
      <div>Предоплата :</div>
      <el-input v-model="form.prepaid" />
    </div>
    <div class="flex gap-4 flex-col">
      <div>Записи :</div>
      <el-input v-model="notes.description" />
      <el-button type="success" class="mx-auto" round>+</el-button>
    </div>
    <div>
      <el-button type="primary" @click="dialogVisible = false" class="m-auto">Добавить</el-button>

      <el-button @click="dialogVisible = false" plain> Отмена </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {},
  data() {
    return {
      dialogVisible: false,
      form: {} as Tasks.Task,
      workTasks: {} as Tasks.workTask,
      parts: {} as Tasks.partTask,
      notes: {} as Tasks.noteTask
    }
  }
})
</script>
