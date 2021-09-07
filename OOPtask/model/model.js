const products = [
  { id: 1, name: 'Dolce', count: 25, price: 25000 },
  { id: 2, name: 'Versaci', count: 15, price: 15000 },
  { id: 3, name: 'Lui vuitton', count: 10, price: 55000 },
];

export class Model {
  constructor(storage) {
    this.storage = storage;
    this.sortConfig = { paramater: '', direction: '' };
    this.found = [];
    this.newProduct = {};
    this.validationErrors = {};
  }
  bindProductListChanged(callback) {
    this.onProductListChanged = callback;
  }

  sortProducts(parameter, direction) {
    this.storage.sort((a, b) =>
      direction === 'asc' ? a[parameter] - b[parameter] : b[parameter] - a[parameter]
    );
    direction === 'desc'
      ? (this.sortConfig = { paramater: '', direction: 'desc' })
      : (this.sortConfig = { paramater: '', direction: 'asc' });
  }

  addNewProduct(product) {
    console.log('product', product);
    //Name Validation
    if (product.name === '') {
      this.validationErrors = { name: 'name should not be empty' };
      return;
    } else if (!/[^ ]/.test(product.name)) {
      this.validationErrors = { name: 'only spaces,include a character' };
      return;
    }
    //Count Validation

    console.log(typeof product.count);
    let lastItemId = this.storage[this.storage.length - 1];
    lastItemId ? (lastItemId = this.storage[this.storage.length - 1].id) : 0;

    this.storage.push({ ...product, id: lastItemId + 1 });
    this.validationErrors = {};
  }

  deleteProduct(productId) {
    console.log('model delete fired');
    this.storage = this.storage.filter((product) => product.id !== productId);
  }

  showStorage() {
    console.log(this.storage);
  }
  showValidationErrors() {
    console.log(this.validationErrors);
  }
  findProduct(name) {
    var rexExp = new RegExp(name, 'i');
    this.found = this.storage.filter(({ name }) => name.match(rexExp));
  }
}

// class Product {
//   constructor({ id, name, count, price }) {
//     this.id = id;
//     this.name = name;
//     this.count = count;
//     this.price = price;
//   }
//   describe() {
//     console.log(`${this.name}, ${this.number},${this.price}`);
//   }
// }
