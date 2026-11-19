// Минимальная логика учебных форм: данные не отправляются на сервер.
const orderDialog = document.getElementById('order-dialog');
const orderForm = document.getElementById('order-form');
const successMessage = document.getElementById('success-message');
const selectedProductInput = document.getElementById('selected-product');

// ARIA сообщает об ошибке средствам доступности, модификатор задаёт её вид.
function setFieldInvalid(field, invalid) {
  const fieldClass = {
    INPUT: 'order-form__input',
    SELECT: 'order-form__select',
    TEXTAREA: 'order-form__textarea',
  }[field.tagName];

  if (fieldClass) {
    field.classList.toggle(`${fieldClass}--error`, invalid);
  }

  if (invalid) {
    field.setAttribute('aria-invalid', 'true');
  } else {
    field.removeAttribute('aria-invalid');
  }
}

function clearErrors() {
  orderForm.querySelectorAll('[aria-invalid]').forEach((field) => {
    setFieldInvalid(field, false);
  });
}

// Модальное окно есть только на главной. Страница заявки работает независимо.
if (orderDialog) {
  const title = document.getElementById('order-dialog-title');
  const productLabel = document.getElementById('selected-product-label');

  orderDialog.addEventListener('click', (event) => {
    if (!event.target.closest('input, select, textarea, label, button')) {
      title.focus({ preventScroll: true });
    }
  });

  document.querySelectorAll('.product-card__button[data-product], [data-open-order]').forEach((button) => {
    button.addEventListener('click', () => {
      clearErrors();
      successMessage.hidden = true;
      const product = button.dataset.product || '';
      selectedProductInput.value = product;
      productLabel.textContent = product ? `Выбранный товар: ${product}` : '';
      productLabel.hidden = !product;
      orderDialog.showModal();
    });
  });

  document.getElementById('close-order-dialog').addEventListener('click', () => {
    orderDialog.close();
  });
}

// Подставляем только один из товаров, уже заданных в HTML, без вставки HTML из URL.
if (selectedProductInput instanceof HTMLSelectElement) {
  const product = new URLSearchParams(window.location.search).get('product');
  if (product && Array.from(selectedProductInput.options).some((option) => option.value === product)) {
    selectedProductInput.value = product;
    document.getElementById('order-topic').value = 'product';
  }
}

if (orderForm) {
  orderForm.addEventListener('input', (event) => {
    const field = event.target;
    if (field.willValidate && field.validity.valid) {
      setFieldInvalid(field, false);
    }
    successMessage.hidden = true;
  });

  orderForm.addEventListener('reset', () => {
    clearErrors();
    successMessage.hidden = true;
  });

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    if (!orderForm.checkValidity()) {
      Array.from(orderForm.elements).forEach((field) => {
        if (field.willValidate) {
          setFieldInvalid(field, !field.validity.valid);
        }
      });
      orderForm.reportValidity();
      return;
    }

    // reset вызывает свой обработчик, поэтому сообщение показываем после очистки.
    orderForm.reset();
    successMessage.textContent = 'Заявка проверена. В учебной версии данные не отправляются на сервер.';
    successMessage.hidden = false;
    if (orderDialog) {
      orderDialog.close();
    } else {
      successMessage.focus();
    }
  });
}
// === Блок для КР №4: Функции и безопасный вывод ===

function formatPrice(price) {
  return price + ' руб.';
}

function calculateDiscount(price, percent) {
  if (percent <= 0) return price;
  return price - ((price * percent) / 100);
}

function getProductStatus(inStock) {
  return inStock ? 'В наличии' : 'Нет в наличии';
}

function getShortDescription(product) {
  const finalPrice = calculateDiscount(product.price, product.discountPercent);
  return `${product.category} | ${product.name} — ${formatPrice(finalPrice)} (${getProductStatus(product.inStock)})`;
}

// Вывод результатов работы функций в консоль
console.log('--- Проверка работы JS (ПР 15) ---');
productsData.forEach(item => console.log(getShortDescription(item)));

// Безопасный вывод на страницу через textContent (защита от XSS)
const jsCatalogOutput = document.getElementById('js-catalog-output');
if (jsCatalogOutput) {
  const inStockCount = productsData.filter(p => p.inStock).length;
  jsCatalogOutput.textContent = `Данные загружены через JS: Всего ${productsData.length} товаров. В наличии: ${inStockCount}.`;
}
