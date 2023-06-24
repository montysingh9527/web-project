import { reactive } from "vue";
import { getCustomer } from "./uilt";

export default class Customers {
  constructor({ searchedData, data }) {
    console.log("--Customers---constructor-", searchedData, data);
    this.state = reactive({
      searchedData,
      data,
    });
  }

  get searchedData() {
    console.log(this.state);
    return this.state.searchedData;
  }
  set searchedData(newValue) {
    this.state.searchedData = newValue;
  }

  get data() {
    return this.state.data;
  }

  // 箭头函数this 指向实例
  setAge = (id, age) => {
    // this.state.searchedData  // 使用get方式  this.searchedData
    const customer = getCustomer(id, this.data, "id");
    customer.age = age;
  };
  search = (value) => {
    if (!isNaN(Number(value))) {
      console.log("----data-----", this.data);
      const customer = getCustomer(value, this.data, "id") || {};
      this.searchedData = customer;
      return;
    }

    this.searchedData = getCustomer(value, this.data, "name") || {};
  };
}
