class ChickenPopup {
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
      const menuId = el.value;

      acc.push(this.getFoodName(menuId));

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

  getFoodName(key: string): string {
    switch(key) {
      case 'a':
        return '모리치킨(2마리)';
      case 'b':
        return '맵고마치킨(1마리)';
      case 'c':
        return '치즈크리스피치킨(1마리)';
      case 'd':
        return '허니갈릭치킨(1마리)';
      default:
        return '';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ChickenPopup();
});
