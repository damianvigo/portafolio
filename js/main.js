// Inicializando Libreria
const grid = new Muuri('.grid', {
  layout: {
    rounding: false
  }
});

// Por ahora solo con ECMAScript 6 sin REACT ni componentes. 

window.addEventListener('load', () => {
  grid.refreshItems().layout()
  document.getElementById('grid').classList.add('imagenes-cargadas')
  

/* Listener de enlaces para filtrar por categoria */
  const enlaces = document.querySelectorAll('#categorias a')
  
  enlaces.forEach((elemento) => {
    elemento.addEventListener('click', (evento) => {
      evento.preventDefault()
      enlaces.forEach((enlace) => enlace.classList.remove('activo'))
      evento.target.classList.add('activo')

      const categoria = evento.target.innerHTML.toLowerCase()
      categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`)
    })
  })

// Listener para la barra de busqueda
  document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
    const busqueda = evento.target.value
    grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) )
  })

// Listener para imagenes
  const overlay = document.getElementById('overlay')
  document.querySelectorAll('.grid .item img').forEach((elemento) => {
    
    elemento.addEventListener('click', () => {
      const ruta = elemento.getAttribute('src')
      const descripcion = elemento.parentNode.parentNode.dataset.descripcion
      
      overlay.classList.add('activo')
      document.querySelector('#overlay img').src = ruta
      document.querySelector('#overlay .descripcion').innerHTML = descripcion
    })
  }) 

//Listener del botón de cerrar
  document.querySelector('#btn-cerrar-light-box').addEventListener('click', () => {
    overlay.classList.remove('activo')
  })

//Listener para el overlay
  overlay.addEventListener('click', (evento) => {
   evento.target.id === 'overlay' ? overlay.classList.remove('activo') : ''
  })

})