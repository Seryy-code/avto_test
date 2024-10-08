<script lang="ts">
import FormAddModal from '@/components/FormAddModal/FormAddModal.vue'
import FormDeleteModal from '@/components/FormDeleteModal/FormDeleteModal.vue'
import SpreadSheet from '@/components/SpreadSheet/SpreadSheet.vue'

import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      receivedForm: {} as Tasks.Task
    }
  },
  components: {
    FormAddModal,
    SpreadSheet
  },
  methods: {
    giveForm(data: Tasks.Task) {
      this.receivedForm = data
    }
  }
})
</script>

<template>
  <div class="flex gap-3"><FormAddModal @send-form="giveForm"></FormAddModal></div>
  <SpreadSheet :newform="receivedForm" />
</template>
