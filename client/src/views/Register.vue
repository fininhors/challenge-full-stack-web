<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card
          elevation="24"
        >
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-alert
                  v-model="alert"
                  dismissible
                  elevation="2"
                  outlined
                  :type="alertType"
                  class="mx-5"
                >
                  {{ message }}
                </v-alert>
              </v-col>
            </v-row>
          </v-container>
          <v-container>
            <validation-observer ref="observer">
              <v-form name="form" @submit.prevent="submit" class="mx-5">
				<v-row>
                  <v-col cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nome"
                      rules="required|min:5"
                    >
                      <v-text-field
                        v-model="user.name"
                        :error-messages="errors"
                        label="Nome"
                        prepend-inner-icon="mdi-account"
                        type="text"
                        required
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Email"
                      rules="required|email"
                    >
                      <v-text-field
                        v-model="user.email"
                        :error-messages="errors"
                        label="E-mail"
                        prepend-inner-icon="mdi-email"
                        type="text"
                        required
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Senha"
                      rules="required|min:6|max:12"
                    >
                      <v-text-field
                        v-model="user.password"
                        :error-messages="errors"
						:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
						:type="showPassword ? 'text' : 'password'"
                        label="Senha"
                        prepend-inner-icon="mdi-lock"
                        required
						@click:append="showPassword = !showPassword"
                      ></v-text-field>
                    </validation-provider>
                  </v-col>
                </v-row>
                <v-row class="my-5">
                  <v-col cols="12" md="6">
                    <v-btn
                      type="submit"
                      color="primary"
                      class=""
                      :loading="loading"
                      :disabled="loading"
                    >
                      Registrar
                    </v-btn>
                  </v-col>
				  <v-col cols="12" md="6">
                    <v-btn
                      color="primary darken-1"
                      text
                      to="/login"
                      link
                    >
                      Possui conta? Acesse já.
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </validation-observer>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { required, email, max, min } from 'vee-validate/dist/rules'
import { extend, ValidationProvider, setInteractionMode, ValidationObserver } from 'vee-validate'
setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} é obrigatório!',
})

extend('max', {
  ...max,
  message: '{_field_} não pode ser maior que {length} caracteres',
})

  extend('min', {
  ...min,
  message: '{_field_} precisar ter no mínimo {min} caracteres',
})

extend('email', {
  ...email,
  message: 'Email devendo ser um email válido!',
})

import User from "../models/user";
export default {
  name: "Register",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      user: new User("", "", ""),
	  showPassword: false,
      loading: false,
      alert: false,
	  alertType: "success",
      message: "",
      errors: {}
    }
  },
  computed: {
      loggedIn() {
          return this.$store.state.auth.status.loggedIn;
      },
  },
  created() {
      if (this.loggedIn) {
          this.$router.push("/students");
      }
  },
  methods: {
    async submit() {
      const valid = await this.$refs.observer.validate();
      if (valid) {
        this.loading = true;
        this.$store.dispatch("auth/register", this.user).then(() => {
          this.loading = false;
          this.$router.push("/login");
        }).catch(error => {
          this.loading = false;
          this.message = error.response.data.message;
		  this.alertType = "error";
		  this.alert = true;
        });
      }
    },
  },
};
</script>
