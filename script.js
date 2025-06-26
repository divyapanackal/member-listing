fetch('/json/data.json')
  .then(response => response.json()) 
  .then(data => {
    // console.log(data);


    const container = document.querySelector('#membersTable tbody');
    const addButton = document.querySelector('.btn-add');
    const submitButton = document.querySelector('#btn-submit');
    const form = document.querySelector('#add-new-form');


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
            // cells[i].innerHTML = `<input class="border border-indigo-600 p-2" type="text" value="${text}" />`;

            switch(i) {
              case 0:
                cells[i].innerHTML = `<input class="border border-indigo-600 p-2" type="text" value="${text}" />`;
                break;
              case 1:
                cells[i].innerHTML = `<input class="border border-indigo-600 p-2" type="email" value="${text}" />`;
                break;
              case 2:
                cells[i].innerHTML = `<input class="border border-indigo-600 p-2" tel="number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value="${text}" />`;
                break;
              case 3:
                cells[i].innerHTML = `<input class="border border-indigo-600 p-2" type="number" value="${text}" min="1" max="90" />`;
                break;
              case 4:
                  cells[i].innerHTML = `<input type="radio" id="male-${row.i}" name="gender-${row.i}" value="Male" ${text === 'Male' ? 'checked' : ''}>
                                         <label for="male-${row.i}">Male</label><br>
                                        <input type="radio" id="female-${row.i}" name="gender-${row.i}" value="Female" ${text === 'Female' ? 'checked' : ''}>
                                        <label for="female-${row.i}">Female</label>`;
                  break;



            }
          }
          target.textContent = 'Save';
        }
        else {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, i) => {
              const input =  cell.querySelector('input');
              if(i == 4) {
                const checkedRadio = cell.querySelector('input[type="radio"]:checked');
                cell.textContent = checkedRadio ? checkedRadio.value : '';
              }
              else  {
                if(input) {
                  cell.textContent = input.value;
                }

              }
            })
            target.textContent = 'Edit';
        }
      }

      if(target.classList.contains('btn-delete')) {
        row.remove();
      }



      if(target.classList.contains('btn-new-save')) {
        // debugger
        if(target.textContent === 'Save') {
          console.log("here")
          for(let i=0; i<6; i++) {
            const input = row.cells[i].querySelector('input');
            if(input) {
              row.cells[i].textContent = input.value;
            }
          }
          target.textContent = 'Edit';
          target.classList.remove('btn-new-save');
          target.classList.add('btn-edit');
        }
      }




    });


    addButton.addEventListener('click', function(e) {

      const addForm = document.querySelector('.form-add');
      addForm.classList.add('show-form');
      
      // const newRow = document.createElement('tr');
      // const lastIndex = container.lastChild.getAttribute('data-index');
      // const indexVal = parseInt(lastIndex) + 1;

      // console.log(indexVal);
      // debugger;
      // newRow.innerHTML = `
      // <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><input class="border border-indigo-600 p-2" type="text" placeholder="Name" /></td>
      // <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><input class="border border-indigo-600 p-2" type="email" placeholder="Email" /></td>
      // <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><input class="border border-indigo-600 p-2" type="tel" placeholder="Phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/></td>
      // <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><input class="border border-indigo-600 p-2" type="number" placeholder="Age" min="1" max="90" /></td>
      // <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><input class="border border-indigo-600 p-2" type="password" placeholder="Password"  /></td>
      // <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><input type="radio" id="male-${indexVal}" name="gender-${indexVal}" value="Male">
      //                                     <label for="male-${indexVal}">Male</label><br><input type="radio" id="female-${indexVal}" name="gender-${indexVal}" value="Female"><label for="female-${indexVal}">Female</label></td>
      //  <td class="border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400"><button class="me-2 btn-new-save text-blue-600/100 cursor-pointer">Save</button><button class="btn-delete text-red-500 cursor-pointer">Delete</button></td>`;

      // container.appendChild(newRow);

    });



    form.addEventListener('submit', function(e) {

      e.preventDefault();
      
      var name = document.getElementById('first_name').value;
      var phone = document.getElementById('phone').value;
      var email = document.getElementById('email').value;
      var password =  document.getElementById('password').value;
      var age = document.getElementById('age').value;
      var gender = document.querySelector('input[name="gender"]:checked');
      var agree = document.getElementById('remember').checked;

      var newRow = document.createElement('tr');
      const lastIndex = container.lastChild.getAttribute('data-index');
      const indexVal = parseInt(lastIndex) + 1;
      newRow.setAttribute('data-index', indexVal);

      function addCell(value) {
        var cell = document.createElement('td');
          cell.classList.add(...'border-b border-gray-100 p-4 pl-8 text-gray-500 dark:border-gray-700 dark:text-gray-400'.split(' '));

        if (value === 'actions') {
          cell.innerHTML = '<button class="me-2 btn-edit text-blue-600/100 cursor-pointer">Edit</button><button class="btn-delete text-red-500 cursor-pointer">Delete</button>'
        }
        else {

          cell.textContent = value;
        }
        newRow.appendChild(cell);
      }


      addCell(name);
      addCell(email);
      addCell(phone);
      // addCell(password);
      addCell(age);
      addCell(gender.value);
      // addCell(agree ? 'yes' : 'No');
      addCell('actions');



      container.appendChild(newRow);
      form.reset();
      form.classList.remove('show-form');


    });




  })
  .catch(error => console.error('Error fetching data:', error)); 