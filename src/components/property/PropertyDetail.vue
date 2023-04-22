<template>
    <div class="card mt-4">
        <div class="card-header d-flex justify-content-between">
            <h4>Property Detail</h4>
            <router-link to="/" class="btn btn-primary">Back</router-link>
        </div>
        <div class="card-body" v-if="property != null">
            <div class="mb-3 row">
                <div class="col-3 fw-bold">Name:</div>
                <div class="col-9">{{ property.name }}</div>
            </div>
            <div class="mb-3 row">
                <div class="col-3 fw-bold">Description:</div>
                <div class="col-9">{{ property.description }}</div>
            </div>
            <div class="mb-3 row">
                <div class="col-3 fw-bold">Address:</div>
                <div class="col-9">{{ property.address }}</div>
            </div>
            <div class="mb-3 row">
                <div class="col-3 fw-bold">Floor Area:</div>
                <div class="col-9">{{ property.display_floor_plan_area }}</div>
            </div>
            <div class="mb-3 row">
                <div class="col-3 fw-bold">Land Area:</div>
                <div class="col-9">{{ property.display_land_area }}</div>
            </div>
            <div class="mb-3 row">
                <div class="col-3 fw-bold">Amenities:</div>
                <div class="col-4">
                    <ul v-if="property.amenities != null">
                        <li v-for="amenity in property.amenities">{{ amenity.name }}</li>
                    </ul>
                </div>
            </div>

        </div>
        <div class="card-body" v-if="property == null">
            No Data found.
        </div>
    </div>

</template>

<script>

import { mapActions, mapGetters } from "vuex";

export default {
    nane: 'PropertyDetail',

    computed: {
        ...mapGetters([ "property" ])
    },

    created: function() {
        this.id = this.$route.params.id;
        this.getPropertyById(this.id)
    },

    methods: {
        ...mapActions([ "getPropertyById" ]),
    }
}

</script>