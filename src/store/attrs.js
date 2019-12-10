import { getGroups } from '../api/attrs'

const state = {
  groupsObj: {},
  groups: [],
  attrsObj: {},
  attrs: []
}

const mutations = {
  SET_GROUPS (state, groups) {
    state.groups = groups
    let groupsObj = {}
    for (let i = 0; i < groups.length; i++) {
      groupsObj[groups[i].id] = groups[i]
    }
    state.groupsObj = groupsObj
  }
}

const actions = {
  async fetchGroups ({ commit }) {
    try {
      let { data } = await getGroups()
      commit('SET_GROUPS', data)
    } catch (e) {
    }
  }
}

const getters = {
  groups: (state) => (state.groups)
}

const module = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default module
