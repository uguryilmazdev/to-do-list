export default function addPriorityButtons(submitArea) {
  // ------------------- priority buttons ------------------
  // -------------------------------------------------------
  // create container of priority buttons
  const container = document.createElement('div');
  container.classList.add('priority-buttons-container');

  // create radio button container
  const lowLabelContainer = document.createElement('label');
  const mediumLabelContainer = document.createElement('label');
  const highLabelContainer = document.createElement('label');
  // create priority buttons
  const lowInput = document.createElement('input');
  const mediumInput = document.createElement('input');
  const highInput = document.createElement('input');
  // create text area
  const lowText = document.createElement('div');
  lowText.innerHTML = 'LOW';
  const mediumText = document.createElement('div');
  mediumText.innerHTML = 'MEDIUM';
  const highText = document.createElement('div');
  highText.innerHTML = 'HIGH';

  const lowAttr = {
    type: 'radio',
    id: 'low-input-priority',
    name: 'priority',
    value: 'LOW',
  };

  const mediumAttr = {
    type: 'radio',
    id: 'medium-input-priority',
    name: 'priority',
    value: 'MEDIUM',
  };

  const highAttr = {
    type: 'radio',
    id: 'high-input-priority',
    name: 'priority',
    value: 'HIGH',
  };

  // LOW
  Object.keys(lowAttr).forEach((attr) => {
    lowInput.setAttribute(attr, lowAttr[attr]);
  });

  // MEDIUM
  Object.keys(mediumAttr).forEach((attr) => {
    mediumInput.setAttribute(attr, mediumAttr[attr]);
  });

  // HIGH
  Object.keys(highAttr).forEach((attr) => {
    highInput.setAttribute(attr, highAttr[attr]);
  });

  // ----- append children -----
  lowLabelContainer.appendChild(lowInput);
  lowLabelContainer.appendChild(lowText);
  mediumLabelContainer.appendChild(mediumInput);
  mediumLabelContainer.appendChild(mediumText);
  highLabelContainer.appendChild(highInput);
  highLabelContainer.appendChild(highText);

  container.appendChild(lowLabelContainer);
  container.appendChild(mediumLabelContainer);
  container.appendChild(highLabelContainer);

  submitArea.prepend(container);
}
