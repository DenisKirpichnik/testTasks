class CreateElement {
  constructor() {}
  createElement(tag, className, textContent) {
    const element = document.createElement(tag);
    if (Array.isArray(className))
      className.forEach((className) => element.classList.add(className));
    else if (className) element.classList.add(className);
    element.textContent = textContent;
    return element;
  }
}

class BuildProductRow extends CreateElement {
  constructor() {
    super();
  }
  buildRow(product) {
    const row = this.createElement('tr');
    row.id = product.id;
    const productName = this.createElement('td', 'productData', '');
    const productTitle = this.createElement('span', 'productName', product.name);
    const productCount = this.createElement('span', 'productCount', product.count);
    const productPrice = this.createElement('td', 'productData', product.price);
    const productActions = this.createElement('td', 'productData', '');

    const editButton = this.createElement('button', 'edit-Btn', 'Edit');
    editButton.setAttribute('data-id', product.id);
    const deleteButton = this.createElement('button', 'delete-Btn', 'Delete');
    deleteButton.setAttribute('data-id', product.id);
    productName.append(productTitle, productCount);
    productActions.append(editButton, deleteButton);
    row.append(productName, productPrice, productActions);

    return row;
  }
}

class BuildModal extends BuildProductRow {
  constructor() {
    super();
  }
  buildModal(productId) {
    const modalWrapper = this.createElement('div', 'delete-modal__wrapper');
    const topPart = this.createElement('div', 'delete-modal__top-part');
    const topPartText = this.createElement('p', 'delete-modal__header', 'Are you sure?');
    const bottomPart = this.createElement('div', 'delete-modal__bottom-part');
    const bottomPartText = this.createElement(
      'p',
      'delete-modal__header',
      'Are you sure you want to perform this action?'
    );
    const buttonContainer = this.createElement('div', 'delete-modal__buttons-container', '');
    const confirmDelete = this.createElement('button', 'delete-modal__confirm-btn', 'yes');
    confirmDelete.setAttribute('data-id', productId);
    const cancelDelete = this.createElement('button', 'delete-modal__cancel-btn', 'no');
    cancelDelete.setAttribute('data-id', productId);
    //Appending
    topPart.append(topPartText);
    buttonContainer.append(confirmDelete, cancelDelete);
    bottomPart.append(bottomPartText, buttonContainer);
    modalWrapper.append(topPart, bottomPart);

    return modalWrapper;
  }
}

class BuildInitialStructure extends BuildModal {
  constructor() {
    super();
  }

  buildTable() {
    this.table = this.createElement('table', 'productTable', '');
    this.tableHead = this.createElement('tr', '');
    this.tableName = this.createElement('th', 'tableHead-name', 'Name');
    this.countSortButton = this.createElement(
      'button',
      ['product-table__sortByCount-btn', 'up'],
      ''
    );
    this.tablePrice = this.createElement('th', 'tableHead-price', 'Price');
    this.priceSortButton = this.createElement(
      'button',
      ['product-table__sortByPrice-btn', 'up'],
      ''
    );
    this.tableActions = this.createElement('th', 'tableHead-actions', 'Actions');
    this.tableName.append(this.countSortButton);
    this.tablePrice.append(this.priceSortButton);
    this.tableHead.append(this.tableName, this.tablePrice, this.tableActions);
    this.table.append(this.tableHead);

    return this.table;
  }

  buildSearchBar() {
    this.searchBarContainer = this.createElement('div', 'search-bar');
    this.searchBarForm = this.createElement('div', 'search-bar__form');
    this.searchIput = this.createElement('input', 'search-bar__input');
    this.searchIput.setAttribute('placeholder', 'cool stuff');
    this.searchBarButton = this.createElement('button', 'search-bar__btn', 'Search');
    this.searchBarButton.setAttribute('type', 'submit');
    this.searchBarForm.append(this.searchIput, this.searchBarButton);
    this.searchBarContainer.append(this.searchBarForm);

    return this.searchBarContainer;
  }
  buildAddUpdateForm() {
    this.AddUpdForm = this.createElement('form', 'addUpdate-form', '');
    //
    this.nameContainer = this.createElement('div', 'addUpdate-form__name-container', '');
    this.nameText = this.createElement('p', 'addUpdate-form__name-title', 'Name');
    this.nameInput = this.createElement('input', ['addUpdate-form__name-Input', 'form-input'], '');
    this.nameInput.setAttribute('name', 'name');
    this.nameInput.setAttribute('type', 'text');

    this.nameInput.setAttribute('required', '');
    this.nameInput.required = true;
    this.nameInput.setAttribute('maxlength', '15');
    this.nameContainer.append(this.nameText, this.nameInput);
    //
    this.countContainer = this.createElement('div', 'addUpdate-form__count-container', '');
    this.countText = this.createElement('p', 'addUpdate-form__name-title', 'Count');
    this.countInput = this.createElement(
      'input',
      ['addUpdate-form__count-Input', 'form-input'],
      ''
    );
    this.countInput.setAttribute('type', 'number');
    this.countInput.setAttribute('name', 'count');
    this.countContainer.append(this.countText, this.countInput);
    //
    this.priceContainer = this.createElement('div', 'addUpdate-form__count-container', '');
    this.priceText = this.createElement('p', 'addUpdate-form__name-title', 'Price');
    this.priceInput = this.createElement(
      'input',
      ['addUpdate-form__price-Input', 'form-input'],
      ''
    );
    //this.priceInput.setAttribute('type', 'number');
    this.priceInput.setAttribute('name', 'price');
    this.priceInput.setAttribute('id', 'price-input');
    this.priceContainer.append(this.priceText, this.priceInput);
    //
    this.addUpdButton = this.createElement('button', 'addUpdate-form__submit-btn', 'Add');
    this.addUpdButton.setAttribute('type', 'submit');
    this.AddUpdForm.append(
      this.nameContainer,
      this.countContainer,
      this.priceContainer,
      this.addUpdButton
    );
    return this.AddUpdForm;
  }
}

