<template>
  <el-form
    :model="controls"
    :rules="rules"
    @submit.native.prevent="onSubmit"
    ref="form"
  >
    <h1 class="mb">Создать новый пост</h1>

    <el-form-item label="Введите название поста" prop="title">
      <el-input v-model="controls.title"></el-input>
    </el-form-item>

    <el-form-item label="Текст в формате .md или .html" prop="text">
      <el-input :rows="10" resize="none" type="textarea" v-model="controls.text"></el-input>
    </el-form-item>

    <el-button class="mb" type="success" plain @click="previewDialog = true">
      Предпросмотр
    </el-button>

    <el-upload
      ref="upload"
      class="mb"
      drag
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-change="handleImageChange"
      :auto-upload="false"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">Перетащите картинку <em>или нажмите</em></div>
      <div class="el-upload__tip" slot="tip">файлы с расширением jpg/png</div>
    </el-upload>

    <el-dialog title="Предпросмотр" :visible.sync="previewDialog">
      <div :key="controls.text">
        <vue-markdown>{{controls.text}}</vue-markdown>
      </div>
    </el-dialog>

    <el-form-item>
      <el-button :loading="loading" native-type="submit" round type="primary">
        Создать пост
      </el-button>
    </el-form-item>

  </el-form>
</template>

<script>
  export default {
    layout: 'admin',
    middleware: ['admin-auth'],
    head: {
      title: `Новый пост | ${process.env.appName}`
    },
    data() {
      return {
        loading: false,
        previewDialog: false,
        image: null,
        controls: {
          title: '',
          text: ''
        },
        rules: {
          title: [
            {required: true, message: 'Название поста не должно быть пустым', trigger: 'blur'}
          ],
          text: [
            {required: true, message: 'Текст не должен быть пустым', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleImageChange(file, fileList) {
        this.image = file.raw;
      },
      onSubmit() {
        this.$refs['form'].validate(async valid => {
          if (valid && this.image) {
            this.loading = true;

            try {
              const formData = {
                title: this.controls.title,
                text: this.controls.text,
                image: this.image,
              };
              await this.$store.dispatch('post/create', formData);
              this.controls.title = '';
              this.controls.text = '';
              this.controls.image = null;
              this.$refs.upload.clearFiles();
              this.$message.success('Пост создан');
            } catch (e) {
            } finally {
              this.loading = false;
            }
          } else {
            this.$message.warning('Форма не валидна');
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  form {
    width: 600px;
  }
</style>
