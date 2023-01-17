<template>
    <div class="container">
        <h2 class="text-center">Products List</h2>
        <div class="row">
            <div class="col-md-8">
                <router-link
                    :to="{ name: 'ProductCreate' }"
                    class="btn btn-primary btn-sm float-right mb-2"
                    >Add Product</router-link
                >
            </div>
            <div class="col-md-4">
                <form @submit.prevent="searchProduct">
                    <div class="input-group">
                        <input
                            v-model="search"
                            type="text"
                            placeholder="name .."
                            class="form-control"
                        />
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-primary">
                                search
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div
                    v-if="parastatu == 200"
                    class="alert alert-success"
                    role="alert"
                >
                    Successfully updated.
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th style="min-width: 120px">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(product, key) of products.data"
                            v-bind:key="key"
                        >
                            <td>{{ key + 1 }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.description }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                                <router-link
                                    class="btn btn-success btn-sm"
                                    :to="{
                                        name: 'ProductEdit',
                                        params: { productId: product.id },
                                    }"
                                    >Edit</router-link
                                >
                                <button
                                    class="btn btn-danger btn-sm"
                                    @click="deleteProduct(product.id)"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <pagination
                    :data="products"
                    @pagination-change-page="searchProduct"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            products: {},
            parastatu: "",
        };
    },
    created() {
        this.searchProduct();
    },
    methods: {
        searchProduct(page = 1) {
            //  start the progress bar
            this.$Progress.start();
            let loader = this.$loading.show();
            //get products with search
            this.axios
                .get(
                    `http://127.0.0.1:8000/api/products?page=${page}&search=${this.search}`
                )
                .then((response) => {
                    this.products = response.data;
                    this.parastatu = this.$route.params.status;
                    //  finish the progress bar
                    this.$Progress.finish();
                    //loading hide when success
                    loader.hide();
                }).catch((error) => {
                    //  failed the progress bar
                    this.$Progress.fail();
                    //loading hide when fail
                    loader.hide();
                });
        },
        deleteProduct(productId) {

            Swal.fire({
                title: 'Warning',
                text: 'Do you want to delete?',
                icon: 'warning',
                confirmButtonText: 'Confirm',
                showCancelButton: true,
                showCloseButton: true
            }).then((result) => {
                
                if (result.isConfirmed) { //appear after deleted
                    
                    Swal.fire('Deleted!', '', 'success');
                    
                    this.axios
                        .delete(`http://127.0.0.1:8000/api/products/${productId}`)
                        .then((response) => {
                            //refresh the page
                            this.searchProduct();
                        }
                    );
                } else if (result.isDenied) {
                    Swal.fire('Changes are not deleted', '', 'info')
                }
            })

        },
    },
};
</script>
