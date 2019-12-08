<template>
  <v-container fluid>
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed
      temporary
      right
    >
      <div class="px-4 py-4">
        <h3 class="text-center mb-3">Фильтр</h3>
        <v-select label="Категория"
                  clearable
                  solo
                  :items="[{text: 'Фотошторы', value: 1},{text: 'Римские фотошторы', value: 2}]"
        />
        <v-select label="Изображения"
                  clearable
                  solo
                  :items="[{text: 'Без изображения', value: 1}]"
        />
        <v-select label="Метки"
                  clearable
                  solo
                  :items="[{text: 'От дизайнера', value: 1},{text: 'Супер цена', value: 2}]"
        />
        <v-select label="Показывать"
                  clearable
                  solo
                  :items="[{text: 'Опубликованные', value: 1},{text: 'Снято с публикации', value: 2}]"
        />
      </div>
    </v-navigation-drawer>
    <div class="d-flex align-center mb-4">
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Поиск"
      />
      <v-btn class="ml-3" icon large @click="drawer = !drawer">
        <v-icon>mdi-filter-variant</v-icon>
      </v-btn>
      <v-spacer />
    </div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="desserts"
      item-key="name"
      show-select
      class="elevation-1"
    >
      <template v-slot:item.name="{ value }">

        <v-tooltip bottom content-class="tooltip-img">
          <template v-slot:activator="{ on }">
            <span v-on="on"><v-icon>mdi-camera-image</v-icon></span>
            <v-btn :to="{ name: 'products.show', params: { productId: 3 } }" text>{{ value }}</v-btn>
          </template>
          <span>
            <v-img width="100" height="100" contain src="https://picsum.photos/1000/1000?random" lazy-src="https://picsum.photos/300/300?random"/>
          </span>
        </v-tooltip>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Название',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Категории',
          align: 'left',
          sortable: false,
          value: 'categories'
        },
        { text: 'Цена', value: 'price' },
        { text: 'Просмотры', value: 'hits' },
        { text: 'Сортировка', value: 'ordering' },
        { text: 'ID', value: 'id' }
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          categories: 'Фотошторы, Римские фотошторы',
          price: 6.0,
          hits: 24,
          ordering: 4.0,
          id: '1%'
        },
        {
          name: 'Ice cream sandwich',
          categories: 'Фотошторы, Римские фотошторы',
          price: 9.0,
          hits: 37,
          ordering: 4.3,
          id: '1%'
        },
        {
          name: 'Eclair',
          categories: 'Фотошторы, Римские фотошторы',
          price: 16.0,
          hits: 23,
          ordering: 6.0,
          id: '7%'
        },
        {
          name: 'Cupcake',
          categories: 'Фотошторы, Римские фотошторы',
          price: 3.7,
          hits: 67,
          ordering: 4.3,
          id: '8%'
        },
        {
          name: 'Gingerbread',
          categories: 'Фотошторы, Римские фотошторы',
          price: 16.0,
          hits: 49,
          ordering: 3.9,
          id: '16%'
        }
      ]
    }
  }
}
</script>
