<template>
    <div class="container">
        <h2 class="text-center">Create product</h2>
        <div class="row">
            <div class="col-md-12">
                <router-link
                    :to="{ name: 'ProductIndex' }"
                    class="btn btn-primary btn-sm float-right mb-2"
                    >Back</router-link
                >
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form method="POST" @submit.prevent="createProduct" @keydown="pFrom.onKeydown($event)">
                    
                    <AlertError :form="pFrom" message="There was some problems in " />
                    
                    <div class="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            class="form-control"
                            v-model="pFrom.name"
                        />
                    </div>
                    <HasError :form="pFrom" field="name" />
                    
                    <div class="form-group">
                        <label>Description</label>
                        <textarea
                            type="text"
                            rows="5"
                            class="form-control"
                            v-model="pFrom.description"
                        ></textarea>
                    </div>
                    <HasError :form="pFrom" field="description" />
                    
                    <div class="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            class="form-control"
                            v-model="pFrom.price"
                        />
                    </div>
                    <HasError :form="pFrom" field="price" />

                    <Button :form="pFrom" class="btn btn-primary">
                        Create
                    </Button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { Button, HasError, AlertError } from 'vform/src/components/bootstrap5';

export default {
    components: {
        Button, HasError, AlertError
    },
    data() {
        return {
            product: {},
            pFrom: new Form({
                name: '',
                description: '',
                price: ''
            })
        };
    },
    methods: {
        createProduct() {
            //  start the progress bar
            this.$Progress.start();
            let loader = this.$loading.show();

            this.pFrom
                .post("http://127.0.0.1:8000/api/products")
                .then((response) => {
                        this.pFrom.reset();
                        //  finish the progress bar
                        this.$Progress.finish();
                        //loading hide when success
                        loader.hide();
                        //redirect to index page
                        this.$router.push({ name: "ProductIndex" });
                    }
                
                )
                .catch((errror) => {
                    //  failed the progress bar
                    this.$Progress.fail();
                    //loading hide when fail
                    loader.hide();
                    console.log(errror.response.data.message);
                })
                .finally(() => (this.loading = false));
        },
    },
};
</script>
