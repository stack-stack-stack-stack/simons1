import { openWindow } from "./functions/openWindow.js";
class PageApp {
    orders = [];
    modalWindow = null;
    constructor(menuIds) {
        const addEventClick = (selector, eventHandler) => {
            document?.querySelector(selector)?.addEventListener('click', eventHandler);
        };
        menuIds.forEach(menuId => {
            addEventClick(`.order-buttons button[name=${menuId}]`, () => this.openModal(menuId));
        });
    }
    updateList(orders) {
        if (Array.isArray(orders)) {
            this.orders.push(...orders);
        }
        return this;
    }
    paintAddedList(orders) {
        const outputHtml = orders.reduce((acc, v) => acc + `<li>${v}</li>`, '');
        document.querySelector('#result').insertAdjacentHTML('beforeend', outputHtml);
        return this;
    }
    //* 모달을 연다.
    openModal(menuId) {
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
        window.addEventListener('message', async (e) => {
            if (!e || !e.data)
                return;
            const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
            if (data.type === 'add') {
                pageCore.updateList(data.payload);
                pageCore.paintAddedList(data.payload);
            }
        });
    }
    catch (error) {
        console.error(error);
        alert('(∗❛⌄❛∗)');
    }
});
//# sourceMappingURL=page.js.map