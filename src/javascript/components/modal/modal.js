import { createElement } from '../../helpers/domHelper';
import { createFighterImage } from '../fighterPreview';

export function showModal({ title, bodyElement, onClose = () => {} }) {
  const root = getModalContainer();
  const modal = createModal({ title, bodyElement, onClose });

  root.append(modal);
}

function getModalContainer() {
  return document.getElementById('root');
}

function createModal({ title, bodyElement, onClose }) {
  const layer = createElement({ tagName: 'div', className: 'modal-layer' });
  const modalContainer = createElement({ tagName: 'div', className: 'modal-root' });
  const header = createHeader(title, onClose);
  const bodyContent = createElement({ tagName: 'div', className: 'modal-body' });
  const fighterImage = createFighterImage(bodyElement);

  bodyContent.append(fighterImage);
  modalContainer.append(header, bodyContent);
  layer.append(modalContainer);

  return layer;
}

function createHeader(title, onClose) {
  const headerElement = createElement({ tagName: 'div', className: 'modal-header' });
  const titleElement = createElement({ tagName: 'span' });
  const closeButton = createElement({ tagName: 'div', className: 'close-btn' });

  titleElement.innerText = title;
  closeButton.innerText = '×';

  const close = () => {
    hideModal();
    onClose();
  };
  closeButton.addEventListener('click', close);
  headerElement.append(title, closeButton);

  return headerElement;
}

function hideModal() {
  const modal = document.getElementsByClassName('modal-layer')[0];
  modal?.remove();
}
