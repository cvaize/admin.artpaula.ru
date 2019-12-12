<template>
  <v-container fluid>
    <v-dialog
      v-model="dialogAddAttr"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
          v-text="form.id?'Изменение атрибута':'Создание атрибута'"
        />

        <v-card-text>
          <v-form v-model="formValid" ref="form" @submit="submitForm">
            <v-text-field label="Наименование*" v-model="form.name" :rules="nameRules"/>
            <v-text-field label="Заполнитель" v-model="form.placeholder" />
            <v-switch
              label="Использовать заполнитель"
              color="primary"
              hide-details
              v-model="form.use_placeholder"
            />
            <v-radio-group v-model="form.attribute_group_id" hide-details>
              <template v-slot:label>
                <div>Группа</div>
              </template>
              <v-radio v-for="(group, key) in groups" :key="key" :value="group.id" color="primary">
                <template v-slot:label>
                  <div v-text="group.name"/>
                </template>
              </v-radio>
            </v-radio-group>
            <v-switch
              label="Игнорировать при групповом копировании (только для независимых атрибутов)"
              color="primary"
              hide-details
              v-model="form.ignore_group_copy"
            />
            <v-radio-group v-model="form.dependent">
              <template v-slot:label>
                <div>Зависимый атрибут</div>
              </template>
              <v-radio :value="1" color="primary">
                <template v-slot:label>
                  <div>Да, он будет обязательным и от него напрямую будет зависить цена</div>
                </template>
              </v-radio>
              <v-radio :value="0" color="primary">
                <template v-slot:label>
                  <div>Нет, он будет лишь + к стоимости товара</div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-form>
        </v-card-text>

        <v-divider/>

        <v-card-actions>
          <v-btn
            color="error"
            text
            @click="dialogAddAttr = false"
          >
            Отмена
          </v-btn>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on" @click="setDefaultCreate(form.id, true)">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </template>
            <span>Сбросить форму</span>
          </v-tooltip>
          <v-spacer/>
          <v-btn
            color="primary"
            text
            @click="submitForm"
          v-text="form.id?'Сохранить':'Создать'"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-skeleton-loader
      v-if="loadingAttrs"
      type="table"
    />
    <v-card
      v-else>
      <v-card-title class="pt-0">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="mr-3 mt-5" icon v-on="on" @click="onClickDelete(selectedAttrs)">
              <v-icon>mdi-delete-forever</v-icon>
            </v-btn>
          </template>
          <span>Удалить выбранные</span>
        </v-tooltip>
        <v-row>
          <v-col>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Поиск по наименованию, опциям, группе"
              single-line
              hide-details
              clearable
            />
          </v-col>
        </v-row>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-3 mt-5" icon v-on="on" @click="refresh">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </template>
          <span>Обновить список</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-3 mt-5" icon v-on="on" @click="openDialogAddAttr">
              <v-icon>mdi-plus-box-outline</v-icon>
            </v-btn>
          </template>
          <span>Добавить атрибут</span>
        </v-tooltip>
      </v-card-title>
      <v-data-table
        v-model="selectedAttrs"
        :headers="headers"
        :items="items"
        :hide-default-footer="true"
        :items-per-page="1000000"
        :search="search"
        item-key="name"
        show-select
        class="elevation-1 table-sorting"
      >
        <template v-slot:item.name="{ value }">
          <span v-html="getSearchValue(search, value)"/>
        </template>
        <template v-slot:item.values_str="{ value, item }">
          <v-skeleton-loader
            v-if="!item.id"
            type="text"
          />
          <template v-else>
            <router-link to="">Опции</router-link>(<span v-html="getSearchValue(search, value)"/>)
          </template>
        </template>
        <template v-slot:item.id="{ value }">
          <v-skeleton-loader
            v-if="!value"
            type="text"
          />
          <template v-else>{{ value }}</template>
        </template>
        <template v-slot:item.group_name="{ value }">
          <span v-html="getSearchValue(search, value)"/>
        </template>
        <template v-slot:item.dependent="{ value }">
          {{ value?'Да':'Нет' }}
        </template>
        <template v-slot:item.action="{ item }">
          <div class="d-flex align-center">
            <v-skeleton-loader
              v-if="!item.id"
              type="button"
            />
            <v-tooltip v-if="item.id" bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="openDialogAddAttr(item.id)">
                  <v-icon>mdi-square-edit-outline</v-icon>
                </v-btn>
              </template>
              <span>Редактировать</span>
            </v-tooltip>
            <v-tooltip v-if="item.id" bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" @click="onClickDelete([item])">
                  <v-icon>mdi-delete-forever</v-icon>
                </v-btn>
              </template>
              <span>Удалить</span>
            </v-tooltip>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const defaultForm = function () {
  return {
    id: null,
    name: null,
    name_admin: null,
    placeholder: null,
    use_placeholder: 1,
    dependent: 1,
    attribute_group_id: 1,
    ignore_group_copy: 0
  }
}

