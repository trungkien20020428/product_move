export const getDate = (date: any) => {
  if (date) {
    var date: any = new Date(date);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  return '';
};
