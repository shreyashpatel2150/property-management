<template>
    <form>
        <div class="card mt-4">
            <div class="card-header">
                <h4>Add Property</h4>
            </div>
            <div class="card-body">
                <div class="mb-3">
                    <label class="form-label">Property Name</label>
                    <input type="text" class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Description</label>
                    <textarea class="form-control"></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Address</label>
                    <textarea class="form-control"></textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">Floor Plan Area</label>
                    <input type="text" class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Land Area</label>
                    <input type="text" class="form-control" />
                </div>
                <div class="mb-3">
                    <label class="form-label">Aminities</label>
                </div>
                <div class="input-group mb-3" v-for="(input, key) in inputs" :key="key">
                    <input type="text" class="form-control" v-model="input.name" />
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
export default {
    name: 'PropertyCreate',
    data() {
        return {
            inputs: [
                { name: '' }
            ]
        }
    },
    methods: {
        addAminities() {
            this.inputs.push({ name: '' })
        },

        removeAminities(index) {
            this.inputs.splice(index, 1)
        }
    }
}
</script>