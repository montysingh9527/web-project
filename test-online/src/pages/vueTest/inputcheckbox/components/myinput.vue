<template>
  <input :type="type" :placeholder="placeholder" :value="value" />
</template>

<script>
export default {
  name: "MyInput",
  props: {
    type: {
      validator(value) {
        return ["text", "password", "number", "email"].includes(value);
      },
    },
    placeholder: String,
    value: String | Number,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>