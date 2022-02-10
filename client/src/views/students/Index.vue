<template>
	<v-container class="mt-5">
    <v-row class="mb-3" justify="center">
      <v-col cols="12">
        <v-card elevation="24">
          <v-data-table
          :headers="headers"
          :items="students"
          :search="search"
          :items-per-page="5"
          >
            <template v-slot:top>
              <v-toolbar
                flat
              >
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Pesquisar"
                  single-line
                  hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  dark
                  class=""
                  to="/students/create"
                  link
                  >
                  Cadastrar Aluno
                </v-btn>
              </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn class="mr-2" color="primary" :to="`/students/${item.id}`" link>
                <v-icon
              >
                mdi-pencil
              </v-icon>
              </v-btn>
              <v-btn color="error">
                <v-icon
                @click="deleteStudent(item)"
              >
                mdi-delete
              </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
      >
      <v-card>
        <v-card-title class="text-h5">
        Você tem certeza?
        </v-card-title>
        <v-card-text>
          Após confirmar a exclusão, este registro será excluído e você não poderá reverter esta ação!
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="yellow darken-1"
          text
          @click="cancelDeletion()"
        >
          Cancelar
        </v-btn>
        <v-btn
          color="red darken-1"
          text
          @click="confirmDeletion()"
        >
          Excluir
        </v-btn>
        </v-card-actions>
      </v-card>
      </v-dialog>
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
import StudentService from "../../services/StudentService";

export default {
  name: "ListStudents",
  data() {
    return {
      students: [],
      currentStudent: null,
      currentIndex: -1,
      dialog: false,
      progressDialog: false,
      title: "",
      search: "",
      headers: [
        { text: 'RA', value: 'ra' },
        { text: 'Nome', align: 'start', value: 'name'},
        //{ text: 'E-mail', value: 'email' },
        { text: 'CPF', value: 'cpf' },
        { text: 'Actions', value: 'actions', align: 'end', sortable: false },
      ],
    };
  },
  methods: {
    retrieveStudents() {
      StudentService.getAll()
        .then(response => {
          this.students = response.data;
        //   console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },
    refreshList() {
      this.retrieveStudents();
      this.currentStudent = null;
      this.currentIndex = -1;
    },
    deleteStudent(student) {
      this.currentStudent = student;
      this.currentIndex = this.students.indexOf(student);
      this.dialog = true;
    },
    confirmDeletion() {
      this.progressDialog = true;
      StudentService.delete(this.currentStudent.id)
        .then(response => {
          this.students.splice(this.currentIndex, 1);
          this.currentStudent = null;
          this.currentIndex = -1;
          this.dialog = false;
        })
        .catch(e => {
          console.log(e);
        }).finally(() => {
          this.progressDialog = false;
        });
    },
    cancelDeletion() {
      this.currentStudent = null;
      this.currentIndex = -1;
      this.dialog = false;
    },
  },
  mounted() {
    this.retrieveStudents();
  }
};
</script>
