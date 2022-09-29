<script setup lang="ts">
import Container from "./ContainerWrapper.vue";
import { booksStore } from "../store/books-store";
import { MIN_LENGTH } from "../common/constants";
</script>

<template>
  <Container
    @on-text-change="booksStore.search"
    @on-change="booksStore.setSelectedItems"
    @on-remove-option="booksStore.removeItem"
    :available-options="booksStore.availableItemsToSelect"
    :selected-options="booksStore.selectedItems"
    :min-length="MIN_LENGTH"
    :placeholder="'Type at least ' + MIN_LENGTH + ' characters...'"
  >
    <template #checkbox-label="{ option: book }">{{ book.title }} <p class="strong"> &nbsp;by&nbsp;</p> <em>{{ book.author }}</em></template
    >
    <template #container_card-item="{ selectedOption: book }">
      <div class="card_item-content">
        <span>{{ book.title }} </span>
        <span>{{ book.author }} </span>
      </div>
    </template>
  </Container>
</template>

<style scoped>
.strong
{
  font-weight: bold;
}
.card_item-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  white-space: nowrap;
}
</style>
