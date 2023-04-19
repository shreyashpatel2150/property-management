<template>
    <form v-on:submit.prevent="saveProperty" :validation-schema="schema">
        <div class="card mt-4">
            <div class="card-header">
                <h4>Add Property</h4>
            </div>
            <div class="card-body">
                <div v-for="(error, idx) in errors" :key="idx">
                    <ul v-for="(allErrors, idx) in error" :key="idx">
                        <li class="text-danger">{{ allErrors }} </li>
                    </ul>
                </div>
                <div class="mb-3">
                    <label class="form-label">Property Name</label>
                    <input type="text" v-model="property.name" class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea class="form-control" v-model="property.description"></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Address</label>
                    <textarea class="form-control" v-model="property.address"></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Floor Plan Area</label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="property.floor_area_width" placeholder="width (feet)" aria-label="width (feet)">
                        <span class="input-group-text">X</span>
                        <input type="text" class="form-control" placeholder="length (feet)" v-model="property.floor_area_length" aria-label="length (feet)">
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Land Area</label>
                    <div class="input-group">
                        <input type="text" class="form-control" v-model="property.land_area_width" placeholder="width (feet)" aria-label="width (feet)">
                        <span class="input-group-text">X</span>
                        <input type="text" class="form-control" v-model="property.land_area_length" placeholder="length (feet)" aria-label="length (feet)">
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">Aminities</label>
                </div>
                <div class="input-group mb-3" v-for="(input, key) in amenities" :key="key">
                    <input type="text" class="form-control" v-model="amenityValues[key]" />
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
                    <router-link to="/" class="btn btn-secondary mr-2">Cancel</router-link>
                    <button type="submit" class="btn btn-success ml-2">Save</button>
                </div>
            </div>
        </div>
    </form>
</template>

<script>

import { mapActions, mapGetters } from "vuex";

export default {
    name: 'PropertyCreate',
    data() {
        return {
            amenities: [{ name: '' }],
            amenityValues: [],
            property: {}
        }
    },

    computed: {
        ...mapGetters([ "errors", "propertyCreated" ])
    },

    watch: {
        propertyCreated: function () {
            if( true == this.propertyCreated ) {
                this.$swal.fire({
                    text: "Property created succesfully.",
                    icon: "success",
                    timer: 1000,
                });

                this.$router.push({ name: "PropertyList" });
            }
        }
    },

    methods: {
        ...mapActions(["storeProperty"]),
        addAminities() {
            this.amenities.push({ name: '' })
        },

        removeAminities(index) {
            this.amenities.splice(index, 1)
            this.amenityValues.splice(index, 1)
        },

        saveProperty() {
            const { name, description, address, floor_area_width, floor_area_length, land_area_width, land_area_length } = this.property;
            const amenities = this.amenityValues
            this.storeProperty({
                name,
                description,
                address,
                floor_area_width,
                floor_area_length,
                land_area_width,
                land_area_length,
                amenities
            });
        }
    }
}
</script>