class Popup {
  constructor() {
    const addEventClick = (selector: string, eventHandler: () => void) => {
      document?.querySelector(selector)?.addEventListener('click', eventHandler);
    }

    addEventClick('#addButton', () => this.sendSelectedList());
    addEventClick('#cancelButton', () => this.closeModal());
    addEventClick('#allCheck', () => this.selectAll())
  }

  closeModal() {
    window.close();
  }

  selectAll() {
    const allCheckEl = document.querySelector<HTMLInputElement>('#allCheck');

    if (allCheckEl.checked) {
      document.querySelectorAll<HTMLInputElement>('.content input[name=pNo]').forEach(el => el.checked = true);
      return;
    }
    document.querySelectorAll<HTMLInputElement>('.content input[name=pNo]').forEach(el => el.checked = false);
  }

  sendSelectedList() {
    const validateAtLeastOneChecked = (list: NodeListOf<Element>) => {
      if (!list || !list.length) {
        throw 'not selected items';
      }
    }

    const translate = (itemEl: NodeListOf<HTMLInputElement>) => Array.from(itemEl).reduce<
      string[]
    >((acc, el) => {
      const menu = el.value;

      acc.push(menu);

      return acc;
    },[])

    const checkedEl = document.querySelectorAll<HTMLInputElement>('.content input[name=pNo]:checked');

    try {
      validateAtLeastOneChecked(checkedEl);
    } catch (error) {
      alert('(T⌓T) 뭐라도 선택하시죠?');
      return;
    }

    window.opener.postMessage({type: 'add', payload: translate(checkedEl)}, '*');

    this.closeModal();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new Popup();
});