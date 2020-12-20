import Vue from 'vue'
import Vuex from 'vuex'
import { gql } from 'graphql-request';

Vue.use(Vuex)


export const actions = {
  async nuxtServerInit ({ dispatch }) {
    await dispatch('getProducts')
  },
  async getProducts({ commit }) {
    const query = gql`
      query {
        products {
          name,
          vendor_code,
          series,
        }
      }
    `;
    let result = await this.$graphql.request(query)
    result = result.products.map(item => {
      item.price = 10.10
      return item
    })
    commit('setProducts', result)
  }
}

export const state = () => ({
  products: []
})

export const mutations = {
  setProducts( state, payload ) {
    state.products = payload
  },
  updateProduct(state, payload) {
    state.products.find(product => {return product === payload.item})[payload.field] = payload.value
  }
}

export const getters = {}