document.addEventListener('DOMContentLoaded', () => {
    fetchDogs();
    
    const form = document.getElementById('dogForm');
    form.addEventListener('submit', handleFormSubmit);
  });
  

  function fetchDogs() {
    fetch('http://localhost:3000/dogs')
      .then(response => response.json())
      .then(data => renderDogsTable(data))
      .catch(error => console.error('Error:', error));
  }
  

  function renderDogsTable(dogs) {
    const tableBody = document.getElementById('dogTableBody');
    tableBody.innerHTML = '';
    
    dogs.forEach(dog => {
      const row = document.createElement('tr');
      
      const nameCell = document.createElement('td');
      nameCell.textContent = dog.name;
      row.appendChild(nameCell);
      
      const breedCell = document.createElement('td');
      breedCell.textContent = dog.breed;
      row.appendChild(breedCell);
      
      const sexCell = document.createElement('td');
      sexCell.textContent = dog.sex;
      row.appendChild(sexCell);
      
      const actionsCell = document.createElement('td');
      const editButton = document.createElement('button');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', () => populateEditForm(dog));
      actionsCell.appendChild(editButton);
      row.appendChild(actionsCell);
      
      tableBody.appendChild(row);
    });
  }
  
  
  function populateEditForm(dog) {
    const form = document.getElementById('dogForm');
    form.elements.name.value = dog.name;
    form.elements.breed.value = dog.breed;
    form.elements.sex.value = dog.sex;
  }
  
  
  function handleFormSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const id = dogs.id
    
    const dog = {
      name: form.elements.name.value,
      breed: form.elements.breed.value,
      sex: form.elements.sex.value
    };
    
    fetch(`http://localhost:3000/dogs/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(dog)
  })
  .then(response => response.json())
  .then(() => {
    fetchDogs(); 
    form.reset(); 
  })
  .catch(error => console.error('Error:', error));
}