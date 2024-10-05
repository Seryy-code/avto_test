<template>
  <el-button @click="dialogVisible = true" type="danger" plain> Удалить </el-button>
  <el-dialog v-model="dialogVisible" title="Вы уверены что хотите удалить данную запись?">
    <h1></h1>
    <el-button @click="dialogVisible = false" type="danger"> Подтвердить </el-button>
    <el-button @click="dialogVisible = false" plain> Отмена </el-button>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      dialogVisible: false,
      form: {} as Tasks.Task
    }
  }
})
</script>
