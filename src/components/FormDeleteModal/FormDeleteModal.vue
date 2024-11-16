<template>
  <el-dialog
    @close="$emit('close')"
    v-model="isModal"
    close-on-click-modal
    title="Вы уверены что хотите удалить данную запись?"
  >
    <h1>Марка машины - {{ row.mark }}</h1>
    <h1>Номер машины - {{ row.num }}</h1>
    <el-button @click="$emit('delete', $props.row)" type="danger"> Подтвердить </el-button>
    <el-button @click="$emit('close')" plain> Отмена </el-button>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  emits: ['close', 'delete'],
  props: {
    row: {
      type: Object as PropType<Tasks.Task>,
      required: true
    },
    isModal: {
      type: Boolean,
      required: true
    }
  }
})
</script>
