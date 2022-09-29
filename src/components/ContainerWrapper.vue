<script setup lang="ts">
import { computed, reactive, watch } from "vue";
import { OnClickOutside } from "@vueuse/components";

//used emit to send custom events ( onTextChange, Onchange, onRemoveOption ) from the child component to its parent
const emit = defineEmits<{
  (e: "onTextChange", inputText: string): void;
  (e: "onChange", selectedItems: []): void;
  (e: "onRemoveOption", removedItem: string): void;
}>();
//defineProps APIs to declare props for our component
const props = defineProps<{
  availableOptions: [];
  selectedOptions: [];
  minLength: number;
  placeholder: string;
}>();

//choice of reactive was based on the fact that even if reactive only takes objects, not js primitives, ref is calling reactive behind the scenes and also a good use-case for reactive is a group of primitives that belong together which is our case
const state = reactive<{
  inputText: string;
  internal_selectedOptions: [];
  listIsOpen: boolean;
}>({
  inputText: "",
  internal_selectedOptions: [],
  listIsOpen: false,
});

//define the state of the open list to use it in a later scenario to access the data store
function accessDatalist() {
  state.listIsOpen = true;
}
//define the state of the closed list of data
function closeList() {
  state.listIsOpen = false;
}

//we have a complex logic that includes reactive data so it is recommended to use a computed property ( to display values based on a value or set of values in the data model )
const noMatchFound = computed(
  () =>
    props.availableOptions.length === 0 &&
    state.inputText.length >= props.minLength
);

//we use watch because need listen to the component data listIsOpen and run whenever they change a particular property
watch([noMatchFound, props], ([_noMatchFound, _props]) => {
  if (!!_noMatchFound || _props.availableOptions.length) {
    accessDatalist();
  }
});
watch(props, (newProps) => {
  state.internal_selectedOptions = newProps.selectedOptions;
});

function onInputTextChange() {
  emit("onTextChange", state.inputText);
}

function onSelectedOptionsChange() {
  emit("onChange", state.internal_selectedOptions);
}

function onRemoveOption(removedItem: string) {
  emit("onRemoveOption", removedItem);
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") {
    closeList();
  }
}

function onInputFocus() {
  if (state.inputText.length >= props.minLength) {
    accessDatalist();
  }
}

function onClickOutside() {
  closeList();
}
</script>

<template>


  <div class="container_card">
    <div
      v-for="selectedOption in props.selectedOptions"
      :key="selectedOption"
      class="container_card-item"
    >
      <slot name="container_card-item" v-bind="{ selectedOption }">
        {{ selectedOption }}
      </slot>
      <button
        class="btn btn--secondary"
        @click="onRemoveOption(selectedOption)"
      >
        X
      </button>
    </div>
  </div>

  <OnClickOutside @trigger="onClickOutside">
    <div class="container-input" :onkeydown="onKeydown">
      <div class="container_item">
        <div class="searchIcon" data-v-0d91fa54="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            aria-hidden="true"
            class="flex-none text-slate-300 dark:text-slate-400"
            viewBox="0 0 24 24"
            data-test="iconSearch"
            data-v-0d91fa54=""
          >
            <path d="m19 19-3-3"></path>
            <circle cx="11" cy="11" r="6"></circle>
          </svg>
        </div>

        <input
          type="text"
          v-model="state.inputText"
          @input="onInputTextChange"
          @focus="onInputFocus"
          autofocus
          :placeholder="props.placeholder"
        />
      </div>

      <ul class="container_list" v-show="state.listIsOpen">
        <li v-if="noMatchFound">There are no results for the search</li>

        <li v-for="option in props.availableOptions" :key="option">
          <label>
            <input
              type="checkbox"
              :value="option"
              @change="onSelectedOptionsChange"
              v-model="state.internal_selectedOptions"
              style="margin-right: 10px"
            />
            <slot name="checkbox-label" v-bind="{ option }">{{ option }}</slot>
          </label>
        </li>
      </ul>
    </div>
  </OnClickOutside>
</template>

<style scoped>
.container_card {
  display: flex;
  flex-direction: row;
  max-width: 500px;
  flex-wrap: wrap;

}
.container_card-selected-item
{
  height: 200px;
  width: 500px;
  border-radius: 0.25rem;
  border: 1px solid rgb(223, 223, 223);
  margin-bottom: 10px;

}
.container_card-item {
  display: flex;
  background-color: #0099ff;
  padding: 5px;
  margin: 5px;
  font-size: 14px;
  text-transform: none;
  color: #fff;
  cursor: pointer;
  line-height: 2;
  border-radius: 6px;
}
.container_card-item:hover
{
  background-color:rgb(26, 163, 255)
}
.container_errormsg {
  font-size: 15px;
  font-style: oblique;
  width: 100%;
  position: relative;
  top: 100%;
  background-color: #fff;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 0.25rem;
  padding: 0.5rem;
  color: grey;
  list-style: none;
  margin-top: 30px;
}
.searchIcon {
  width: 1.5rem;
  height: 1.5rem;
  color: rgb(100, 116, 139);
}
.btn.btn--secondary {
  border: 1px solid transparent;
  background-color: transparent;
  color: white;
  margin-left: 10px;
  margin-top: 5px;
  height: 0px;
  font-size: 10px;
  cursor: pointer;
}
.container_item {
  display: flex;
  flex-wrap: wrap;
  max-width: 600px;
  min-width: 300px;
  align-items: center;
  width: 100%;
  border-radius: 0.25rem;
  padding-left: 1rem;
  background-color: #fff;
  border: 1px solid rgb(223, 223, 223);
  overflow: hidden;
  transition: box-shadow 300ms ease-in-out;
}
@media (max-width: 900px) {
  .container-input .container_list
  {
    z-index: 99;
  }

}
@media (min-width: 1000px) {
  .container_item {
    min-width: 500px;
  }
}
.container_item input[type="text"]::-webkit-input-placeholder
{
  font-style: oblique;
  font-size: 16px;
  opacity: 0.5;

}
.container_item input[type="text"] {
  border: none;
  background-color: transparent;
  outline: none;
  padding: 10px;
  flex-grow: 1;
  border: 0px;
  height: 3.5rem;
  margin-left: 1rem;
  color: black;

}
.container_list {
  box-shadow: 0px 0px 8px grey;
  padding: 0.5rem;
  color: grey;
  position: absolute;
  width: 100%;
  list-style-type: none;
  top: 100%;
  margin-top: 0.5rem;
  background-color: #fff;
  border: 1px solid rgb(223, 223, 223);
  border-radius: 5px;
}

.container_list li label {
  cursor: pointer;
  color: black;
  display: flex;

}
.container_list li:hover
{
  background-color:#ededed ;
  border-radius: 5px;
  padding-left: 5px;
}
</style>
