// mixin.js
import Vue from 'vue';
import Component from 'vue-class-component';
import bus from '@/bus';

// You can declare a mixin as the same style as components.
@Component
export default class ZoneMixin extends Vue {
    loadData() {}

    registerOnBroadcastZoneCreated() {
        bus.$on('ZONE_CREATED', (event: any) => {
            this.loadData();
        });
    }
}
