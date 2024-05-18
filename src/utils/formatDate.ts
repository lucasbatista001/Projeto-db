export const formatDate = (d: Date) => {
  if (d instanceof Date && !isNaN(d.getTime())) {
    return `${d.getDate()}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  } else {
    return "";
  }
};
