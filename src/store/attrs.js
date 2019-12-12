import { getAttrGroups, getAttrs, uploadAttrs } from '../api/attrs'

const state = {
  groupsObj: {},
  groups: [],
  attrsObj: {},
  attrs: [],
  uploadAttrs: []
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
  },
  SET_UPLOAD_ID (state, uploadId) {
    for (let i = 0; i < state.uploadAttrs.length; i++) {
      if (!state.uploadAttrs[i].uploadId) {
        state.uploadAttrs[i].uploadId = uploadId
      }
    }
  },
  SET_UPLOADED_ATTRS (state, { uploadId, attrs }) {
    let uploadAttrs = []
    for (let i = 0; i < state.uploadAttrs.length; i++) {
      if (state.uploadAttrs[i].uploadId !== uploadId) {
        uploadAttrs.push(state.uploadAttrs[i])
      }
    }

    let newAttrsObj = {}
    let newAttrs = []
    let oldAttrs = [...attrs, ...state.attrs]
    oldAttrs.forEach(function (value) {
      if (!newAttrsObj[value.id]) {
        value.group_name = state.groupsObj[value.attribute_group_id] ? state.groupsObj[value.attribute_group_id].name : ''
        newAttrs.push(value)
        newAttrsObj[value.id] = value
      }
    })
    newAttrs = newAttrs.sort((a, b) => (b.ordering - a.ordering))
    state.attrs = newAttrs
    state.uploadAttrs = uploadAttrs
  },
  ADD_UPLOAD_ATTRS (state, attr) {
    attr.group_name = state.groupsObj[attr.attribute_group_id] ? state.groupsObj[attr.attribute_group_id].name : ''
    let attrs = [...state.uploadAttrs, ...state.attrs]
    let max = attrs[0].ordering
    attrs.forEach(function (val) { if (val > max) { max = val } })
    attr.ordering = max + 1
    state.uploadAttrs.unshift(attr)
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
  },
  async uploadAttribute ({ commit, getters, dispatch }) {
    try {
      let uploadId = Math.random() * 1000000
      commit('SET_UPLOAD_ID', uploadId)
      let attrs = []
      getters.uploadAttrs.forEach(function (value) {
        if (value.uploadId === uploadId) {
          attrs.push(value)
        }
      })
      let { data } = await uploadAttrs({ attrs })
      commit('SET_UPLOADED_ATTRS', { uploadId, attrs: data.attrs })
      if (data.attrsCount !== getters.attrs.length) {
        await dispatch('fetchAttrs')
      }
    } catch (e) {
    }
  },
  async addUploadAttribute ({ commit, dispatch }, attr) {
    commit('ADD_UPLOAD_ATTRS', { ...attr })
    await dispatch('uploadAttribute')
  }
}

const getters = {
  groups: (state) => (state.groups),
  groupsObj: (state) => (state.groupsObj),
  attrs: (state) => (state.attrs),
  uploadAttrs: (state) => (state.uploadAttrs)
}

const module = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default module
