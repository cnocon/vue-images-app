<template>
  <div class="file-uploader">
    <!-- dollar sign says take event object from triggered @change event -->
    <input
      type="file"
      accept="image/*"
      multiple
      @change="uploadImages($event.target.files)"
    />
    <span>Drag and drop files here</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UploadForm',
  methods: mapActions(['uploadImages']),

}
</script>

<style scoped>
.file-uploader {
  height: 30vh;
  border: 2px dashed #777;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.file-uploader:hover {
  background-color: #eff;
}

input {
  opacity: 0;
  width: 100%;
  height: 30vh;
  position: absolute;
}


</style>