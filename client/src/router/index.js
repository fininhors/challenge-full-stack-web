import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/home",
        component: Home,
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/students/create",
        name: "student-create",
        component: () => import("../views/students/Create.vue"),
        meta: {
            title: "Cadastro de Aluno",
        },
    },
    {
        path: "/students/:id",
        name: "student-edit",
        component: () => import("../views/students/Edit.vue"),
        meta: {
            title: "Cadastro de Aluno",
        },
    },
    {
        path: "/students",
        name: "student-list",
        component: () => import("../views/students/Index.vue"),
        meta: {
            title: "Consulta de Alunos",
        },
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    const publicRoutes = ["/login", "/register", "/home", "/"];
    const authRequired = !publicRoutes.includes(to.path);
    const loggedIn = localStorage.getItem("user");
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
        next("/login");
    } else {
        next();
    }
});

export default router;
