<template>
  <v-container fluid>
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
