import { Block } from '../../utils/block';
import Button from './index';

describe('components/Button', () => {
  it('Должен создавать кнопку с заданным текстом', () => {
    const btnText = 'test';

    const actualBtn = new Button({
      text: btnText,
    }) as Block;

    expect(actualBtn.element.textContent.trim()).toEqual(btnText);
  });

  it('Должен создавать кнопку с заданным классом', () => {
    const btnText = 'test';
    const btnClass = 'test-class';

    const actualBtn = new Button({
      text: btnText,
      class: btnClass,
    }) as Block;

    expect(actualBtn.element.classList.contains(btnClass)).toBe(true);
  });

  it('Должен рендерить кнопку', () => {
    const btnText = 'test';
    const btnClass = 'test-class';

    const actualBtn = new Button({
      text: btnText,
      class: btnClass,
    });

    expect(actualBtn.render().trim()).toBe(
      '<button class="btn btn_size_normal" onclick="click">test</button>'
    );
  });

  it('Должно эмититься событие click при нажатии на кнопку', () => {
    const btnText = 'test';
    const mock = jest.fn();

    const actualBtn = new Button({
      text: btnText,
      handlers: {
        click: mock,
      },
    }) as Block;

    const btn = actualBtn.element.querySelector('button');
    btn.click();

    expect(mock).toBeCalled();
  });

  it('Должен делать ререндер после обновления свойств', () => {
    const btnText = 'test';
    const newBtnText = 'new test text';

    const actualBtn = new Button({
      text: btnText,
    }) as Block;

    actualBtn.setProps({
      text: newBtnText,
    });

    expect(String(actualBtn.element.textContent).trim()).toBe(newBtnText);
  });
});
