<template>
    <div class="card mt-4">
        <div class="card-header d-flex justify-content-between">
            <h4>Add Property</h4>
            <router-link to="/property/create" class="btn btn-primary">Add Property</router-link>
        </div>
        <div class="card-body">
            <div class="md-3 row">
                <div class="col-3">
                    <input type="text" class="form-control" placeholder="Search Property" @input="searchProperty" v-model="query.search" />
                </div>
            </div>
            <table class="table table-striped table-hover mt-3">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Floor Area</th>
                        <th scope="col">Land Area</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="properties.length == 0">
                        <td colspan="6" class="text-center">No Data found.</td>
                    </tr>
                    <tr v-for="(property, index) in properties" :key="property.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ property.name }}</td>
                        <td>{{ property.address }}</td>
                        <td>{{ property.display_floor_plan_area }}</td>
                        <td>{{ property.display_land_area }}</td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <paginate
            v-model="query.page"
            :page-count="paginationData ? paginationData.total_pages: 1"
            :page-range="3"
            :margin-pages="2"
            :container-class="'pagination'"
            :page-class="'page-item'"
            @update:modelValue="getAllProperties(query)"
        >
        </paginate>
    </div>
</template>

<script>

import { mapActions, mapGetters } from "vuex";
import Paginate from 'vuejs-paginate-next';

export default {
    name: 'PropertyList',
    components: {
        Paginate
    },
    data() {
        return {
            query: {
                page: 1,
                search: "",
            },
            search: ''
        }
    },

    computed: {
        ...mapGetters([ "properties", "paginationData" ])
    },

    methods: {
        ...mapActions(["getAllProperties"]),

        searchProperty() {
            this.getAllProperties(this.query)
        }
    },
    
    created() {
        this.getAllProperties(this.query)
    },
}
</script>