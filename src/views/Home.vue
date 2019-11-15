<template>
    <div class="page home-page row">
        <b-container style="padding-top: 10px" class="page">
            <div class="row page-header-row">
                <div class="col-md-12 col-xs-12">
                    <h2>Activity</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-xs-12">
                    <b-tabs
                        content-class="mt-3"
                        justified
                        active-nav-item-class="font-weight-bold text-uppercase text-primary"
                    >
                        <b-tab ref="dnsTab" active>
                            <template v-slot:title>{{ dnsTitle}}</template>
                            <dns-requests-table></dns-requests-table>
                        </b-tab>
                        <b-tab ref="httpTab">
                            <template v-slot:title>{{ httpTitle}}</template>
                            <http-requests-table></http-requests-table>
                        </b-tab>
                    </b-tabs>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import bus from '@/bus';
import DnsRequestsTable from '@/components/dnsRequest/DnsRequestsTable.vue';
import HttpRequestsTable from '@/components/httpRequest/HttpRequestsTable.vue';

Component.registerHooks(['beforeRouteLeave']);

@Component({ components: { DnsRequestsTable, HttpRequestsTable } })
export default class Home extends Vue {
    // need to store this in vuex

    get getDnsRequestCount(): number {
        return this.$store.getters['activity/getDnsRequestCount'];
    }
    get dnsTitle() {
        let msg = 'DNS Requests';
        if (this.getDnsRequestCount > 0) {
            msg = msg + ' (' + this.getDnsRequestCount + ')';
        }
        return msg;
    }
    get getHttpRequestCount(): number {
        return this.$store.getters['activity/getHttpRequestCount'];
    }
    get httpTitle() {
        let msg = 'HTTP Requests';
        if (this.getHttpRequestCount > 0) {
            msg = msg + ' (' + this.getHttpRequestCount + ')';
        }
        return msg;
    }
    created() {
        bus.$on('HTTP_REQUEST_CREATED', (event: any) => {
            this.$store.dispatch('activity/incHttpRequestCount');
        });
        bus.$on('DNS_REQUEST_CREATED', (event: any) => {
            this.$store.dispatch('activity/incDNSRequestCount');
        });
    }
    mounted() {
        let tab: any = null;
        if (this.getHttpRequestCount > this.getDnsRequestCount) {
            tab = this.$refs.httpTab;
        } else {
            tab = this.$refs.dnsTab;
        }
        tab.activate();
    }
    beforeRouteLeave(to: any, from: any, next: any) {
        this.$store.dispatch('activity/clearDnsRequestCount');
        this.$store.dispatch('activity/clearHttpRequestCount');
        next();
    }
}
</script>
