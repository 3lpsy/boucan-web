<template>
    <div class="page home-page row">
        <b-container style="padding-top: 10px" class="page">
            <div class="row page-header-row">
                <div class="col-md-12 col-xs-12">
                    <h2>Create HTTP Server</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 col-xs-12">
                    <http-server-form mode="create"></http-server-form>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import HttpServerForm from '@/components/httpServer/HttpServerForm.vue';

@Component({ components: { HttpServerForm } })
export default class HttpServerCreate extends Vue {}
</script>
