//permissions
const tablePremissions = document.querySelector('[table-premissions]')
if (tablePremissions) {
  const buttonSubmit = document.querySelector('[button-submit]')
  buttonSubmit.addEventListener('click', () => {
    let permissions = []
    const row = tablePremissions.querySelectorAll('[data-name]')
    row.forEach(row => {
      const name = row.getAttribute('data-name')
      const inputs = row.querySelectorAll('input')

      if (name == 'id') {
        inputs.forEach(input => {
          const id = input.value
          permissions.push({
            id: id,
            permissions: []
          })
        })

      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked

          if (checked) {
            permissions[index].permissions.push(name)
          }

        })
      }
    })

    if (permissions.length > 0) {
      const formChangePremission = document.querySelector('#form-change-permissions')
      if (formChangePremission) {
        const inputPremission = formChangePremission.querySelector('input[name="permissions"]');
        inputPremission.value = JSON.stringify(permissions);
        formChangePremission.submit();
      }
    }
  })

}

//end permissions


// premission data default

const dataRecord = document.querySelector('[data-record]');
if (dataRecord) {
  const record = JSON.parse(dataRecord.getAttribute('data-record'));

  console.log(record);

  const tablePremissions = document.querySelector('[table-premissions]');

  record.forEach((record, index) => {
    const permissions = record.permissions

    console.log(permissions);

    permissions.forEach(permissions => {
      console.log(permissions);

      const row = tablePremissions.querySelector(`[data-name="${permissions}"]`)
      const input = row.querySelectorAll(`input`)[index]
      console.log(input);
      input.checked = true

    })
  })
}
// end  premission data default
