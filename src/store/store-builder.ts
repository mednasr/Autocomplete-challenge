import { MIN_LENGTH } from "@/common/constants";
import { reactive, type UnwrapNestedRefs } from "vue";

//declare each store type
type Store<T> = {
  selectedItems: T[];
  availableItemsToSelect: T[];
  search: (searchTerm: string) => void;
  setSelectedItems: (selectedItems: T[]) => void;
  removeItem: (removedItem: T) => void;
};

type Matcher<T> = (searchTerm: string) => (item: T) => boolean;
/*a reactive object to automatically unwraps refs contained in it, so you
 don't need to use `.value` when accessing and mutating their value*/
// only unwrap nested ref
export function createContainerStore<T>(
  items: T[],
  matcher: Matcher<T>
): UnwrapNestedRefs<Store<T>> {
  const state = reactive<Store<T>>({
    selectedItems: [],
    availableItemsToSelect: [],

    search(searchTerm: string) {
      if (searchTerm.length < MIN_LENGTH) {
        state.availableItemsToSelect = [];
        return;
      }

      state.availableItemsToSelect = items.filter(
        matcher(searchTerm)
      ) as typeof state.availableItemsToSelect;
    },

    setSelectedItems(selectedBooks: T[]) {
      state.selectedItems = selectedBooks as typeof state.selectedItems;
    },

    removeItem(removedBook: T) {
      state.selectedItems = state.selectedItems.filter(
        (book) => book !== removedBook
      );
    },
  });

  return state;
}
