export const findUserById = (id: number, listUser: []) => {
  for (let i = 0; i < listUser.length; i++) {
    if (id == listUser[i].id) {
      return listUser[i];
    }
  }
};

export const getRoldeName = (status: number) => {
  switch (status) {
    case 1:
      return 'Director';
    case 2:
      return 'Factory';
    case 3:
      return 'Insurance';
    case 4:
      return 'Distribution';
  }
};

export const getProdcutId = (id: number) => {
  return 22000001 + 'COM' + id;
};
