type Food = 'PIZZA' | 'CHICKEN';

interface IOrderPopup {
  closeModal(): void;
  selectAll(): void;
  sendSelectedList(): void;
}

interface FoodStrategy {
  getFoodName(key: string): string;
}

class PizzaStrategy implements FoodStrategy {
  getFoodName(key: string): string {
    switch (key) {
      case 'a':
        return '핫마요피자(M)';
      case 'b':
        return '트리플바비큐피자(L)';
      case 'c':
        return '스위트불고기피자(M)';
      case 'd':
        return '치즈피자(L)';
      default:
        return '';
    }
  }
}

class ChickenStrategy implements FoodStrategy {
  getFoodName(key: string): string {
    switch (key) {
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

export class OrderPopup implements IOrderPopup {
  private foodStrategy: FoodStrategy;

  constructor(food: Food) {
    this.foodStrategy =
      food === 'PIZZA' ? new PizzaStrategy() : new ChickenStrategy();

    const addEventClick = (selector: string, eventHandler: () => void) => {
      document
        ?.querySelector(selector)
        ?.addEventListener('click', eventHandler);
    };

    addEventClick('#addButton', () => this.sendSelectedList());
    addEventClick('#cancelButton', () => this.closeModal());
    addEventClick('#allCheck', () => this.selectAll());
  }

  closeModal() {
    window.close();
  }

  selectAll() {
    const allCheckEl = document.querySelector<HTMLInputElement>('#allCheck');

    if (allCheckEl.checked) {
      document
        .querySelectorAll<HTMLInputElement>('.content input[name=pNo]')
        .forEach((el) => (el.checked = true));
      return;
    }
    document
      .querySelectorAll<HTMLInputElement>('.content input[name=pNo]')
      .forEach((el) => (el.checked = false));
  }

  sendSelectedList() {
    const validateAtLeastOneChecked = (list: NodeListOf<Element>) => {
      if (!list || !list.length) {
        throw 'not selected items';
      }
    };

    const translate = (itemEl: NodeListOf<HTMLInputElement>) =>
      Array.from(itemEl).reduce<string[]>((acc, el) => {
        const menuId = el.value;

        acc.push(this.foodStrategy.getFoodName(menuId));

        return acc;
      }, []);

    const checkedEl = document.querySelectorAll<HTMLInputElement>(
      '.content input[name=pNo]:checked',
    );

    try {
      validateAtLeastOneChecked(checkedEl);
    } catch (error) {
      alert('(T⌓T) 뭐라도 선택하시죠?');
      return;
    }

    window.opener.postMessage(
      { type: 'add', payload: translate(checkedEl) },
      '*',
    );

    this.closeModal();
  }
}
