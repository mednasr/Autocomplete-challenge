<script setup lang="ts">
import { MIN_LENGTH } from "../common/constants";
import { citiesStore } from "../store/cities-store";
import Container from "./ContainerWrapper.vue";
</script>

<template>
  <Container
    @on-text-change="citiesStore.search"
    @on-change="citiesStore.setSelectedItems"
    @on-remove-option="citiesStore.removeItem"
    :available-options="citiesStore.availableItemsToSelect"
    :selected-options="citiesStore.selectedItems"
    :min-length="MIN_LENGTH"
    :placeholder="'Type at least ' + MIN_LENGTH + ' characters...'"
  />
</template>
