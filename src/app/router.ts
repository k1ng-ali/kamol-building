import { createRouter, createWebHistory } from "vue-router"
import Home from "@/pages/Home.vue"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        // ── Home ─────────────────────────────────────────────────────────────────
        {
            path: "/home",
            name: "home",
            component: Home,
        },
        {
            path: "/:pathMatch(.*)*",
            redirect: "/home",
        },
    ],
})
export default router