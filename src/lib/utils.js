export function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
}

export function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function getCategoryBg(c) {
  if (c === 'design') return 'bg-purple-50/50';
  if (c === 'ai') return 'bg-blue-50/50';
  if (c === 'entertainment') return 'bg-red-50/50';
  return 'bg-gray-50/80';
}

export function generateOrderId() {
  return 'MDM' + Date.now().toString().slice(-6);
}
