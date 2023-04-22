import { createWebHistory, createRouter } from 'vue-router'
import PropertyList from '../components/property/PropertyList.vue'
import PropertyCreate from '../components/property/PropertyCreate.vue'
import PropertyEdit from '../components/property/PropertyEdit.vue'
import PropertyDetail from '../components/property/PropertyDetail.vue'

const routes = [
    { path: '/', name: 'PropertyList', component: PropertyList },
    { path: '/property/create', name: 'PropertyCreate', component: PropertyCreate },
    { path: '/property/:id/edit', name: 'PropertyEdit', component: PropertyEdit },
    { path: '/property/:id', name: 'PropertyDetail', component: PropertyDetail },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
