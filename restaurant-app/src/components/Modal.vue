<template>
  <div class="modal-backdrop" @click="close">
    <div class="modal" @click.stop="preventClose">
      <header class="modal-header">
        <span class="modal__title">{{ title }}</span>
        <img class="btn-close" @click="close" src="@/assets/close.svg" alt="">
      </header>
      <section class="modal-body">
        <slot name="body" />
      </section>
      <footer class="modal-footer">
        <slot name="footer" />
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      required: false,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    preventClose(event) {
      if (!event.target.closest('.modal-body')) {
        this.close();
      }
    },
  },
};
</script>

<style lang="scss">
.modal-backdrop {
  position: fixed;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 60vh; 
  overflow-y: auto;
  padding: 30px;
  width: 630px;
  z-index: 1000;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
}

.modal__title {
  font-weight: 600;
  font-size: 24px;
  display: block;
  color: var(--black-title);
}

.modal-footer {
  display: flex;
  align-items: center;
}
</style>
