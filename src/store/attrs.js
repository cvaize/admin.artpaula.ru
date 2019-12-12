import Vue from 'vue'
import { getAttrGroups, getAttrs, uploadAttrs, deleteAttrs } from '../api/attrs'

const state = {
  groupsObj: {},
  groups: [],
  attrsObj: {},
  attrs: [],
  uploadAttrs: [],
  deletedAttrs: {}
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
      attrs[i].i = i
      attrs[i].group_name = state.groupsObj[attrs[i].attribute_group_id] ? state.groupsObj[attrs[i].attribute_group_id].name : ''
      attrsObj[attrs[i].id] = attrs[i]
    }
    state.attrs = attrs
    state.attrsObj = attrsObj
    state.deletedAttrs = {}
  },
  SET_ATTR (state, attr) {
    attr.group_name = state.groupsObj[attr.attribute_group_id] ? state.groupsObj[attr.attribute_group_id].name : ''
    for (let i = 0; i < state.attrs.length; i++) {
      if (state.attrs[i].id === attr.id) {
        Vue.set(state.attrsObj, attr.id, attr)
        Vue.set(state.attrs, i, attr)
        break
      }
    }
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
    oldAttrs.forEach(function (value, i) {
      if (!newAttrsObj[value.id]) {
        value.i = newAttrs.length
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
    if (!attr.id) {
      let max = attrs[0].ordering
      attrs.forEach(function (val) { if (val > max) { max = val } })
      attr.ordering = max + 1
    }
    state.uploadAttrs.unshift(attr)
  },
  ADD_DELETE_ATTRS (state, attrsId) {
    attrsId.forEach(function (attrId) {
      Vue.set(state.deletedAttrs, attrId, true)
    })
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
  async uploadAttribute ({ commit, getters, dispatch, state }) {
    try {
      let uploadId = Math.random() * 1000000
      commit('SET_UPLOAD_ID', uploadId)
      let attrs = []
      state.uploadAttrs.forEach(function (value) {
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
    if (attr.id) {
      commit('SET_ATTR', { ...attr })
    }
    commit('ADD_UPLOAD_ATTRS', { ...attr })
    await dispatch('uploadAttribute')
  },
  async deleteAttrs ({ commit, dispatch }, attrs) {
    let attrsId = attrs.map(attr => attr.id)
    commit('ADD_DELETE_ATTRS', attrsId)
    await deleteAttrs(attrsId)
  }
}

const getters = {
  groups: (state) => (state.groups),
  groupsObj: (state) => (state.groupsObj),
  attrsObj: (state) => (state.attrsObj),
  attrs: (state) => (state.attrs.filter(attr => !state.deletedAttrs[attr.id])),
  uploadAttrs: (state) => (state.uploadAttrs.filter(attr => !attr.id))
}

const module = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default module
