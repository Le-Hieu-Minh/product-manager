

//button status
const buttonStatus = document.querySelectorAll("[button-status]");
if (buttonStatus.length > 0) {
  let url = new URL(window.location.href);
  buttonStatus.forEach(button => {
    button.addEventListener('click', () => {
      const status = button.getAttribute('button-status')
      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete(status);
      }
      window.location.href = url.href;
    })
  })
}

//end button status


//search
const formaSearch = document.querySelector('#form-search');
if (formaSearch) {
  let url = new URL(window.location.href)

  formaSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    const keyword = e.target.elements.keyword.value;
    if (keyword) {
      url.searchParams.set('keyword', keyword)
    } else {
      url.searchParams.delete(keyword)
    }
    window.location.href = url.href;
  })
}


//end search

//pagination

const buttonPagination = document.querySelectorAll(`[button-pagination]`);
if (buttonPagination) {
  let url = new URL(window.location.href)

  buttonPagination.forEach(button => {
    button.addEventListener('click', () => {
      const page = button.getAttribute('button-pagination');

      url.searchParams.set('page', page)

      window.location.href = url.href;
    })
  })
}

//pagination

//checkbox
const checkboxMulti = document.querySelector('[checkbox-multi]')


if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector('input[name="checkall"]')

  const inputId = checkboxMulti.querySelectorAll('input[name="id"]')

  inputCheckAll.addEventListener('click', () => {
    if (inputCheckAll.checked) {
      inputId.forEach(item => {
        item.checked = true
      });
    } else {
      inputId.forEach(item => {
        item.checked = false
      });
    }
  });

  inputId.forEach(item => {
    item.addEventListener('click', () => {
      const countChecked = checkboxMulti.querySelectorAll('input[name="id"]:checked').length
      if (countChecked == inputId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });

}


//end checkbox


//form change milti
const formChangeMulti = document.querySelector('#form-change-multi');
if (formChangeMulti) {
  formChangeMulti.addEventListener('submit', (e) => {
    e.preventDefault();

    const checkboxMulti = document.querySelector('[checkbox-multi]')
    const inputChecked = checkboxMulti.querySelectorAll('input[name="id"]:checked')

    const typeChange = e.target.elements.type.value;
    if (typeChange == 'delete-all') {
      const isConfirm = confirm('Ban co chac muon xoa tat ca?');
      if (!isConfirm) {
        return;
      }

    }

    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector('input[name="ids"]');


      inputChecked.forEach(item => {
        const id = item.value;

        if (typeChange == 'change-position') {
          const position = item.closest('tr').querySelector('input[name="position"]').value;

          ids.push(`${id}-${position}`)

        } else {
          ids.push(id);
        }
      })
      inputIds.value = ids.join(',')
      formChangeMulti.submit();

    } else {
      alert('Chon it nhat mot ban ghi')
    }
    console.log(inputChecked);


  })
}


//end form change milti

//show alert
const showAlert = document.querySelector('[show-alert]')
if (showAlert) {
  const time = showAlert.getAttribute('data-time');
  setTimeout(() => {
    showAlert.classList.add('alert-hidden')
  }, time)
  const closeAlert = showAlert.querySelector('[close-alert]');
  closeAlert.addEventListener('click', () => {
    showAlert.classList.add('alert-hidden')
  })


}


//end show alert

//upload image
const uploadImage = document.querySelector('[upload-image]');
if (uploadImage) {
  const uploadImageInput = uploadImage.querySelector('[upload-image-input]')
  const uploadImagePreview = uploadImage.querySelector('[upload-image-preview]')


  uploadImageInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImagePreview.src = URL.createObjectURL(file);
    }
  })

}

//end upload image

//sort
const sort = document.querySelector('[sort]');
if (sort) {
  let url = new URL(window.location.href);
  const sortSelect = sort.querySelector('[sort-select]');
  const sortClear = sort.querySelector('[sort-clear]');
  //chon select
  sortSelect.addEventListener('change', (e) => {
    const value = e.target.value;
    console.log(value);

    const [sortKey, sortValue] = value.split('-');

    url.searchParams.set('sortKey', sortKey)
    url.searchParams.set('sortValue', sortValue)

    window.location.href = url.href;


  })
  //xoa select
  sortClear.addEventListener('click', () => {
    url.searchParams.delete('sortKey')
    url.searchParams.delete('sortValue')
    window.location.href = url.href;
  })

  //them select cho option
  const sortKey = url.searchParams.get('sortKey');
  const sortValue = url.searchParams.get('sortValue');

  if (sortKey && sortValue) {
    const stringSort = `${sortKey}-${sortValue}`
    const optionSelect = sortSelect.querySelector(`option[value='${stringSort}']`);
    optionSelect.selected = true

  }
}


//end sort