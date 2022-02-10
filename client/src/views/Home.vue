<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="6">
        <v-card elevation="24">
          <v-card-title class="mx-5">
            <span class="headline">Sistema Acadêmico</span>
          </v-card-title>
          <v-card-text class="mx-5">
            <p>Módulo de gerenciamento de matrícula.</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              dark
              to="/login"
              class="mx-5 my-5"
              link
            >
              Acesse agora
            </v-btn>
            <v-btn
              color="primary"
              elevation="2"
              outlined
              to="/register"
              link
            >Registre-se</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: 'Home',
  components: {},
    created() {
      if (this.loggedIn) {
          this.$router.push("/students");
      }
  },
}
</script>