export default {
  data () {
    return {
      timeout: null,
      timeoutTime: 5000, // Установите 0, для отключения, измеряется в милисекундах
      formValid: false,
      nameRules: [
        v => !!v || 'Обязательно укажите наименование'
      ],
      loadingAttrs: true,
      dialogAddAttr: false,
      search: '',
      drawer: false,
      singleSelect: false,
      selectedAttrs: [],
      defaultForm: defaultForm(),
      form: defaultForm(),
      headers: [
        {
          text: 'Наименование',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Опции',
          align: 'left',
          sortable: false,
          value: 'values_str'
        },
        { text: 'Зависимый', value: 'dependent' },
        { text: 'Группа', value: 'group_name' },
        { text: 'Сортировка', value: 'ordering' },
        { text: 'ID', value: 'id' },
        { text: 'Действия', value: 'action', sortable: false }
      ]
    }
  },
  computed: {
    ...mapGetters({
      groups: 'attrs/groups',
      groupsObj: 'attrs/groupsObj',
      attrs: 'attrs/attrs',
      attrsObj: 'attrs/attrsObj',
      uploadAttrs: 'attrs/uploadAttrs'
    }),
    items () {
      return [...this.uploadAttrs, ...this.attrs]
    }
  },
  methods: {
    ...mapActions({
      fetchAttrsWithGroups: 'attrs/fetchAttrsWithGroups',
      fetchAttrs: 'attrs/fetchAttrs',
      addUploadAttribute: 'attrs/addUploadAttribute',
      deleteAttrs: 'attrs/deleteAttrs'
    }),
    resetValidation () {
      this.$refs.form.resetValidation()
    },
    setDefaultCreate (id, reset) {
      if (id && this.attrsObj[id]) {
        this.form = { ...this.attrsObj[id] }
      } else {
        this.form = { ...this.defaultForm }
      }
      reset && this.resetValidation()
    },
    submitForm () {
      if (this.$refs.form.validate()) {
        this.addUploadAttribute(this.form)
        this.dialogAddAttr = false
      }
    },
    getSearchValue (search, value) {
      if (!search || !value) {
        return value
      }
      // eslint-disable-next-line no-useless-escape
      return value.replace(new RegExp('(' + search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&').split(' ').join('|') + ')', 'gi'), '<mark>$1</mark>')
    },
    async refresh () {
      this.loadingAttrs = true
      await this.timeoutFetchAttrs(this)
      this.loadingAttrs = false
    },
    async timeoutFetchAttrs (th) {
      clearTimeout(th.timeout)
      await th.fetchAttrs()
      if (th.timeoutTime) {
        th.timeout = setTimeout(th.timeoutFetchAttrs, th.timeoutTime, th)
      }
    },
    async onClickDelete (items) {
      if (items.length === 1) {
        confirm(`Удалить "${items[0].name}"?`) && this.deleteAttrs(items)
      } else {
        confirm('Удалить выбранные атрибуты?') && this.deleteAttrs(items)
      }
      if (this.timeoutTime) {
        clearTimeout(this.timeout)
        this.timeout = setTimeout(this.timeoutFetchAttrs, this.timeoutTime, this)
      }
    },
    openDialogAddAttr (id) {
      this.setDefaultCreate(id)
      this.dialogAddAttr = true
    }
  },
  async mounted () {
    this.loadingAttrs = !this.attrs.length
    await this.fetchAttrsWithGroups()
    if (this.groups[0]) {
      this.defaultForm.attribute_group_id = this.groups[0].id
      this.form.attribute_group_id = this.groups[0].id
    }
    this.loadingAttrs = false
    if (this.timeoutTime) {
      this.timeout = setTimeout(this.timeoutFetchAttrs, this.timeoutTime, this)
    }
  },
  beforeDestroy () {
    clearTimeout(this.timeout)
  }
}
</script>
