<template>
    <form v-on:submit.prevent="editProperty">
        <div class="card mt-4" v-if="property !== null">
            <div class="card-header">
                <h4>Add Property</h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label">Property Name</label>
                    <input type="text" v-model="property.name" class="form-control" />
                    <span class="text-danger" v-if="errors.name && errors.name.length > 0">{{ errors.name[0] }}</span>
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" v-model="property.description"></textarea>
                    <span class="text-danger" v-if="errors.description && errors.description.length > 0">{{ errors.description[0] }}</span>
                </div>
                <div class="mb-3">
                    <label class="form-label">Address</label>
                    <textarea class="form-control" v-model="property.address"></textarea>
                    <span class="text-danger" v-if="errors.address && errors.address.length > 0">{{ errors.address[0] }}</span>
                </div>
                <div class="mb-3">
                    <label class="form-label">Floor Plan Area</label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="property.floor_area_width" placeholder="width (feet)" aria-label="width (feet)">
                        <span class="input-group-text">X</span>
                        <input type="text" class="form-control" placeholder="length (feet)" v-model="property.floor_area_length" aria-label="length (feet)">
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="text-danger" v-if="errors.floor_area_width && errors.floor_area_width.length > 0">{{ errors.floor_area_width[0] }}</span>
                        <span class="text-danger" v-if="errors.floor_area_length && errors.floor_area_length.length > 0">{{ errors.floor_area_length[0] }}</span>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Land Area</label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="property.land_area_width" placeholder="width (feet)" aria-label="width (feet)">
                        <span class="input-group-text">X</span>
                        <input type="text" class="form-control" v-model="property.land_area_length" placeholder="length (feet)" aria-label="length (feet)">
                    </div>
                    <div class="d-flex justify-content-between">
                        <span class="text-danger" v-if="errors.land_area_width && errors.land_area_width.length > 0">{{ errors.land_area_width[0] }}</span>
                        <span class="text-danger" v-if="errors.land_area_length && errors.land_area_length.length > 0">{{ errors.land_area_length[0] }}</span>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Aminities</label>
                </div>
                <div class="input-group mb-3" v-for="(input, key) in amenities" :key="key">
                    <input type="text" class="form-control" v-model="amenityValues[key]" />
                    <input type="hidden" class="form-control" v-model="amenityIds[key]" />
                    <div class="input-group-append">
                        <a class="input-group-text text-danger" @click="removeAminities(key)">Remove</a>
                    </div>
                </div>
                <div class="mb-3">
                    <button type="button" class="btn btn-primary" @click="addAminities">Add Aminity</button>
                </div>
            </div>
            <div class="card-footer">
                <div class="form-group">
                    <router-link to="/" class="btn btn-secondary mr-2">Cancel</router-link>&nbsp;&nbsp;
                    <button type="submit" class="btn btn-success ml-2">Save</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>

import { mapActions, mapGetters } from "vuex";

export default {
    name: 'PropertyEdit',
    data() {
        return {
            amenities: [{ name: '' }],
            amenityValues: [],
            amenityIds: []
        }
    },

    computed: {
        ...mapGetters([ "errors", "property", "propertyUpdated" ])
    },

    watch: {
        property: function () {
            if ( null != this.property ) {
                let amenities = []
                let amenityValues = []
                let amenityIds = []
                this.property.amenities.map(function (value, key) {
                    amenities.push({ name: '' })
                    amenityValues.push(value.name)
                    amenityIds.push(value.id)
                })
                this.amenities = amenities
                this.amenityValues = amenityValues
                this.amenityIds = amenityIds
            }
        },

        propertyUpdated: function () {
            if( true == this.propertyUpdated ) {
                this.$swal.fire({
                    text: "Property updated succesfully.",
                    icon: "success",
                    timer: 1000,
                });

                this.$router.push({ name: "PropertyList" });
            }
        }
    },
    

    created: function() {
        this.id = this.$route.params.id;
        this.getPropertyById(this.id)
    },

    methods: {
        ...mapActions([ "getPropertyById", "updateProperty" ]),
        addAminities() {
            this.amenities.push({ name: '' })
            this.amenityIds.push('')
            this.amenityValues.push('')
        },

        removeAminities(index) {
            this.amenities.splice(index, 1)
            this.amenityValues.splice(index, 1)
            this.amenityIds.splice(index, 1)
        },

        editProperty() {
            const { name, description, address, floor_area_width, floor_area_length, land_area_width, land_area_length } = this.property;
            const amenities = this.amenityValues
            const amenityIds = this.amenityIds
            this.updateProperty({
                property: {
                    name,
                    description,
                    address,
                    floor_area_width,
                    floor_area_length,
                    land_area_width,
                    land_area_length,
                    amenities,
                    amenityIds
                },
                id: this.$route.params.id
            });
        }
    }
}
</script>