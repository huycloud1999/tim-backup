import { Store } from "pullstate";
export const UIStore = new Store({
  mainSearch: "",
  search: "",
  loading: false,
});

export const NewsStore = new Store({
  newsHome: [],
  isFirstLoad: false,
});



