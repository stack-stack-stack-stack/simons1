import {openWindow} from "./functions/openWindow.js";

interface Page {
  updateList(orders: string[]): this;
  paintAddedList(orders: string[]): this;
  openModal(menuId: string): void;
}

class PageApp implements Page {
  orders: string[] = [];
  modalWindow: Window | null = null;

  constructor(menuIds: string[]) {
    const addEventClick = (selector: string, eventHandler: () => void) => {
      document?.querySelector(selector)?.addEventListener('click', eventHandler);
    }

    menuIds.forEach(menuId => {
      addEventClick(`.order-buttons button[name=${menuId}]`, () => this.openModal(menuId));
    });
  }

  updateList(orders: string[]) {
    if (Array.isArray(orders)) {
      this.orders.push(...orders);
    }

    return this;
  }

  paintAddedList(orders: string[]) {
    const outputHtml = orders.reduce((acc, v) => acc + `<li>${v}</li>`
      , '');

    document.querySelector('#result')!.insertAdjacentHTML('beforeend', outputHtml);

    return this;
  }

  //* 모달을 연다.
  openModal(menuId: string) {
    this.modalWindow = openWindow({
      url: `../public/${menuId}Popup.html`,
      identifierName: menuId,
      width: 900,
      height: 467,
    });
  }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
      const pageCore = new PageApp(['pizza', 'chicken']);

      window.addEventListener('message', async (e: MessageEvent) => {
        if (!e || !e.data) return;

        const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;

        if (data.type === 'add') {
          pageCore.updateList(data.payload);
          pageCore.paintAddedList(data.payload);
        }
      });
    } catch (error) {
      console.error(error);

      alert('(∗❛⌄❛∗)')
    }
  }
);