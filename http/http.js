const evn = require('../env/index.js')
const api = require('./api')
const fetch = require('./fetch')

let baseUrl = evn.Dev.BaseUrl;

function index_banner() {
  return fetch(baseUrl + api.indexBanner, 'get', {})
}

function banner() {
  return fetch(baseUrl + api.banner, 'get', {})
}

function nav() {
  return fetch(baseUrl + api.nav, 'get', {})
}

function goods(params) {
  return fetch(baseUrl + api.goods, 'post', params)
}

function srcoll() {
  return fetch(baseUrl + api.srcoll, 'post', {
    pageSize: 5
  })
}

function classify() {
  return fetch(baseUrl + api.classify, 'get', {})
}

function detail(id) {
  return fetch(baseUrl + api.detail, 'get', {
    id: id
  })
}

function register(params) {
  return fetch(baseUrl + api.register, 'post', params)
}

function login(code) {
  return fetch(baseUrl + api.login, 'get', {
    code: code,
    type: 2
  })
}

function Info(token) {
  return fetch(baseUrl + api.Info, 'get', {
    token: token
  })
}

function add(token, id, num) {
  return fetch(baseUrl + api.add, 'post', {
    token: token,
    goodsId: id,
    number: num,
  })
}

function carList(token) {
  return fetch(baseUrl + api.carList, 'get', {
    token: token
  })
}

function removeCar(token, key) {
  return fetch(baseUrl + api.removeCar, 'post', {
    token: token,
    key: key,
  })
}

function carChange(token, key, num) {
  return fetch(baseUrl + api.carChange, 'post', {
    token: token,
    key: key,
    number: num,
  })
}

function address(token) {
  return fetch(baseUrl + api.address, 'get', {
    token: token
  })
}

function add_address(params) {
  return fetch(baseUrl + api.add_address, 'post', params)
}

function address_list(token) {
  return fetch(baseUrl + api.address_list, 'get', {
    token: token
  })
}

function remove_address(params) {
  return fetch(baseUrl + api.remove_address, 'post', params)
}

function news(id) {
  return fetch(baseUrl + api.news, 'get', {
    id: id
  })
}

module.exports = {
  index_banner,
  banner,
  nav,
  goods,
  srcoll,
  classify,
  detail,
  register,
  login,
  Info,
  add,
  carList,
  removeCar,
  carChange,
  address,
  add_address,
  address_list,
  remove_address,
  news,
}