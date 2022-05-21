import { defineStore } from 'pinia';
import { Cache, ShopData } from './i-data';
import * as api from './api-friend';
import * as apiFake from './api-friend-fake';

export const useStore = defineStore('store', {
    state: () => ({
        cache: <Cache>{
            post: {},
            oldP: {},
            map: {},
        },
    }),
    actions: {
        async fetchClassification() {
            if (!('classification' in this.cache)) {
                console.log('fetch classification.');
                this.cache.classification = await apiFake.fetchClassification();
                this.genarateClassificationMap();
            }
            return;
        },
        async fetchDataByPost(cityname: string) {
            if (!(cityname in this.cache.post)) {
                await this.fetchClassification();
                this.cache.post[cityname] = await apiFake.fetchInfoByPost(cityname);
                for (const shop of this.cache.post[cityname].data) {
                    this.transformShopInfo(shop);
                }
            }
            return this.cache.post[cityname];
        },
        async fetchDataByKey(...oldPKey: string[]) {
            for (const key of oldPKey) {
                await this.fetchClassification();
                if (!(key in this.cache.oldP)) {
                    const res = await apiFake.fetchInfoByKeys(...oldPKey);
                    console.log(res);
                    for (const item of res.data) {
                        this.cache.oldP[item.oldPKey] = this.transformShopInfo(item);
                    }
                }
            }
            return this.cache.oldP;
        },
        transformShopInfo(s: ShopData) {
            const info = s.info;
            const m = this.cache.map;
            for (const group of info) {
                group.groupName = m.group.get(group.code);
                for (const category of group.categories) {
                    category.categoryName = m.category.get(category.code);
                    for (const product of category.products) {
                        product.productName = m.product.get(product.code);
                    }
                }
            }
            return s;
        },
        genarateClassificationMap() {
            const cf = this.cache.classification.data;
            const groupMap = new Map<string, string>();
            const categoryMap = new Map<string, string>();
            const productMap = new Map<string, string>();
            for (let i = 0; i < cf.length; i++) {
                groupMap.set(cf[i].groupCode, cf[i].groupName);
                for (let j = 0; j < cf[i].categories.length; j++) {
                    const category = cf[i].categories[j];
                    categoryMap.set(category.categoryCode, category.categoryName);
                    for (let k = 0; k < category.products.length; k++) {
                        const product = category.products[k];
                        productMap.set(product.productCode, product.productName);
                    }
                }
            }
            this.cache.map.group = groupMap;
            this.cache.map.category = categoryMap;
            this.cache.map.product = productMap;
        },
    },
});
