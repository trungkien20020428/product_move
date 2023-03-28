import { createSlice } from '@reduxjs/toolkit';

const R = require('ramda');

const INITIALSTATE = {
  productLines: [],
  listRequest: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState: INITIALSTATE,
  reducers: {
    requestProductLine(state, action) {
      const { productLines } = action.payload;
      return {
        ...state,
        productLines,
      };
    },
    requestListRequest(state, action) {
      const { listRequest } = action.payload;

      return {
        ...state,
        listRequest,
      };
    },
    removeListRequest(state, action) {
      const { listRequest, ids } = action.payload;
      let requests = listRequest;
      for (let i = 0; i < listRequest.length; i++) {
        for (let j = 0; j < ids.length; i++) {
          if (listRequest[i].id == ids[j]) {
            requests;
          }
        }
      }
    },
    RequestListProduct(state,action) {
      
    }
  },
});

export const { requestProductLine } = productSlice.actions;

export default productSlice.reducer;
