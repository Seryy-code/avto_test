<template>
  <el-button @click="dialogVisible = true" type="danger" plain> Удалить </el-button>
  <el-dialog
    class="z-10"
    v-model="dialogVisible"
    title="Вы уверены что хотите удалить данную запись?"
  >
    <h1>Марка машины - {{ row.mark }}</h1>
    <h1>Номер машины - {{ row.num }}</h1>
    <el-button @click="rowDelete(), (dialogVisible = false)" type="danger"> Подтвердить </el-button>
    <el-button @click="dialogVisible = false" plain> Отмена </el-button>
  </el-dialog>
</template>

<script lang="ts">
import { Delete } from '@element-plus/icons-vue'
import { defineComponent } from 'vue'

export default defineComponent({
  emits: ['row-delete'],

  props: {
    row: {
      type: Object as () => Tasks.Task,
      required: true
    }
  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    rowDelete() {
      console.log(this.$props.row)

      this.$emit('row-delete')
    }
  }
})
</script>
