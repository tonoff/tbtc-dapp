import axios from "axios"

export const keeperIndexer = axios.create({
  baseURL: process.env.KEEPER_INDEXER_HOST || "http://62.171.139.205:8080",
})

export const getTdtId = (lotSize) =>
  keeperIndexer
    .get(`/api/op/tdt_id?lot=${lotSize}&token=TBTC`)
    .then((result) => result.data)
    .catch(() => "0xc7df12bef0beb8d698a32faf93c432202fb56fe0")
