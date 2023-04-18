import { createWebHistory, createRouter } from 'vue-router'
import PropertyList from '../components/property/PropertyList.vue'
import PropertyCreate from '../components/property/PropertyCreate.vue'

const routes = [
    { path: '/', name: 'PropertyList', component: PropertyList },
    { path: '/property/create', name: 'PropertyCreate', component: PropertyCreate },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
