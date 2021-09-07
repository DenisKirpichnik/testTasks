import { View } from '../view/view.js';
import { Model } from '../model/model.js';

const products = [
  { id: 1, name: 'Dolce', count: 25, price: 25000 },
  { id: 2, name: 'Versaci', count: 15, price: 15000 },
  { id: 3, name: 'Lui vuitton', count: 10, price: 55000 },
];

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.view.formatPriceOnFocusout();
    this.view.preventPastingNotNumber();
    this.view.buildInitialStructure();
    this.view.bindAddProduct(this.handleAddProduct);
    this.view.bindSearchProducts(this.handleSearchProduct);
    this.view.bindDeleteProduct(this.handleDeleteProduct);
    this.view.bindSortProducts(this.handleSortProducts);
    this.view.bindUpdateAfterSearch(this.handleUpdateAfterSearch);
    this.onProductListChanged(this.model.storage);
  }

  onProductListChanged = (products) => {
    this.view.displayProducts(products);
  };

  handleAddProduct = (formValues) => {
    this.model.addNewProduct(formValues);
    this.view.displayProducts(this.model.storage);
    this.model.showStorage();
    this.model.showValidationErrors();
  };

  handleUpdateAfterSearch = (inputValue) => {
    if (inputValue === '') {
      this.model.found = [];
      this.view.displayProducts(this.model.storage);
    }
  };

  handleSearchProduct = (inputValue) => {
    this.model.findProduct(inputValue);
    this.view.displayProducts(this.model.found);
  };

  handleDeleteProduct = (id) => {
    if (!id) {
      this.view.removeElementsByClass('delete-modal__wrapper');
      return;
    }
    this.model.deleteProduct(id);
    this.view.removeElementsByClass('delete-modal__wrapper');
    this.view.displayProducts(this.model.storage);
  };

  handleSortProducts = (paramater) => {
    this.model.sortConfig.direction === 'asc'
      ? this.model.sortProducts(paramater, 'desc')
      : this.model.sortProducts(paramater, 'asc');
    this.view.displayProducts(this.model.storage);
  };
}

export const app = new Controller(new Model(products), new View());
