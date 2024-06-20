import { it, expect, describe, beforeAll } from 'vitest';

const localStorageMock = (function() {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    }
  };
})();

beforeAll(() => {
  global.localStorage = localStorageMock;
  const newCart = [{a:1}, {a: 2}, {a: 2}]
  localStorage.setItem('cart', JSON.stringify(newCart))
});

describe('l_str', () => {
  it('should show an empty card', () => {
    const cart = JSON.parse(localStorage.getItem('cart'))
    expect(cart.length).toBe(3)
  })
})