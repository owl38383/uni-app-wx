<script>
export default {
  name: "the-home-card",
  data() {
    return {
      statistics: {},
    };
  },
  methods: {
    get_card_count() {
      uni.$x.api.get_count_by_cared_v2().then((res) => {
        this.statistics = res;
      });
    },
  },
  mounted() {
    this.get_card_count();
  },
};
</script>
