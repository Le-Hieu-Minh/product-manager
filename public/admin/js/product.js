
//Change Status
const buttonChangeStatus = document.querySelectorAll(`[button-change-status]`);

if (buttonChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector('#form-change-status');
  const path = formChangeStatus.getAttribute('data-path')


  buttonChangeStatus.forEach(button => {
    button.addEventListener('click', () => {
      const statusCurrent = button.getAttribute('data-status');
      const id = button.getAttribute('data-id');

      let statusChange = statusCurrent == 'active' ? ('inactive') : ('active')

      const action = path + `/${statusChange}/${id}?_method=PATCH`

      formChangeStatus.action = action;
      formChangeStatus.submit();

    })
  })
}

//end change status

//delete product
const buttonDelete = document.querySelectorAll('[button-delete]');
if (buttonDelete.length > 0) {
  const formDeleteItem = document.querySelector('#form-delete-item');
  const path = formDeleteItem.getAttribute('data-path');


  buttonDelete.forEach(item => {
    item.addEventListener('click', () => {
      const isConfirm = confirm('Ban co chac muon xoa san pham nay khong');

      if (isConfirm) {
        const id = item.getAttribute('data-id');

        const action = path + `/${id}?_method=DELETE`

        formDeleteItem.action = action;
        formDeleteItem.submit()
      }

    })
  })
}

//end delete product