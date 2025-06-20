fetch('/json/data.json')
  .then(response => response.json()) 
  .then(data => {
    console.log(data);


    const container = document.querySelector('#membersTable tbody');
    const addButton = document.querySelector('.btn-add');


    data.members.forEach((member, index) => {
      const row = document.createElement('tr');
      row.setAttribute('data-index', index);

      row.innerHTML =  `
      <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">${member.name}</td>
      <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">${member.email}</td>
      <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">${member.phone}</td>
      <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">${member.age}</td>
      <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400">${member.gender}</td>
       <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><button class="me-2 btn-edit text-blue-600/100 cursor-pointer">Edit</button><button class="btn-delete text-red-500 cursor-pointer">Delete</button></td>

      `;



      container.appendChild(row);
      
    });

    container.addEventListener('click',function(e){
      const target = e.target;
      const row = target.closest('tr');
      const index = row.getAttribute('data-index');


      if(target.classList.contains('btn-edit')) {
        if(target.textContent === 'Edit') {
          const cells = row.querySelectorAll('td');
          for(let i=0; i<5; i++) {
            const text = cells[i].textContent;
            cells[i].innerHTML = `<input class="border border-indigo-600 p-2" type="text" value="${text}" />`;
          }
          target.textContent = 'Save';
        }
        else {
            const input = row.querySelectorAll('input');
            input.forEach((input, i) => {
              row.children[i].textContent = input.value;
            })
            target.textContent = 'Edit';
        }
      }

      if(target.classList.contains('btn-delete')) {
        row.remove();
      }



      if(target.classList.contains('btn-new-save')) {
        if(target.textContent === 'Save') {
          for(let i=0; i<5; i++) {
            const input = row.cells[i].querySelector('input');
            console.log("input:"+input)
            if(input) {
              row.cells[i].textContent = input.value;
            }
          }
        }
      }

      target.textContent = 'Edit';
      target.classList.remove('btn-new-save');
      target.classList.add('btn-edit');



    });


    addButton.addEventListener('click', function(e) {
      const newRow = document.createElement('tr');
      newRow.innerHTML = `
      <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><input class="border border-indigo-600 p-2" type="text" placeholder="Name" /></td>
      <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><input class="border border-indigo-600 p-2" type="text" placeholder="Email" /></td>
      <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><input class="border border-indigo-600 p-2" type="text" placeholder="Phone" /></td>
      <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><input class="border border-indigo-600 p-2" type="text" placeholder="Age" /></td>
      <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><input class="border border-indigo-600 p-2" type="text" placeholder="Gender" /></td>
       <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><button class="me-2 btn-new-save text-blue-600/100 cursor-pointer">Save</button><button class="btn-delete text-red-500 cursor-pointer">Delete</button></td>`;

      container.appendChild(newRow);

    });







  })
  .catch(error => console.error('Error fetching data:', error)); 