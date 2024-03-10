<template>
  <div class="emoji-panel-wrap">
    <emoji
      v-for="(item,index) in emojis"
      :text="item"
      v-bind:key="index"
      @onClick="handleEmojiClick"
    ></emoji>
  </div>
</template>
<script>
import Emoji from "./Emoji.vue";
export default {
  data() {
    return {
      emojis: []
    };
  },
  components: {
    Emoji
  },
  methods: {
    handleEmojiClick(a) {
      this.$emit("emojiClick", a);
    }
  },
  mounted() {
    for(let i = 1;i<173;i++) {
      this.emojis.push(i)
    }
  }
};
</script>
<style scoped>
.emoji-panel-wrap {
  box-sizing: border-box;
  border: 1px solid #cccccc;
  border-radius: 5px;
  background-color: #ffffff;
  width: 508px;
  height: 174px;
  position: absolute;
  left: 0px;
  top: 32px;
  overflow: scroll;
}
</style>