export class View extends BuildInitialStructure {
  tableHead = [{}];
  constructor() {
    super();
    this.app = document.querySelector('#root');
  }

  formatPriceOnFocusout() {
    this.app.addEventListener(
      'focus',
      (event) => {
        console.log(event);
        const priceInp = document.getElementById('price-input');
        if (event.target.id === 'price-input') {
          priceInp.type = 'number';
          console.log('fired', priceInp.type);
        }
      },
      true
    );
    this.app.addEventListener('focusout', (event) => {
      if (event.target.id === 'price-input') {
        const priceInp = document.getElementById('price-input');
        console.log('event.target.value', event.target.value);
        priceInp.type = 'text';
        const formattedValue =
          '$' + event.target.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        priceInp.value = formattedValue;
      }
    });
  }

  preventPastingNotNumber() {
    // TODO Change this
    console.log('CHANGE ME PLEASE');
  }

  handleArrowChange(el) {
    if (el.classList.contains('up')) {
      el.classList.add('down');
      el.classList.remove('up');
    } else {
      el.classList.add('up');
      el.classList.remove('down');
    }
  }

  buildInitialStructure() {
    this.app.append(super.buildSearchBar(), super.buildTable(), super.buildAddUpdateForm());
  }

  getFormValues() {
    var elements = document.querySelectorAll('.form-input');
    console.log(elements[0].value);
    var obj = {};
    for (var i = 0; i < elements.length; i++) {
      var item = elements[i];
      obj[item.name] = item.value;
    }
    return obj;
  }

  bindAddProduct(handler) {
    this.addUpdButton.addEventListener('click', (event) => {
      event.preventDefault();
      handler(this.getFormValues());
    });
  }

  bindSearchProducts(handler) {
    this.searchBarButton.addEventListener('click', (event) => {
      if (this.searchIput.value !== '') {
        handler(this.searchIput.value);
      } else {
        return;
      }
    });
  }

  bindUpdateAfterSearch(handler) {
    this.searchIput.addEventListener('keyup', (event) => {
      if (event.target.value === '') {
        handler(event.target.value);
      }
    });
  }

  bindSortProducts(handler) {
    this.priceSortButton.addEventListener('click', (event) => {
      handler('price');
      this.handleArrowChange(this.priceSortButton);
    });
    this.countSortButton.addEventListener('click', (event) => {
      handler('count');
      this.handleArrowChange(this.countSortButton);
    });
  }

  bindDeleteProduct(handler) {
    this.app.addEventListener('click', (event) => {
      if (event.target.className === 'delete-Btn') {
        this.displayConfirmDeleteModal(Number(event.target.dataset.id));
      }
      if (event.target.className === 'delete-modal__confirm-btn') {
        console.log('it workds');
        handler(Number(event.target.dataset.id));
      }
      if (event.target.className === 'delete-modal__cancel-btn') {
        handler();
      }
    });
  }

  removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
  }

  displayProducts(products) {
    while (this.table.childNodes.length > 1) {
      this.table.removeChild(this.table.lastChild);
    }
    if (products.length === 0) {
      const p = this.createElement('p');
      p.textContent = 'Nothing to show!';
      this.table.append(p);
    } else {
      products.forEach((product) => {
        const row = super.buildRow(product);
        this.table.append(row);
      });
    }
  }

  displayConfirmDeleteModal(productId) {
    this.app.append(super.buildModal(productId));
  }
}
