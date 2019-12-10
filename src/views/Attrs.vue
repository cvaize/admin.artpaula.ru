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
        >
          Создание атрибута
        </v-card-title>

        <v-card-text>
          <v-text-field label="Наименование*" v-model="form.name" />
          <v-text-field label="Заполнитель" v-model="form.placeholder" />
          <v-switch
            label="Использовать заполнитель"
            color="primary"
            hide-details
            v-model="form.use_placeholder"
          />
          <v-radio-group v-model="form.attribute_group_id">
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
          <v-radio-group v-model="form.type_id">
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
          <v-spacer/>
          <v-btn
            color="primary"
            text
            @click="dialogAddAttr = false"
          >
            Создать
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card>
      <v-card-title class="pt-0">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="mr-3 mt-5" icon v-on="on">
              <v-icon>mdi-delete-forever</v-icon>
            </v-btn>
          </template>
          <span>Удалить выбранные</span>
        </v-tooltip>
        <v-row>
          <v-col md>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Поиск"
              single-line
              hide-details
            />
          </v-col>
          <v-col md="3">
            <v-select
              label="Группа"
              placeholder="Все атрибуты"
              :items="groups"
              item-text="name"
              item-value="id"
              clearable
              single-line
              hide-details
            />
          </v-col>
        </v-row>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn class="ml-3 mt-5" icon v-on="on" @click="dialogAddAttr = true">
              <v-icon>mdi-plus-box-outline</v-icon>
            </v-btn>
          </template>
          <span>Добавить атрибут</span>
        </v-tooltip>
      </v-card-title>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :hide-default-footer="true"
        :items-per-page="1000000"
        :search="search"
        item-key="name"
        show-select
        class="elevation-1"
      />
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

const defaultForm = function () {
  return {
    name: null,
    name_admin: null,
    placeholder: null,
    use_placeholder: true,
    type_id: 1,
    attribute_group_id: 1,
    ignore_group_copy: false
  }
}

export default {
  data () {
    return {
      group: 1,
      radios: '1',
      dialogAddAttr: false,
      search: '',
      drawer: false,
      singleSelect: false,
      selected: [],
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
          value: 'options'
        },
        { text: 'Зависимый', value: 'dependent' },
        { text: 'Группа', value: 'group' },
        { text: 'Сортировка', value: 'ordering' },
        { text: 'ID', value: 'id' },
        { text: 'Действия', value: 'action' }
      ],
      footer: {
        options: {
          itemsPerPage: 100
        }
      },
      desserts: []
    }
  },
  computed: {
    ...mapGetters({
      groups: 'attrs/groups'
    })
  },
  methods: {
    ...mapActions({
      fetchGroups: 'attrs/fetchGroups'
    })
  },
  async mounted () {
    await this.fetchGroups()
    if (this.groups[0]) {
      this.defaultForm.attribute_group_id = this.groups[0].id
      this.form.attribute_group_id = this.groups[0].id
    }
  }
}
</script>
