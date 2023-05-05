<template>
    <view class="check-company">
        <u-skeleton :loading="loading" :rowsHeight="120" :title="false" rows="10">
            <uni-collapse>
                <uni-collapse-item v-for="(item, index) in company_data" :key="index"
                                   :show-arrow="item.child instanceof Array && item.child.length>0"
                                   class="company-cell">
                    <view slot="title" class="uni-title x-padding-10" @click.stop="checkCompany(item)">
                        <u-icon
                                :label="item.thing_name"
                                :name="getCheckIcon(item)"
                                color="#2979ff"
                                size="24"
                        ></u-icon>
                    </view>
                    <view class="u-flex-column" style="background: #F1F2F4;padding-left: 24px">
                        <view
                                v-for="(childItem, childIndex) in item.child"
                                :key="childIndex"
                                class="flex-item x-padding-10"
                                @click="checkCompany(childItem)"
                        >
                            <u-icon
                                    :label="childItem.thing_name"
                                    :name="getCheckIcon(childItem)"
                                    color="#2979ff"
                                    size="24"
                            ></u-icon>
                        </view>
                    </view>
                </uni-collapse-item>
            </uni-collapse>
        </u-skeleton>
    </view>
</template>

<script>
export default {
	name: "the-check-company",
	data() {
		return {
			loading:false,
			company: uni.$x.localStorage.getStore("company"),
			company_data: [],
			checkCompanyList: [],
		};
	},
	computed: {},
	watch: {},
	methods: {
		getCompanyList() {
			this.loading = true;
			uni.$x.api.get_filter_linkage().then((res) => {
				let myCompany = [
					{
						thing_id: this.company.id,
						thing_name: this.company.name,
						thing_type: this.company.type,
					},
				];
				myCompany = myCompany.concat(res);
				this.company_data = myCompany;
			}).finally(()=>this.loading=false);
		},
		getCheckIcon(item) {
			return item.thing_id == this.company.checkCompany.id
				? "star-fill"
				: "star";
		},
		checkCompany(item) {
			this.company.checkCompany.id = item.thing_id;
			this.company.checkCompany.name = item.thing_name;
			this.company.checkCompany.type = item.thing_type;
			uni.$emit("switchCompany", this.company);
		},
	},
	mounted() {
		this.getCompanyList();
	},
};
</script>

<style lang="scss" scoped>
.check-company {
  height: 100%;
  width: 100%;
  background: #FFFFFF;
}
</style>
