import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  productsFiltered: [],
  product: null,
  checkout: {
    activeStep: 0,
    cart: [],
    totalQuantity: 0,
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null,
  },
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
      state.productsFiltered = action.payload;
    },
    addCart(state, action) {
      const product = action.payload;
      const { addQuantity } = product ?? {};

      const { cart } = state.checkout;
      const productFound = cart.find(({ id }) => id === product.id);

      if (productFound) {
        state.checkout.cart = cart.map((_product) => {
          const { id, quantity } = _product || {};
          const productExists = id === product.id;
          if (productExists) {
            return {
              ..._product,
              quantity: addQuantity ? quantity + Number(addQuantity) : quantity + 1,
            };
          }
          return _product;
        });
        return;
      }

      if (!productFound) {
        state.checkout.cart = [...state.checkout.cart, { ...product, quantity: Number(addQuantity ?? 1) }];
      }
    },
    getSubTotal: (state) => {
      const { cart } = state.checkout;
      let total = 0;

      cart.forEach(({ quantity, precioVenta }) => {
        total += quantity * precioVenta;
      });

      state.checkout.subtotal = total;
    },
    getTotalQuantity: (state) => {
      const { cart } = state.checkout;
      let total = 0;

      cart.forEach(({ quantity }) => {
        total += quantity;
      });

      state.checkout.totalQuantity = total;
    },
    applyFilters: (state, action) => {
      const filtersEntries = Object.entries(action.payload).filter(([, value]) => value.length !== 0);

      const filtersObject = Object.fromEntries(filtersEntries);

      state.productsFiltered = state.products.filter((product) => {
        const filtersName = Object.keys(filtersObject);
        const PRICE = 'precioVenta';
        return filtersName.every((filterKey) => {
          if (PRICE === filterKey) {
            const [min, max] = filtersObject[filterKey];

            return product[filterKey] >= min && product[filterKey] <= max;
          }
          return filtersObject[filterKey].includes(product[filterKey]);
        });
      });
    },
    applyOrderBy: (state, action) => {
      const orderBy = action.payload;
      const { productsFiltered } = state;

      if (orderBy === 'productName') {
        state.productsFiltered = productsFiltered.sort((a, b) => (a.nombre > b.nombre ? 1 : -1));
      }
      if (orderBy === 'priceHighToLow') {
        state.productsFiltered = productsFiltered.sort((a, b) => (a.precioVenta < b.precioVenta ? 1 : -1));
      }
      if (orderBy === 'priceLowToHigh') {
        state.productsFiltered = productsFiltered.sort((a, b) => (a.precioVenta > b.precioVenta ? 1 : -1));
      }
    },
    //   // CHECKOUT
    //   getCart(state, action) {
    //     const cart = action.payload;

    //     state.checkout.cart = cart;
    //     state.checkout.discount = discount;
    //     state.checkout.shipping = shipping;
    //     state.checkout.billing = billing;
    //     state.checkout.subtotal = subtotal;
    //     state.checkout.total = subtotal - discount;
    //   },

    deleteCart(state, action) {
      const updateCart = state.checkout.cart.filter((item) => item.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },
    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = state.checkout.cart.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    //   createBilling(state, action) {
    //     state.checkout.billing = action.payload;
    //   },

    //   applyDiscount(state, action) {
    //     const discount = action.payload;
    //     state.checkout.discount = discount;
    //     state.checkout.total = state.checkout.subtotal - discount;
    //   },

    //   applyShipping(state, action) {
    //     const shipping = action.payload;
    //     state.checkout.shipping = shipping;
    //     state.checkout.total = state.checkout.subtotal - state.checkout.discount + shipping;
    //   }
  },
});

// Reducer
export default productsSlice.reducer;

// Actions
export const {
  setProducts,
  addCart,
  getTotalQuantity,
  applyFilters,
  applyOrderBy,
  deleteCart,
  resetCart,
  onBackStep,
  onNextStep,
  onGotoStep,
  increaseQuantity,
  decreaseQuantity,
  getSubTotal,
} = productsSlice.actions;
