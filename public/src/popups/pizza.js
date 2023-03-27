class Popup {
    constructor() {
        const addEventClick = (selector, eventHandler) => {
            document?.querySelector(selector)?.addEventListener('click', eventHandler);
        };
        addEventClick('#addButton', () => this.sendSelectedList());
        addEventClick('#cancelButton', () => this.closeModal());
        addEventClick('#allCheck', () => this.selectAll());
    }
    closeModal() {
        window.close();
    }
    selectAll() {
        const allCheckEl = document.querySelector('#allCheck');
        if (allCheckEl.checked) {
            document.querySelectorAll('.content input[name=pNo]').forEach(el => el.checked = true);
            return;
        }
        document.querySelectorAll('.content input[name=pNo]').forEach(el => el.checked = false);
    }
    sendSelectedList() {
        const validateAtLeastOneChecked = (list) => {
            if (!list || !list.length) {
                throw 'not selected items';
            }
        };
        const translate = (itemEl) => Array.from(itemEl).reduce((acc, el) => {
            const menu = el.value;
            acc.push(menu);
            return acc;
        }, []);
        const checkedEl = document.querySelectorAll('.content input[name=pNo]:checked');
        try {
            validateAtLeastOneChecked(checkedEl);
        }
        catch (error) {
            alert('(T⌓T) 뭐라도 선택하시죠?');
            return;
        }
        window.opener.postMessage({ type: 'add', payload: translate(checkedEl) }, '*');
        this.closeModal();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new Popup();
});
export {};
//# sourceMappingURL=pizza.js.map