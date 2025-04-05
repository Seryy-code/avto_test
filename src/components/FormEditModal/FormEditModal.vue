<template>
  <el-dialog
    @close="$emit('close')"
    v-model="isModal"
    close-on-click-modal
    title="Изменения данных машины:"
  >
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
      <div v-for="(workTasks, index) in form.WorkTasks" class="flex gap-4">
        <el-input v-model="workTasks.name" placeholder="Название работы" />
        <el-input v-model="workTasks.price" placeholder="Цена работы" />
        <el-button @click="deleteWorkTask(index)" type="danger" circle>
          <el-icon><Delete /></el-icon
        ></el-button>
      </div>
      <el-button @click="addWorkTask" type="success" class="mx-auto" circle
        ><el-icon><Plus /></el-icon
      ></el-button>
    </div>
    <div class="flex gap-4 flex-col">
      <div>Детали :</div>
      <div v-for="(part, index) in form.PartTasks" class="flex gap-4">
        <el-input v-model="part.name" placeholder="Название детали" />
        <el-input v-model="part.price" placeholder="Цена детали" />
        <el-input v-model="part.result_price" placeholder="Цена детали +20%" />
        <el-button @click="deletePart(index)" type="danger" circle>
          <el-icon><Delete /></el-icon
        ></el-button>
      </div>

      <el-button @click="addPart" type="success" class="mx-auto" circle
        ><el-icon><Plus /></el-icon
      ></el-button>
    </div>
    <div>
      <div>Предоплата :</div>
      <el-input v-model="form.prepaid" />
    </div>
    <div class="flex gap-4 flex-col">
      <div>Записи :</div>
      <div v-for="(note, index) in form.NoteTasks" class="flex gap-4">
        <el-input v-model="note.description" type="textarea" />
        <el-button @click="deleteNote(index)" type="danger" circle
          ><el-icon><Delete /></el-icon
        ></el-button>
      </div>
      <el-button @click="addNote" type="success" class="mx-auto" circle
        ><el-icon><Plus /></el-icon
      ></el-button>
    </div>
    <div>
      <el-button
        type="primary"
        @click="sendForm(form, WorkTasks, PartTasks, NoteTasks)"
        class="m-auto"
        >Сохранить</el-button
      >
      <!-- @click="sendForm(form, workTasks, parts, notes)",  -->

      <el-button @click="$emit('close'), clearForm()" plain> Отмена </el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  emits: ['close', 'send-form'],
  props: {
    row: {
      type: Object as PropType<Tasks.Task>,
      required: true
    },
    isModal: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: this.row
    }
  },
  methods: {
    addWorkTask() {
      this.form.WorkTasks.push({ name: '', price: 0 })
    },
    deleteWorkTask(index: number) {
      this.form.WorkTasks.splice(index, 1)
    },
    addPart() {
      this.form.PartTasks.push({ name: '', price: 0, result_price: 0 })
    },
    deletePart(index: number) {
      this.form.PartTasks.splice(index, 1)
    },
    addNote() {
      this.form.NoteTasks.push({ description: '' })
    },
    deleteNote(index: number) {
      this.form.NoteTasks.splice(index, 1)
    },
    sendForm(form: Tasks.Task) {
      const payload = {
        ...form,
        noteTasks: form.NoteTasks,
        partTasks: form.PartTasks,
        workTasks: form.WorkTasks
      }
      delete payload.NoteTasks
      delete payload.PartTasks
      delete payload.WorkTasks

      this.$emit('send-form', payload)
    },
    clearForm() {
      this.form = {
        mark: '',
        num: '',
        vin: '',
        date: '',
        prepaid: 0,
        paidstate: 0
      } as Tasks.Task
      this.WorkTasks = [{ name: '', price: 0 }] as Tasks.workTask[]
      this.PartTasks = [{ name: '', price: 0, result_price: 0 }] as Tasks.partTask[]
      this.NoteTasks = [{ description: '' }] as Tasks.noteTask[]
    }
  }
})
</script>
