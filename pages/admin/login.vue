<template>
  <el-card
    shadow="always"
    :style="{width: '500px'}"
  >
    <el-form
      @submit.native.prevent="onSubmit"
      :model="controls"
      :rules="rules"
      ref="form"
    >
      <div class="title">
        <h2>Войти в панель администратора</h2>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>

      <el-form-item label="Логин" prop="login">
        <el-input v-model.trim="controls.login"></el-input>
      </el-form-item>

      <div class="mb2">
        <el-form-item label="Пароль" prop="password">
          <el-input v-model.trim="controls.password" type="password"></el-input>
        </el-form-item>
      </div>

      <el-form-item>
        <el-button type="primary" round native-type="submit" :loading="loading">
          Войти
        </el-button>
      </el-form-item>

      <small>login: <b>admin</b>, password: <b>111111</b> for admin user</small>

    </el-form>
  </el-card>
</template>

<script>
  export default {
    layout: 'empty',
    head: {
      title: `Вход в панель администратора | ${process.env.appName}`
    },
    data() {
      return {
        loading: false,
        controls: {
          login: '',
          password: ''
        },
        rules: {
          login: [
            {required: true, message: 'Введите логин', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Введите пароль', trigger: 'blur'},
            {min: 6, message: 'Пароль должен быть не менее 6 символов', trigger: 'blur'}
          ]
        }
      }
    },
    mounted() {
      const {message} = this.$route.query;

      switch (message) {
        case 'login':
          this.$message.info('Для начала войдите в систему');
          break;
        case 'logout':
          this.$message.success('Вы успешно вышли из системы');
          break;
        case 'session':
          this.$message.warning('Время сессии истекло, пожалуйста зайдите заново');
          break;
      }
    },
    methods: {
      onSubmit() {
        this.$refs['form'].validate(async valid => {
          if (valid) {
            this.loading = true;

            try {
              const formData = {
                login: this.controls.login,
                password: this.controls.password,
              };
              await this.$store.dispatch('auth/login', formData);
              this.$router.push('/admin');
            } catch (e) {
              this.loading = false;
            }
          }
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .title{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
