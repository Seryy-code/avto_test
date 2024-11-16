<template>
  <el-dialog
    @close="$emit('close')"
    v-model="isModal"
    close-on-click-modal
    title="Введите данные машины:"
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
      <div v-for="(workTask, index) in workTasks" class="flex gap-4">
        <el-input v-model="workTask.name" placeholder="Название работы" />
        <el-input v-model="workTask.price" placeholder="Цена работы" />
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
      <div v-for="(part, index) in parts" class="flex gap-4">
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
      <div v-for="(note, index) in notes" class="flex gap-4">
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
      <el-button type="primary" @click="sendForm(form, workTasks, parts, notes)" class="m-auto"
        >Добавить</el-button
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
    isModal: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      form: {
        mark: '',
        num: '',
        vin: '',
        date: '',
        prepaid: 0,
        paidstate: 0
      } as Tasks.Task,
      workTasks: [{ name: '', price: 0 }] as Tasks.workTask[],
      parts: [{ name: '', price: 0, result_price: 0 }] as Tasks.partTask[],
      notes: [{ description: '' }] as Tasks.noteTask[]
    }
  },
  methods: {
    addWorkTask() {
      this.workTasks.push({ name: '', price: 0 })
    },
    deleteWorkTask(index: number) {
      this.workTasks.splice(index, 1)
    },
    addPart() {
      this.parts.push({ name: '', price: 0, result_price: 0 })
    },
    deletePart(index: number) {
      this.parts.splice(index, 1)
    },
    addNote() {
      this.notes.push({ description: '' })
    },
    deleteNote(index: number) {
      this.notes.splice(index, 1)
    },
    sendForm(form: object, workTasks: Array<object>, parts: Array<object>, notes: Array<object>) {
      let fullform = Object.assign(
        {},
        form,
        { workTasks: workTasks },
        { parts: parts },
        { notes: notes }
      )

      this.$emit('send-form', fullform)
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
      this.workTasks = [{ name: '', price: 0 }] as Tasks.workTask[]
      this.parts = [{ name: '', price: 0, result_price: 0 }] as Tasks.partTask[]
      this.notes = [{ description: '' }] as Tasks.noteTask[]
    }
  }
})
</script>
