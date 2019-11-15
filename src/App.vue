<template>
    <div id="app">
        <app-navbar></app-navbar>
        <app-alerts></app-alerts>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import AppFooter from '@/components/AppFooter.vue';
import AppNavbar from '@/components/AppNavbar.vue';
import AppAlerts from '@/components/AppAlerts.vue';
import bus from '@/bus';

@Component({
    components: {
        AppFooter,
        AppNavbar,
        AppAlerts,
    },
})
export default class App extends Vue {
    toastSuccess(title: string, message: string) {
        bus.$emit('APP_TOAST', {
            message: message,
            options: {
                title: title,
                variant: 'success',
                toaster: 'b-toaster-top-right',
                noHoverPause: true,
                autoHideDelay: 10000,
            },
        });
    }
    toastInfo(title: string, message: string) {
        bus.$emit('APP_TOAST', {
            message: message,
            options: {
                title: title,
                variant: 'info',
                toaster: 'b-toaster-top-right',
                noHoverPause: true,
            },
        });
    }

    created() {
        bus.$on('DNS_REQUEST_CREATED', (event: any) => {
            this.toastSuccess('Activity', 'New DNS Request Discovered!');
        });
        bus.$on('HTTP_REQUEST_CREATED', (event: any) => {
            this.toastSuccess('Activity', 'New HTTP Request Created.');
        });
        bus.$on('ZONE_CREATED', (event: any) => {
            this.toastInfo('Update', 'New Zone Created.');
        });
        bus.$on('API_TOKEN_CREATED', (event: any) => {
            this.toastInfo('Update', 'New API Token Created.');
        });
        bus.$on('USER_CREATED', (event: any) => {
            this.toastInfo('Update', 'New User Created.');
        });
    }
}
</script>

<style lang="scss">
@import '~@/assets/scss/main.scss';

body {
    background-color: #f5f5f5;
}
#app {
    display: block;
    height: 100%;
    width: 100%;
    background-color: #f5f5f5;
}
.page {
    background-color: #ffffff;
    padding-bottom: 20px;
}

.page-header-row {
    padding: 10px 0px 10px 0px;
    margin-top: 5px;
    margin-bottom: 15px;
}
</style>
