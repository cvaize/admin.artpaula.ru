import { getAttrGroups, getAttrs } from '../api/attrs'

const state = {
  groupsObj: {},
  groups: [],
  attrsObj: {},
  attrs: []
}

const mutations = {
  SET_GROUPS (state, groups) {
    let groupsObj = {}
    for (let i = 0; i < groups.length; i++) {
      groupsObj[groups[i].id] = groups[i]
    }
    state.groups = groups
    state.groupsObj = groupsObj
  },
  SET_ATTRS (state, attrs) {
    let attrsObj = {}
    for (let i = 0; i < attrs.length; i++) {
      attrs[i].group_name = state.groupsObj[attrs[i].attribute_group_id] ? state.groupsObj[attrs[i].attribute_group_id].name : ''
      attrsObj[attrs[i].id] = attrs[i]
    }
    state.attrs = attrs
    state.attrsObj = attrsObj
  }
}

const actions = {
  async fetchGroups ({ commit }) {
    try {
      let { data } = await getAttrGroups()
      commit('SET_GROUPS', data)
    } catch (e) {
    }
  },
  async fetchAttrs ({ commit }) {
    try {
      let { data } = await getAttrs()
      commit('SET_ATTRS', data)
    } catch (e) {
    }
  },
  async fetchAttrsWithGroups ({ commit }) {
    try {
      let [ groups, attrs ] = await Promise.all([getAttrGroups(), getAttrs()])
      commit('SET_GROUPS', groups.data)
      commit('SET_ATTRS', attrs.data)
    } catch (e) {
    }
  }
}

const getters = {
  groups: (state) => (state.groups),
  groupsObj: (state) => (state.groupsObj),
  attrs: (state) => (state.attrs)
}

const module = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default module