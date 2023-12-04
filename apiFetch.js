fetch('https://reqres.in/api/users?delay=3')
.then(response => response.json())
.then(data => {
  const tableBody = document.getElementById('userTableBody');

  // Convertir los datos de usuario en formato JSON y almacenarlos en el local storage
  localStorage.setItem('datosDeUsuario', JSON.stringify(data));
   // Guardar la fecha y hora de la solicitud
   localStorage.setItem('fechaDeSolicitud', Date.now());

  data.data.forEach(user => {
    const row = document.createElement('tr');

    const userInfo = ['id', 'email', 'first_name', 'last_name', 'avatar' ];
    userInfo.forEach(info => {
      const cell = document.createElement('td');
      cell.textContent = user[info];
      row.appendChild(cell);
    });

    const avatarCell = document.createElement('td');
    const avatar = document.createElement('img');
    avatar.src = user.avatar;
    avatar.alt = 'Avatar';
    avatar.classList.add('rounded-circle', 'avatar-img');
    avatarCell.appendChild(avatar);
    row.appendChild(avatarCell);

    tableBody.appendChild(row);
  });
})

// Leer los datos almacenados en el local storage
const datosDeUsuario = JSON.parse(localStorage.getItem('datosDeUsuario'));

// Verificar si han pasado menos de 60 segundos desde la primera solicitud
const fechaDeSolicitud = localStorage.getItem('fechaDeSolicitud');
if (Date.now() - fechaDeSolicitud < 60000) {
  // Leer los datos almacenados en el local storage
  const datosDeUsuario = JSON.parse(localStorage.getItem('datosDeUsuario'));

  // Mostrar los datos almacenados en el DOM
  document.getElementById('datosDeUsuario').innerHTML = datosDeUsuario;
} else {
  // Hacer una nueva solicitud GET al servidor
  fetch('/ruta/al/servidor')
    .then(response => response.json())
    .then(data => {
      // Convertir los datos de usuario en formato JSON y almacenarlos en el local storage
      localStorage.setItem('datosDeUsuario', JSON.stringify(data));

      // Guardar la fecha y hora de la solicitud
      localStorage.setItem('fechaDeSolicitud', Date.now());

      // Mostrar los datos almacenados en el DOM
      document.getElementById('datosDeUsuario').innerHTML = data;
    });
}

//.catch(error => console.error('Error fetching data:', error));