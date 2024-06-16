import { renderCurrentAsset } from "../components/current-asset";
import { store, removeHistory } from "../store";

const $sectionHistory = document.querySelector(".history");

export function initHistoryList() {
  renderHistoryList();
  addHistoryListEventListener();
}

function addHistoryListEventListener() {
  $sectionHistory.addEventListener("click", function (event) {
    const element = event.target;
    if (!element.className.includes("delete-button")) return;

    const { dateid, itemid } = element.dataset;

    const isSuccess = removeHistory(dateid, itemid);
    if (!isSuccess) {
      alert("소비내역 삭제에 실패했습니다.");
      return;
    }

    reRender();
  });
}

function reRender() {
  renderCurrentAsset();
  renderHistoryList();
}

export function renderHistoryList() {
  $sectionHistory.innerHTML = store.dateList
  .map(({ date, id: dateId }) => {
    const detail = store.detailList[dateId];
    if (!detail?.length) return "";

    return `<article class="history-per-day">
      <p class="history-date">${date}</p>
      ${detail
      .sort((a, b) => a.createAt - b.createAt)
      .map(({ createAt, description, category, amount, fundsAtTheTime, id }) => {
        const createAtTime = new Date(createAt).toLocaleTimeString("ko-KR", {
          hour: "2-digit",
          minute: "2-digit",
        });
        amount = Number(amount).toLocaleString();
        fundsAtTheTime = Number(fundsAtTheTime).toLocaleString();
        return `
        <section class="history-item">
          <section class="history-item-column">
            <div class="create-at">${createAtTime}</div>
            <div class="history-detail">
              <div class="history-detail-row history-detail-title">
                <p>${description}</p>
              </div>
              <div class="history-detail-row history-detail-subtitle">
                <p>${category}</p>
                <p>
                  ${amount}
                  <span>원</span>
                </p>
              </div>
            </div>
            <div class="delete-section">
              <button class="delete-button" data-dateid="${dateId}" data-itemid="${id}">🗑</button>
            </div>
          </section>
          <section class="history-item-caption">
            <p>
              <span>남은 자산</span>
              <span>${fundsAtTheTime}</span>
              <span>원</span>
            </p>
          </section>
        </section>
        `;
      }).join("")}
    </article>`;
  })
  .join("");

}
