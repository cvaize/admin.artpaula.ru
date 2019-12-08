<template>
  <v-container fluid>
    <v-breadcrumbs class="breadcrumbs-no-disabled" :items="breadcrumbs" divider=">"/>
    <v-tabs
      v-model="tab"
    >
      <v-tabs-slider/>

      <v-tab href="#tab-1">
        Информация о товаре
      </v-tab>

      <v-tab href="#tab-2">
        Зависимые атрибуты
      </v-tab>

      <v-tab href="#tab-3">
        Независимые атрибуты
      </v-tab>

      <v-tab href="#tab-4">
        Характеристики
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item
        :value="'tab-1'"
      >
        <v-card flat>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field label="Наименование*" class="pb-lg-3"/>
                <v-text-field label="Алиас"/>
                <v-text-field label="META Title"/>
                <v-text-field label="META Description"/>
                <v-text-field label="META Keywords"/>
              </v-col>
              <v-col cols="12" md="6">
                <v-row>
                  <v-col cols="12" lg="6" class="py-0">
                    <v-text-field type="number" label="Цена*"/>
                  </v-col>
                  <v-col cols="12" lg="6" class="py-0">
                    <v-switch
                      label="Публикация"
                      color="success"
                    />
                  </v-col>
                </v-row>
                <v-select label="Категория*" chips multiple :items="[{text: 'Фотошторы', value: 1},{text: 'Фототюли', value: 2}]"/>
                <v-select label="Метки" chips multiple :items="[{text: 'От дизайнера', value: 1},{text: 'Супер цена', value: 2}]"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
        :value="'tab-2'"
        class="pb-5"
      >
        <v-card flat>
          <v-card-text>

            <v-simple-table
              fixed-header
              height="400"
            >
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">Материал</th>
                  <th class="text-left">Ширина</th>
                  <th class="text-left">Материал</th>
                  <th class="text-left">Ширина</th>
                  <th class="text-left">Материал</th>
                  <th class="text-left">Ширина</th>
                  <th class="text-left">Материал</th>
                  <th class="text-left">Ширина</th>
                  <th class="text-left">Цена</th>
                  <th class="text-left"><v-checkbox color="info"/></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="n in 10" :key="n">
                  <td>Грант Паула</td>
                  <td>100 {{ n }}</td>
                  <td>Грант Паула</td>
                  <td>100 {{ n }}</td>
                  <td>Грант Паула</td>
                  <td>100 {{ n }}</td>
                  <td>Грант Паула</td>
                  <td>100 {{ n }}</td>
                  <td><v-text-field style="min-width: 100px;" type="number" label="Цена*"/></td>
                  <td><v-checkbox color="info"/></td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
            <div class="d-flex justify-end align-center px-2 my-2" style="background: rgba(0,0,0,.04);">
              <v-switch
                label="Снять ограничение высоты таблицы"
                color="info"
                class="mr-auto"
              />
              <v-btn color="error">Удалить выбранное</v-btn>
            </div>
            <h2 class="text-center pt-3">
              Добавить атрибут
            </h2>
            <v-row class="pb-5">
              <v-col cols="12" md="6">
                <v-select label="Категория*" :items="[{text: 'Фотошторы', value: 1},{text: 'Фототюли', value: 2}]"/>
                <v-select label="Цвет" :items="[{text: 'Красные', value: 1},{text: 'Белый', value: 2}]"/>
                <v-select label="Категория*" :items="[{text: 'Фотошторы', value: 1},{text: 'Фототюли', value: 2}]"/>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field type="number" label="Цена*"/>
                <div class="d-flex justify-end align-end py-3">
                  <v-btn color="secondary" class="mr-auto">Добавить все</v-btn>
                  <v-btn color="primary">Добавить</v-btn>
                </div>
                Кнопка "Добавить все" удалит все добавленные ранее атрибуты и добавит все атрибуты и их значения без цены,
                вам нужно будет только указать цены
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
        :value="'tab-3'"
        class="pb-5"
      >
        <v-card flat class="pb-5">
          <v-card-text>

            <v-row>
              <v-col cols="12" lg="9">
                <div>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                      <tr>
                        <th class="text-left w-100">Добавить подхваты</th>
                        <th class="text-left">+ к цене</th>
                        <th class="text-left">Действие</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="n in 10" :key="n">
                        <td>Грант Паула Грант Паула</td>
                        <td><v-text-field class="py-0 my-0" style="width: 100px;" type="number"/></td>
                        <td><v-btn color="error" small>Удалить</v-btn></td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>

                <v-row>
                  <v-col cols="12" md="5">
                    <div class="pl-3">
                      <v-select label="Добавить подхваты" :items="[{text: 'Красные', value: 1},{text: 'Белый', value: 2}]"/>
                    </div>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field type="number" label="+ к цене"/>
                  </v-col>
                  <v-col cols="12" md="4">
                    <div class="d-flex justify-end align-end py-3">
                      <v-btn color="secondary" class="mr-auto mb-3" title="Добавить все">+ все</v-btn>
                      <v-btn color="primary" class="mb-3">Добавить</v-btn>
                    </div>
                  </v-col>
                </v-row>

              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12" lg="9">
                <div>
                  <v-simple-table>
                    <template v-slot:default>
                      <thead>
                      <tr>
                        <th class="text-left w-100">Добавить подхваты</th>
                        <th class="text-left">+ к цене</th>
                        <th class="text-left">Действие</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="n in 10" :key="n">
                        <td>Грант Паула Грант Паула</td>
                        <td><v-text-field class="py-0 my-0" style="width: 100px;" type="number"/></td>
                        <td><v-btn color="error" small>Удалить</v-btn></td>
                      </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>

                <v-row>
                  <v-col cols="12" md="5">
                    <div class="pl-3">
                      <v-select label="Добавить подхваты" :items="[{text: 'Красные', value: 1},{text: 'Белый', value: 2}]"/>
                    </div>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-text-field type="number" label="+ к цене"/>
                  </v-col>
                  <v-col cols="12" md="4">
                    <div class="d-flex justify-end align-end py-3">
                      <v-btn color="secondary" class="mr-auto mb-3" title="Добавить все">+ все</v-btn>
                      <v-btn color="primary" class="mb-3">Добавить</v-btn>
                    </div>
                  </v-col>
                </v-row>

              </v-col>
            </v-row>

          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item
        :value="'tab-4'"
      >
        <v-card flat>
          <v-card-text>
            <v-row>
              <v-col cols="12" md="6" lg="4">
                <v-select label="Цвет" :items="[{text: 'Красные', value: 1},{text: 'Белый', value: 2}]"/>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      tab: null,
      breadcrumbs: [
        {
          text: 'Товары',
          disabled: false,
          to: { name: 'products.index' }
        },
        {
          text: 'Название товара',
          disabled: true,
          to: { name: 'products.show', params: { productId: 3 } }
        }
      ]
    }
  }
}
</script>
