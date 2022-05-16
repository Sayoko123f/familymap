import { defineStore } from 'pinia';
import { Cache, ShopData } from './i-data';
import * as api from './api-friend';
import * as apiFake from './api-friend-fake';

export const useStore = defineStore('store', {
    state: () => ({
        cache: <Cache>{
            post: {},
            oldP: {},
        },
    }),
    actions: {
        async fetchClassification() {
            if (!('classification' in this.cache)) {
                this.cache.classification = await apiFake.fetchClassification();
            }
            return this.cache.classification;
        },
        async fetchDataByPost(cityname: string) {
            if (!(cityname in this.cache.post)) {
                this.cache.post[cityname] = await apiFake.fetchInfoByPost(cityname);
            }
            return this.cache.post[cityname];
        },
        async fetchDataByKey(...oldPKey: string[]) {
            for (const key of oldPKey) {
                if (!(key in this.cache.oldP)) {
                    const res = await apiFake.fetchInfoByKeys(...oldPKey);
                    for (const item of res.data) {
                        this.cache.oldP[item.oldPKey] = item;
                    }
                }
            }
            return this.cache.oldP;
        },
        async transformShopInfo(s: ShopData) {
            const info = s.info;
            const cf = (await this.fetchClassification()).data;
            for (let group = 0; group < info.length; group++) {
                const groupCode = info[group].code;
                const groupIndex = cf.findIndex((e) => e.groupCode === groupCode);
                info[group].groupName = cf[groupIndex].groupName;
                for (
                    let category = 0;
                    category < info[group].categories.length;
                    category++
                ) {
                    const categoryCode = info[group].categories[category].code;
                    const categoryIndex = cf[groupIndex].categories.findIndex(
                        (c) => c.categoryCode === categoryCode
                    );
                    info[group].categories[category].categoryName =
                        cf[groupIndex].categories[categoryIndex].categoryName;
                    for (
                        let product = 0;
                        product < info[group].categories[category].products.length;
                        product++
                    ) {
                        const productCode =
                            info[group].categories[category].products[product].code;
                        const productIndex = cf[groupIndex].categories[
                            categoryIndex
                        ].products.findIndex((p) => p.productCode === productCode);
                        info[group].categories[category].products[product].productName =
                            cf[groupIndex].categories[categoryIndex].products[
                                productIndex
                            ].productName;
                    }
                }
            }
            return info;
        },
    },
});
