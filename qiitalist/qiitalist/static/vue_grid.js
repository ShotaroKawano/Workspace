// // bootstrap the demo
// var demo = new Vue({
//   el: "#demo",
//   data: {
//     searchQuery: "",
//     gridColumns: ["name", "power"],
//     gridData: [
//       { name: "Chuck Norris", power: Infinity },
//       { name: "Bruce Lee", power: 9000 },
//       { name: "Jackie Chan", power: 7000 },
//       { name: "Jet Li", power: 8000 }
//     ]
//   }
// });


//new Vue部分だけRestAPIから指定のデータを取得するように改造
var demo = new Vue({
  el: '#demo',
  data: {
    searchQuery: '',
    gridColumns: ["id", "title", 'stock_count'], // 変更
    gridData: [] // データはAPIで取ってくるので削除
  },
  created: function () { //RestAPIから取ってきてgridDataに追加する。
    var self = this //スコープ的に必要っぽい（this.gridData.pushではエラーになる。）
    axios.get('/qiita/api/stock/')
      .then(function (response) {
        for (var i = 0; i < response.data.results.length; i++) {
          self.gridData.push(response.data.results[i]);
        }
      });
  }
})


//上部のコンポーネント実装部分はコピペなので割愛
// register the grid component
Vue.component("demo-grid", {
  template: "#grid-template",
  props: {
    heroes: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {};
    this.columns.forEach(function (key) {
      sortOrders[key] = 1;
    });
    return {
      sortKey: "",
      sortOrders: sortOrders
    };
  },
  computed: {
    filteredData: function() {
      return demo.gridData
    },
    filteredHeroes: function () {
      var sortKey = this.sortKey;
      var filterKey = this.filterKey && this.filterKey.toLowerCase();
      var order = this.sortOrders[sortKey] || 1;
      var heroes = this.heroes;
      if (filterKey) {
        heroes = heroes.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return (
              String(row[key])
                .toLowerCase()
                .indexOf(filterKey) > -1
            );
          });
        });
      }
      if (sortKey) {
        heroes = heroes.slice().sort(function (a, b) {
          a = a[sortKey];
          b = b[sortKey];
          return (a === b ? 0 : a > b ? 1 : -1) * order;
        });
      }
      return heroes;
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key;
      this.sortOrders[key] = this.sortOrders[key] * -1;
    }
  }
});
