<template>
  <!-- <span class="emoji-item-common" :class="['emoji-'+text,isInput?'emoji-size-small':'emoji-size-large']" @click="emojiClick"></span> -->
  <img :src="getImgUrl(text)" class="emoji-size-small" alt="" @click="emojiClick">
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: ["text", "isInput"],
  methods: {
    emojiClick() {
      this.$emit("onClick", this.text);
    },
    getImgUrl(i) {
      return require('@/assets/arclist/' + i + '.gif');
    }
  }
};
</script>
