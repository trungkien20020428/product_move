export const getProductLineById = (id: any, listProductLine: any) => {
  for (let i = 0; i < listProductLine.length; i++) {
    if (listProductLine[i].id == id) {
      return listProductLine[i].name;
    }
  }
};

export const getProductMove = (status: any) => {
  console.log(status)
  switch (status) {
    case 1:
      return 'NEW PRODUCED';
    case 2:
      return 'BRING TO DISTRIBUTION';
    case 3:
      return 'SOLD';
    case 4:
      return 'ERROR NEED WARRANTY';
    case 5:
      return 'WARRANTY REPAIRING';
    case 6:
      return 'WARRANTY DONE';
    case 7:
      return 'RETURN WARRANTY FOR CUSTOMER';
    case 8:
      return 'ERROR NEED RETURN FACTORY ';
    case 9:
      return 'ERROR IS RETURNED FACTORY';
    case 10:
      return ' NEED TO RECOVERY';
    case 11:
      return 'WARRANTY TIME OUT';
    case 12:
      return ' RETURN TO THE MANUFACTURER';
  }
};
