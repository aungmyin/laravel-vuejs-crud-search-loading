<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="collapse navbar-collapse">
                <div class="navbar-nav">
                    <router-link
                        :to="{ name: 'ProductIndex' }"
                        class="nav-item nav-link"
                        >Products</router-link
                    >

                    <router-link
                        :to="{ name: 'ProductCreate' }"
                        class="nav-item nav-link"
                        >Product Create</router-link
                    >
                </div>
            </div>
        </nav>
        <!-- Router view -->
        <router-view> </router-view>
        <!-- set progressbar -->
        <vue-progress-bar></vue-progress-bar>
    </div>
</template>

<script>
export default {};
</script>
