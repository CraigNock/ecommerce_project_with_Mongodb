import testCartItems from "../components/CartBar/test-cart-items";
const initialState = {};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case "FILTER_ITEMS": {
      // using dummy data
      const filteredItems = testCartItems.filter((item) => {
        // filter out which values are 'true' from the action.filters object.
        // For body location
        const bodyFilter = Object.keys(action.filters.bodyLocation).filter(
          (filter) => {
            return action.filters.bodyLocation[filter];
          }
        );
        // For category
        const categoryFilter = Object.keys(action.filters.category).filter(
          (filter) => {
            return action.filters.category[filter];
          }
        );
        // console.log(
        //   "bodyFilter",
        //   bodyFilter,
        //   "length",
        //   bodyFilter.length,
        //   "categoryFilter",
        //   categoryFilter,
        //   "length",
        //   categoryFilter.length
        // );

        // If both we have filters on both conditions
        if (categoryFilter.length && bodyFilter.length) {
          return (
            item.category === categoryFilter[0] &&
            bodyFilter.includes(item.body_location)
          );
          // if we have conditions only on the category
        } else if (categoryFilter.length > 0 && !bodyFilter.length) {
          return item.category === categoryFilter[0];
          // if we have conditions only on the body location (multiple possible)
        } else if (!categoryFilter.length && bodyFilter.length) {
          return bodyFilter.includes(item.body_location);
          // no filtering
        } else if (!categoryFilter.length && !bodyFilter.length) {
          return true;
        }
      });
      // the console log is a placeholder for the values which we will put in state once we have a stable post-search state
      console.log(filteredItems);
      return state;
    }
    default: {
      return state;
    }
  }
}