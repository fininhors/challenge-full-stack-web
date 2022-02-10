<template>
  <v-container class="mt-5">
    <v-row class="mb-3" justify="center">
      <v-col cols="12">
			  <v-card elevation="2">
          <v-card-title class="mx-5">
            <span class="headline">Inserir Aluno</span>
          </v-card-title>
          <v-container>
          <v-row>
            <v-col cols="12">
                <v-alert
                  v-model="alert"
                  dismissible
                  elevation="2"
                  outlined
                  type="success"
                  class="mx-5"
                >
                  O cadastro do aluno foi efetuado com sucesso!
                </v-alert>
            </v-col>
          </v-row>
          </v-container>
          <validation-observer
            ref="observer"
            v-slot="{ invalid }"
          >
            <form @submit.prevent="submit">
              <v-container class="mx-5">
                <v-row>
                  <v-col cols="12" md="6">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nome"
                      rules="required|min:5"
                    >
                      <v-text-field
                        v-model="student.name"
                        :error-messages="errors"
                        label="Nome"
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
                      v-model="student.email"
                      :error-messages="errors"
                      label="E-mail"
                      required
                    ></v-text-field>
                  </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="RA"
                    rules="required|min:3|max:255"
                  >
                    <v-text-field
                      v-model="student.ra"
                      :error-messages="errors"
                      label="RA"
                      required
                    ></v-text-field>
                  </validation-provider>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                  <validation-provider
                    v-slot="{ errors }"
                    name="CPF"
                    :rules="{
                      required: true,
                      length: 14
                    }"
                  >
                    <v-text-field
                      v-model="student.cpf"
                      :error-messages="errors"
                      label="CPF"
                      mask="'###.###.###-##'"
                      required
                    ></v-text-field>
                  </validation-provider>
                  </v-col>
                </v-row>
              <v-btn
                class="mr-4"
                type="submit"
                color="primary"
                :disabled="invalid"
              >
                Salvar
              </v-btn>
              <v-btn @click="cancelar">
                Cancelar
              </v-btn>
              </v-container>
            </form>
          </validation-observer>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog
        v-model="progressDialog"
        hide-overlay
        persistent
        width="500"
      >
        <v-card
          color="primary"
          dark
        >
          <v-card-text class="px-5">
            Por favor espere
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import {mask} from 'vue-the-mask'
import { required, digits, email, length, max, min, regex} from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} precisa ter {length} dígitos. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} é um campo obrigatório',
  })

  extend('max', {
    ...max,
    message: '{_field_} não pode ser maior que {length} caracteres',
  })

    extend('min', {
    ...min,
    message: '{_field_} precisar ter no mínimo {min} caracteres',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} não corresponde a {regex}',
  })

  extend('email', {
    ...email,
    message: 'E-mail deve ser válido',
  })

  extend('length', {
    ...length,
    message: '{_field_} deve possuir {length} caracteres',
  })

import StudentService from '../../services/StudentService.js'

export default {
	name: 'CreateStudent',
  directives: {mask},
  components: {
    ValidationProvider,
    ValidationObserver,
  },
	data() {
    return {
      alert: false,
      progressDialog: false,
      student: {
        ra: '',
        name: '',
        email: '',
        cpf: '',
      },
    };
  },
  methods: {
    submit () {
      this.$refs.observer.validate()
      this.progressDialog = true;
      StudentService.create(this.student)
        .then(response => {
          this.alert = true;
          this.clear();
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        }).finally(() => {
          this.progressDialog = false;
        });
    },
    clear () {
      this.student = {}
      this.$refs.observer.reset()
    },
    cancelar() {
      this.student = {}
      this.$refs.observer.reset()
      this.$router.push('/students')
    }
  },
}
</script>
