export function toShow(node) {
  node.className = node.className.replace("v-none", "v-show");
}

export function toHidden(node) {
  node.className = node.className.replace("v-show", "v-none");
}

export function validatePrice(currentFunds, currentAmount) {
  if (currentFunds < currentAmount) return false;
  return true;
}

export function validateRequired({ category, description, price }) {
  return Boolean(category && description && price && price > 0);
}
