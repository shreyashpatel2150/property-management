<template>
    <div class="card mt-4">
        <div class="card-header d-flex justify-content-between">
            <h4>Add Property</h4>
            <router-link to="/property/create" class="btn btn-primary">Add Property</router-link>
        </div>
        <div class="card-body">
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
                    <tr>
                        <td colspan="6" class="text-center">No Data found.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PropertyList'
}
</script>