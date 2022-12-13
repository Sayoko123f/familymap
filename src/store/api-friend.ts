import axios from 'axios';
import { ShopData, Cache } from './i-data';

const friend = axios.create({
    baseURL: 'https://stamp.family.com.tw/api/maps/',
});

/**
 *
 * @param  {string[]} keys
 * @returns {object}
 */
const generatePayloadByKeys = (...keys: string[]) => ({
    OldPKeys: [...keys],
    PostInfo: '',
    Latitude: 0,
    Longitude: 0,
    ProjectCode: '202106302',
});

/**
 *
 * @param {string} post
 * @returns {object}
 */
const generatePayloadByPost = (post: string) => ({
    OldPKeys: [],
    PostInfo: post,
    Latitude: 0,
    Longitude: 0,
    ProjectCode: '202106302',
});

export const fetchClassification = () =>
    friend.get('/MapClassificationInfo?ProjectCode=202106302');

export const fetchInfoByKeys = (...keys: string[]) =>
    friend.post('/MapProductInfo', generatePayloadByKeys(...keys));
export const fetchInfoByPost = (post: string) =>
    friend.post('/MapProductInfo', generatePayloadByPost(post));
