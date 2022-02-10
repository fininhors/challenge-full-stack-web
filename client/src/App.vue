<template>
  <v-app id="inspire">
    <v-navigation-drawer v-if="loggedIn" v-model="drawer" app>
      <v-list-item>
        <v-list-item-content class="py-3">
          <v-list-item-title class="text-h5">Módulo Acadêmico</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item to="/students" link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">Alunos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon v-if="loggedIn" @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $route.meta.title || "Sistema Acadêmico" }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon v-if="loggedIn" @click="logout">
        <v-icon>mdi-exit-run</v-icon>
      </v-btn>
      <v-btn icon v-else-if="!loggedIn" to="/login">
        <v-icon>mdi-login</v-icon>
      </v-btn>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({ drawer: null }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
}
</script>
