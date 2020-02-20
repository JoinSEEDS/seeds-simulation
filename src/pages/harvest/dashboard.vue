<template lang="pug">
    div.q-ma-xl.q-gutter-xl

        .div(@click="selectTable(1)")
            q-table(
            :data="data"
            :columns="columns"
            row-key="name"
            :card-class="{'bg-grey-5': tableSelected == 1}"
            )

        .div(@click="selectTable(2)")
            q-table(
            :data="data"
            :columns="columns"
            row-key="name"
            :card-class="{'bg-grey-5': tableSelected == 2}"
            )
</template>

<script>
export default {
  name: 'harvest-dashboard',
  methods: {
    /**
     * This method toggle select between the tables
     */
    selectTable (table) {
      this.tableSelected = table
    }
  },
  data () {
    return {
      tableSelected: false,
      columns: [
        {
          name: 'name',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true,
          // classes: 'bg-grey-2 ellipsis',
          headerClasses: 'bg-primary text-white',
          style: 'max-width: 100px'
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true, headerClasses: 'bg-primary text-white' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium', headerClasses: 'bg-primary text-white' },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, headerClasses: 'bg-primary text-white', sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          sodium: 87,
          calcium: '14%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          sodium: 50,
          calcium: '0%',
          iron: '0%'
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          sodium: 38,
          calcium: '0%',
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          sodium: 562,
          calcium: '0%',
          iron: '45%'
        },
        {
          name: 'Donut',
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          sodium: 326,
          calcium: '2%',
          iron: '22%'
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          sodium: 54,
          calcium: '12%',
          iron: '6%'
        }
      ]
    }
  }
}
</script>
