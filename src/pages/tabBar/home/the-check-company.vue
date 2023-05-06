<template>
    <view class="check-company">
        <x-navbar>
            <view slot="left">
                <u-icon class="close" name="close" size="24" @click="close"></u-icon>
            </view>
            <view slot="title">
                <u-search v-model="keyword" placeholder="请输入单位名称" @change="search" :showAction="false" bgColor="#FFFFFF" height="25px"></u-search>
            </view>
        </x-navbar>
        <view class="content">
            <scroll-view :enable-back-to-top="true" :scroll-y="true" class="warp u-flex-column u-flex-fill" @tap.stop>
                <u-skeleton :loading="loading" :rowsHeight="120" :title="false" rows="10">
                    <uni-collapse>
                        <uni-collapse-item v-for="(item, index) in company_list" :key="index"
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
            </scroll-view>
        </view>
    </view>
</template>

<script>
import {loadingStatus} from "@/common/js/decorator";

export default {
	name: "the-check-company",
	props: {
		show: {
			type: [Boolean],
			default: false,
		}
	},
	data() {
		return {
			loading: false,
			company: uni.$x.localStorage.getStore("company"),
			company_data: [],
			checkCompanyList: [],
			keyword: "",
		};
	},
	computed: {
		company_list() {
			if (!this.keyword) {
				return this.company_data;
			}
			return this.filterByThingName(this.company_data, 'thing_name', this.keyword);
		}
	},
	watch: {},
	methods: {
		filterByThingName(data, key, value) {
			let result = [];
			let fn = function (data) {
				if (Array.isArray(data)) { // 判断是否是数组并且没有的情况下，
					data.forEach(item => {
						if (item[key].includes(value)) {
							result.push(item);
						} else if (item.child) {
							fn(item.child);
						}
					})
				}
			}
			fn(data); // 调用一下
			return result;
		},
		
		@loadingStatus('loading')
		getCompanyList() {
			return uni.$x.api.get_filter_linkage().then((res) => {
				// 转化为相同结构
				let myCompany = [
					{
						thing_id: this.company.id,
						thing_name: this.company.name,
						thing_type: this.company.type,
					},
				];
				myCompany = myCompany.concat(res);
				this.company_data = myCompany;
			})
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
		close() {
			this.$emit('close', false)
		},
		search() {
		
		}
	},
	mounted() {
		this.getCompanyList();
	},
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  width: 100%;
}


.check-company {
  background: #FFFFFF;
  height: 100%;
  width: 100%;

  .close {
    padding: 10px;
    text-align: center;
  }
}

.warp {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #FFFFFF;
}

</style>
