// js/data.js
// Массив с данными для 6 товаров
const productsData = [
  { 
    id: 'mug', 
    name: 'Керамическая матовая кружка', 
    category: 'Посуда', 
    price: 850, 
    inStock: true, 
    discountPercent: 10 
  },
  { 
    id: 'lamp', 
    name: 'Настольная LED-лампа', 
    category: 'Освещение', 
    price: 2490, 
    inStock: true, 
    discountPercent: 15 
  },
  { 
    id: 'candle', 
    name: 'Ароматическая свеча в стекле', 
    category: 'Декор', 
    price: 1290, 
    inStock: false, 
    discountPercent: 0 
  },
  { 
    id: 'blanket', 
    name: 'Вязаный плед', 
    category: 'Декор', 
    price: 3200, 
    inStock: true, 
    discountPercent: 20 
  },
  { 
    id: 'organizer', 
    name: 'Настольный органайзер', 
    category: 'Организация', 
    price: 1500, 
    inStock: true, 
    discountPercent: 5 
  },
  { 
    id: 'stand', 
    name: 'Подставка для книг', 
    category: 'Организация', 
    price: 950, 
    inStock: true, 
    discountPercent: 0 
  }
];

// Демонстрация работы операторов (по требованию задания)
const testProduct = productsData[0]; // Берем кружку
const isExpensive = testProduct.price > 1000; // Оператор сравнения (false)
const hasDiscount = testProduct.inStock && testProduct.discountPercent > 0; // Логическое И (true)
const discountAmount = (testProduct.price * testProduct.discountPercent) / 100; // Арифметический оператор (85)