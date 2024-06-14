/**
 * dateList {
    date: new Date("2000-01-10").toLocaleDateString(),
    id: "2",
  }[]
 * detailList {
    2: {
       id: Date.now() + 1000,
       createAt: new Date(),
       description: "삼겹살",
       category: "식사",
       amount: 20000,
       fundsAtTheTime: 9978000,
     }[]
  }
 */
export const store = {
  currentFunds: 0,

  isFirstEdit: true,
  todayId: 1,

  dateList: [
    {
      id: 1,
      date: new Date().toLocaleDateString(),
    },
  ],
  detailList: {},
};

export function updateStorage() {
  sessionStorage.setItem("store", JSON.stringify(store));
}

export function initStore() {
  let storage = sessionStorage.getItem("store");
  if (!storage) {
    updateStorage();
    storage = sessionStorage.getItem("store");
  }

  const { dateList, detailList, todayId, currentFunds, isFirstEdit } =
    JSON.parse(storage);

  store.currentFunds = currentFunds;
  store.isFirstEdit = isFirstEdit;
  store.dateList = dateList;
  store.detailList = detailList;
  store.todayId = todayId;
}

export function addNewHistory(newHistory) {
  try {
    console.log("newHistory",newHistory);
    if (store.detailList[store.todayId]){
      store.detailList[store.todayId].push(newHistory);
    }else{
      store.detailList[store.todayId] = [newHistory];
    }

    store.currentFunds -= newHistory.amount;
    console.log("store.currentFunds",store.currentFunds);
    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}

export function removeHistory(dateId, itemId) {
  try {
    // TODO:
    /**
     * - store의 detailList 새로 갱신
     * - store.currentFunds 새로 갱신
     */
    store.detailList[dateId] = null;

    updateStorage();
    return true;
  } catch (error) {
    alert(error);
    return false;
  }
}
