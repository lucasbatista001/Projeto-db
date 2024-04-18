export const formatDate = (d: Date) =>
  `${d.getDate()}/${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}/${d.getFullYear()}`;
