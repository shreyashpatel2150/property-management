<template>
    <div class="card mt-4">
        <div class="card-header d-flex justify-content-between">
            <h4>Properties</h4>
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
                        <td>{{ propertyIndex + index }}</td>
                        <td>{{ property.name }}</td>
                        <td>{{ property.address }}</td>
                        <td>{{ property.display_floor_plan_area }}</td>
                        <td>{{ property.display_land_area }}</td>
                        <td>
                            <button class="btn btn-danger mx-2" title="Delete Property" @click="deletePropertyModal(property.id)" >
                                <i class="fa fa-trash" />
                            </button>
                            <router-link class="btn btn-primary mx-2" title="Edit Property"  :to="{ name: 'PropertyEdit', params: { id: property.id } }">
                                <i class="fa fa-edit" />
                            </router-link>
                            <router-link class="btn btn-primary mx-2" title="View Property Detail"  :to="{ name: 'PropertyDetail', params: { id: property.id } }">
                                <i class="fa fa-eye" />
                            </router-link>
                        </td>
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
            search: '',
            propertyIndex: 1
        }
    },

    computed: {
        ...mapGetters([ "properties", "paginationData", "deleteStatus", "displayMessage" ])
    },

    methods: {
        ...mapActions([ "getAllProperties", "deleteProperty" ]),

        searchProperty() {
            this.getAllProperties(this.query)
        },

        async deletePropertyModal(id) {
            this.$swal.fire({
                text: "Are you sure to delete the property?",
                icon: "error",
                cancelButtonText: "Cancel",
                confirmButtonText: "Yes, Confirm Delete",
                showCancelButton: true,
            }).then(async (result) => {
                if (result['isConfirmed']) {
                    await this.deleteProperty(id)
                    this.getAllProperties(this.query)
                    if( true == this.deleteStatus ) {
                        this.$swal.fire({
                            text: this.displayMessage,
                            icon: "success",
                            timer: 1000,
                        });
                    } else {
                        this.$swal.fire({
                            text: this.displayMessage,
                            icon: "error",
                            timer: 1000,
                        });
                    }
                }
            })
        }
    },
    
    created() {
        this.getAllProperties(this.query)
    },

    watch: {
        properties: function () {
            this.propertyIndex = ((this.query.page - 1) * 5) + 1
        }
    },
}
</script>