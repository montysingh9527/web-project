<template>
  <div>
    <input type="file" ref="fileInput" @change="handleFileChange" />
  </div>
</template>
  
  <script>
export default {
  methods: {
    handleFileChange() {
      const fileInput = this.$refs.fileInput;

      if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        // 使用FileReader读取文件内容
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileData = event.target.result; // 文件的二进制数据

          // 在这里可以执行文件上传的操作，比如使用axios或其他HTTP库
          // 这里只是一个示例，你需要根据你的实际情况进行适当的调整
          const formData = new FormData();
          formData.append("file", file);
          formData.append("fileData", fileData);

          axios
            .post("/upload", formData)
            .then((response) => {
              console.log("File uploaded successfully", response);
            })
            .catch((error) => {
              console.error("File upload error", error);
            });
        };
        reader.readAsArrayBuffer(file); // 以二进制数组方式读取文件内容
      }
    },
  },
};
</script>