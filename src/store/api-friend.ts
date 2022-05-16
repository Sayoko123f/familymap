import axios from "axios";

const friend = axios.create({
  baseURL: "https://stamp.family.com.tw/api/cherishfood/",
});

/**
 *
 * @param  {string[]} keys
 * @returns {object}
 */
const generatePayloadByKeys = (...keys: string[]) => ({
  OldPKeys: [...keys],
  PostInfo: "",
  Latitude: 0,
  Longitude: 0,
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
});

// https://stamp.family.com.tw/api/cherishfood/CherishFoods
export const fetchClassification = friend.get("/Classification");

export const fetchInfoByKeys = (...keys: string[]) =>
  friend.post("/CherishFoods", generatePayloadByKeys(...keys));
export const fetchInfoByPost = (post: string) =>
  friend.post("/CherishFoods", generatePayloadByPost(post));
