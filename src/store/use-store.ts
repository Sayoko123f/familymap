import { defineStore } from 'pinia';
import { Cache, ShopData } from './i-data';
import * as api from './api-friend';

export const useStore = defineStore('store', {
    state: () => ({
        cache: <Cache>{
            post: {},
            oldP: {},
            map: {},
        },
        favorite: {
            friendly: JSON.parse(
                localStorage.getItem('friendly-favorite') || '[]'
            ) as string[],
        },
    }),
    actions: {
        async fetchClassification() {
            if (!('classification' in this.cache)) {
                console.log('fetch classification.');
                this.cache.classification = (await api.fetchClassification()).data;
                this.genarateClassificationMap();
            }
            return;
        },
        async fetchDataByPost(cityname: string) {
            if (!(cityname in this.cache.post)) {
                await this.fetchClassification();
                this.cache.post[cityname] = (await api.fetchInfoByPost(cityname)).data;
                for (const shop of this.cache.post[cityname].data) {
                    this.transformShopInfo(shop);
                }
            }
            return this.cache.post[cityname];
        },
        async fetchDataByKey(...oldPKey: string[]) {
            await this.fetchClassification();
            for (const key of oldPKey) {
                if (!(key in this.cache.oldP)) {
                    const res = await api.fetchInfoByKeys(...oldPKey);
                    console.log(res);
                    for (const item of res.data.data) {
                        this.cache.oldP[item.oldPKey] = this.transformShopInfo(item);
                    }
                }
            }
            return this.cache.oldP;
        },
        transformShopInfo(s: ShopData) {
            console.log(s);

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
        addFavorite(oldPKey: string) {
            this.favorite.friendly.push(oldPKey);
            localStorage.setItem(
                'friendly-favorite',
                JSON.stringify(this.favorite.friendly)
            );
        },
        removeFavorite(oldPKey: string) {
            const index = this.favorite.friendly.findIndex((e) => e === oldPKey);
            if (index === -1) {
                return;
            }
            this.favorite.friendly.splice(index, 1);
            localStorage.setItem(
                'friendly-favorite',
                JSON.stringify(this.favorite.friendly)
            );
        },
        async fetchFavoriteShopData() {
            await this.fetchClassification();
            await this.fetchDataByKey(...this.favorite.friendly);
        },
    },
});
