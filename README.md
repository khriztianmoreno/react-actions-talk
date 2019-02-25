# Reduce Redux Boilerplate with Redux-Actions ⚛️ 👨🏼‍💻 ⚡️
> Repositorio creado como parte de la charla [Reduciendo el boilerplate de Redux](https://www.meetup.com/React-Medellin/events/258743057/) dictada en la comunidad [React Medellin](https://reactmedellin.org/).

[Redux](https://redux.js.org/) es una forma poderosa de administrar el estado de la aplicación, pero ese poder puede venir con una gran cantidad de código. Una sola actualización a veces puede requerir cambios en muchos archivos, además el código requerido para definir los *actions creators* para manejar nuestras acciones en los *reducers* puede comenzar a ser bastante repetitivo.

La libreria [redux-actions](https://github.com/redux-utilities/redux-actions) ofrece una API pequeña pero poderosa para ayudar a reducir algunos de los elementos típicos de una aplicación que utiliza Redux para manejar la administración del estado.

![Reduce Redux Boilerplate with Redux-Actions](./.readme-static/redux-actions-talk.png)

## Summary

Una de las mayores quejas que las personas tienden a tener sobre Redux es la cantidad de código repetitivo que terminas escribiendo para usarlo. ¡No tiene que ser así!

Redux-actions simplificarán el código para nuestros *actions creators* e incluso nos darán una nueva forma de crear nuestros *reducers*. 

Al utilizar redux-actions, nuestra aplicación utilizará [Flux Standard Actions](https://github.com/acdlite/flux-standard-action), manteniendo la forma en que gestionamos nuestro estado de manera más consistente. 

Esta pequeña biblioteca solo expone algunas funciones para su API, por lo que no tardará mucho en aprender, pero hará una gran diferencia en cómo escribimos los *actions creators* y los *reducers* para redux.

## Run

En una terminal ejecutas el siguiente comando para levantar el servidor dummy:

```bash
$ npm run dev-server
```

Y en otra ventana de tu terminal levantamos nuestro proyecto web:

```bash
$ npm run dev
```

### Temas
- [Add redux-actions as a Dependency of a React and Redux App](#add-redux-actions-as-a-dependency-of-a-react-and-redux-app)
- [Refactor a Redux Action Creator using the createAction function from redux-actions](#refactor-a-redux-action-creator-using-the-createaction-function-from-redux-actions)
- [Modify a Redux Action’s Payload upon Creation with redux-actions](#modify-a-redux-actions-payload-upon-creation-with-redux-actions)
- [Create Multiple Redux Actions with an Action Map in redux-actions](#create-multiple-redux-actions-with-an-action-map-in-redux-actions)
- [Create a Reducer Function for a Specific Redux Action using redux-actions](#create-a-reducer-function-for-a-specific-redux-action-using-redux-actions)
- [Combine Individual Reducer Functions into a Single Reducer with reduce-reducers](#combine-individual-reducer-functions-into-a-single-reducer-with-reduce-reducers)
- [Handle Multiple Actions using a Single Function with combineActions in redux-actions](#handle-multiple-actions-using-a-single-function-with-combineactions-in-redux-actions)
- [Create a Reducer Function for Multiple Redux Actions using redux-actions](#create-a-reducer-function-for-multiple-redux-actions-using-redux-actions)
- [Handle Error Conditions in a Reducer using redux-actions](#handle-error-conditions-in-a-reducer-using-redux-actions)
- [Add Meta Data to a Redux Action with redux-actions](#add-meta-data-to-a-redux-action-with-redux-actions)

### Add redux-actions as a Dependency of a React and Redux App

Lo primero que vamos a hacer es revisar la aplicación React y Redux con la que trabajaremos e instalaremos redux-actions como una dependencia de proyecto usando npm.

```bash
# We need to install that as dependency for our project
$ npm i -S redux-actions
```
### Refactor a Redux Action Creator using the createAction function from redux-actions

En esta punto, tomaremos uno de los `action creator` existentes y lo reemplazaremos usando la función createAction proporcionada por redux-actions. El uso de createAction reduce algunos de los problemas y, lo que es más importante, garantiza que nuestras Acciones se adhieran a la estructura FSA (Flux Standard Action).

Comenzaremos con el archivo `/store/actions/index` en la parte superior del archivo e importemos la función `createAction` desde `redux-actions`.

```js
import { createAction } from 'redux-actions'
``` 

Ahora, vamos a desplazarnos hacia abajo hasta donde se definen los `actions creators` y vamos a comenzar por reemplazar este `updateCurrent`.

```js
// Para tenerlo como referencia, duplicaré esta línea y comentaré el original.
// export const updateCurrent = val => ({ type: UPDATE_CURRENT, payload: val })

// tomaré esta función y la reemplazaré con una llamada a createAction
// y la pasaré a mi tipo de acción.
export const updateCurrent = createAction(UPDATE_CURRENT)
```

Si comprobamos el funcionamiento de esto ahora mismo debe seguir igual, esto es debido a que la funcion `createAction` toma nuestro **type** `UPDATE_CURRENT` y devuelve una nueva función, esta funcion esta esperando un valor que cuando llegue tomara el valor y el tipo y lo devolverá con la propiedad **type** y **payload**.

La forma de este objeto es estándar. De hecho, hay un nombre para esto. Es el formato [Flux Standard Action](https://github.com/acdlite/flux-standard-action), o FSA, para abreviar. Esto define cómo debería ser un objeto:

```js
// FSA
{
  type: 'TYPE',
  payload: {},
  error: false,
  meta: {}
}
```

La definición establece un par de reglas. Primero, el objeto debe tener una propiedad `type`. Ese sería el tipo de nuestra acción, y así es como controlamos nuestro *switch* dentro de nuestro *reducers*.

Puede tener una propiedad `payload` que lleva todos los datos que necesitamos para que nuestro estado se actualice correctamente. También puede tener una propiedad de `error` y esa clave de error es un valor booleano que indica si el `payload` es o no un objeto de error.

También puede tener una propiedad de `meta`, que puede llevar información adicional que es importante para la acción que no forma parte del  `payload`. Las reglas también especifican que este objeto no debe tener ninguna otra propiedad fuera de las cuatro enumeradas aquí.

Vamos a cambiar los otros `actions creators` pero dejaremos igual por ahora los dos ultimos, al final tendremos esto:

```js
export const updateCurrent = createAction(UPDATE_CURRENT)
export const loadTodos = createAction(LOAD_TODOS)
export const addTodo = createAction(ADD_TODO)
export const replaceTodo = createAction(REPLACE_TODO)
export const removeTodo = createAction(REMOVE_TODO)
export const showLoader = () => ({ type: SHOW_LOADER, payload: true })
export const hideLoader = () => ({ type: HIDE_LOADER, payload: false })
```
### Modify a Redux Action’s Payload upon Creation with redux-actions

Ahora, usaremos el argumento opcional *payloadCreator* de la función `createAction` para para transformar la entrada de datos sin procesar para que estén correctamente formateados para nuestra aplicación.

Cuando pasamos nuestro tipo de acción a `createAction`, el comportamiento predeterminado es devolver una función que va a aceptar nuestro valor y hacer que el `payload` este en el objeto de acción resultante. Afortunadamente, `createAction` nos da un segundo argumento, que es una función creadora de `payload`.

```js
// export const showLoader = () => ({ type: SHOW_LOADER, payload: true })
// export const hideLoader = () => ({ type: HIDE_LOADER, payload: false })
export const showLoader = createAction(SHOW_LOADER, () => true)
export const hideLoader = createAction(HIDE_LOADER, () => false)
```

Entonces para mi segundo argumento, puedo darle una función a esto. Ese valor que se devuelve se utilizará como un `payload`. En este caso, solo le daré una función que no toma argumentos y devuelve true/false. 

De forma predeterminada, cualquier argumento que se pase a nuestro `action creator` se pasará a esta función como un argumento. Digamos que quiero actualizar el texto a medida que se escribe y asegurarnos de que la acción que se realiza en el `reducer` refleje los cambios en ese texto actualizado.

Por ejemplo:

```js
const fixCase = str => `${str.slice(0, 1).toUpperCase()}${str.slice(1).toLowerCase()}`

export const updateCurrent = createAction(UPDATE_CURRENT, fixCase)
```
### Create Multiple Redux Actions with an Action Map in redux-actions

En este paso, usaremos la función plural `createActions` y un mapa de acción para crear múltiples `action creator` con una sola utilidad a partir de redux actions.

Con lo que llevamos hasta ahora nuestros `action creator` son mucho más simples de lo que teníamos antes, donde ya no tenemos que definir cada objeto individual con un `payload`. Sin embargo, podemos simplificar esto aún más.

En nuestra importación, vamos a cambiar nuestra `import` de `createAction` a `createActions` en plural. Esto nos dará una función que creará múltiples `action creator` para nosotros.

```js
import { createActions } from 'redux-actions'
```

Agregaré una llamada a `createActions` y crearé acciones, tomará un objeto como su primer argumento y este objeto es un mapa de acciónes. En el mapa de acción, voy a usar mis tipos de acción como claves.

```js
createActions(
  {
  UPDATE_CURRENT: fixCase,
  SHOW_LOADER: () => true,
  HIDE_LOADER: () => false
  },
  LOAD_TODOS,
  ADD_TODO,
  REPLACE_TODO,
  REMOVE_TODO,
)

// export const updateCurrent = createAction(UPDATE_CURRENT, fixCase)
// export const loadTodos = createAction(LOAD_TODOS)
// export const addTodo = createAction(ADD_TODO)
// export const replaceTodo = createAction(REPLACE_TODO)
// export const removeTodo = createAction(REMOVE_TODO)
// export const showLoader = createAction(SHOW_LOADER, () => true)
// export const hideLoader = createAction(HIDE_LOADER, () => false)
```

Detrás de escena, la forma en que funciona es que nuestra función de creador de *payload* se reemplaza con una función de identidad y la función de identidad solo toma un valor y lo devuelve.

Poco después de guardar esto, si observamos la aplicación recargada, veremos que todos estos `action creator` se muestran como no definidos, porque ya no los estamos exportando como antes con nuestras llamadas individuales para crear acciones.

La forma en que funciona `createActions`, es devolver un objeto con todos nuestros `action creator`. Cada uno de esos *action creator* será una función con la versión en camelCase de la *key* que usamos en nuestro mapa de acción. 

Por lo tanto podriamos hacer *destructing* de esta funcion para exportar nuestras acciones:

```js
const actionCreators = createActions(
  {
  UPDATE_CURRENT: fixCase,
  SHOW_LOADER: () => true,
  HIDE_LOADER: () => false,
  },
  LOAD_TODOS,
  ADD_TODO,
  REPLACE_TODO,
  REMOVE_TODO,
)

export const {
  updateCurrent,
  loadTodos,
  addTodo,
  replaceTodo,
  removeTodo,
  showLoader,
  hideLoader, 
} = actionCreators
```

Obiamente podriamos mejorar el codigo y tener un resultado final asi:
```js
export const {
  updateCurrent,
  loadTodos,
  addTodo,
  replaceTodo,
  removeTodo,
  showLoader,
  hideLoader,
} = createActions(
  {
    UPDATE_CURRENT: fixCase,
    SHOW_LOADER: () => true,
    HIDE_LOADER: () => false,
  },
  LOAD_TODOS,
  ADD_TODO,
  REPLACE_TODO,
  REMOVE_TODO,
)
```

**NOTA**: En nuestro caso al importar los *types* es neceario usar esta sintaxis

```js
export const {
  updateCurrent,
  loadTodos,
  addTodo,
  replaceTodo,
  removeTodo,
  showLoader,
  hideLoader,
} = createActions(
  {
    [UPDATE_CURRENT]: fixCase,
    [SHOW_LOADER]: () => true,
    [HIDE_LOADER]: () => false,
  },
  [LOAD_TODOS].toString(),
  [ADD_TODO].toString(),
  [REPLACE_TODO].toString(),
  [REMOVE_TODO].toString(),
)
```
### Create a Reducer Function for a Specific Redux Action using redux-actions

Ahora usaremos la función `handleAction` proporcionada por `redux-actions` para crear una función reductora que manejará una acción específica. Luego, incorporaremos esta función reductora en el *reducer* existente y nos aseguraremos de que nuestra aplicación continúe funcionando.

```js
import { handleAction } from 'redux-actions'
```

Voy a utilizar `handleAction` para crear un *reducer* para una de nuestras acciones. Voy a empezar y voy a declarar el `addToDoReducer`. Esto va a ser una llamada para manejar la acción pasando como primer parametro el tipo de acción **ADD_TODO**. Mi segundo argumento será una función reductora que quiero manejar para esta acción. Ella va a recibir el estado y una acción, al igual que lo hace nuestro *reducer*. En esa función, quiero devolver a la actualización el estado en función de la acción. Al igual que nuestro reductor principal, debe incluirse en el estado de inicio. Eso va a ser pasado como el tercer argumento. 

```js
const addTodoReducer = handleAction(
  [ADD_TODO],
  (state, action) => {
    return {
      ...state,
      currentTodo: '',
      todos: state.todos.concat(action.payload)
    }
  },
  initState
)
```
`handleAction` toma un tipo de acción, toma una función reductora y toma un estado inicial.

Ahora solo nos falta cambiar la logica de nuestro *reducer* principal para tener esta nueva función incluida.

```js
export default (state = initState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return addTodoReducer(state, action)
    case LOAD_TODOS:
      return { ...state, todos: action.payload }
    case UPDATE_CURRENT:
      return { ...state, currentTodo: action.payload }
    case REPLACE_TODO:
      return {
        ...state,
        todos: state.todos.map(t => (t.id === action.payload.id ? action.payload : t)),
      }
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload),
      }
    case SHOW_LOADER:
    case HIDE_LOADER:
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}
```

Todo lo que hemos hecho aquí es tomar nuestra lógica del reductor y sacarlo de nuestra declaración de *case* del *switch* para limpiar nuestro código un poco. Todo sigue funcionando igual. Podemos verificar que al guardar esto todo sigue funcionando como se esperaba.
### Combine Individual Reducer Functions into a Single Reducer with reduce-reducers

Ahora, agregaremos la biblioteca de `reduce-reducers` a nuestro proyecto y la utilizaremos junto con la función `handleAction` de `redux-actions` para definir funciones de reductoras separadas para cada acción y reducirlas a una única función con `reduce-reducers`.

Idealmente, nos gustaría poder deshacernos de ese *switch* y crear reductores individuales para cada acción. Comencemos agregando la biblioteca de  `reduce-reducers` a nuestro proyecto. 

```bash
$ npm i -S reduce-reducers
```

Con eso instalado, importémoslo a nuestro archivo `/store/reducers/index.js`. En la parte superior.

```js
import reduceReducers from 'reduce-reducers'
```

Ahora que hemos importado esto, vayamos a nuestro *reducer* principal y hagamos un poco de refactor.

```js
const mainReducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_TODOS:
      return { ...state, todos: action.payload }
    case UPDATE_CURRENT:
      return { ...state, currentTodo: action.payload }
    case REPLACE_TODO:
      return {
        ...state,
        todos: state.todos.map(t => (t.id === action.payload.id ? action.payload : t)),
      }
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload),
      }
    case SHOW_LOADER:
    case HIDE_LOADER:
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}
```

Le dí un nombre a esto, `mainReducer`. Como ya tenemos un *reducer* para **ADD_TODO**, lo eliminaré de la instrucción switch y vamos a manejar los que no tienen reductores individuales en este **mainReducer**.

Ahora voy a reemplazar la exportación predeterminada. Esto va a ser una llamada para reducir los *Reducers*, pasando a nuestro `mainReducer` y nuestro `addTodoReductor`.

```js
export default reduceReducers(mainReducer, addTodoReducer)
```

Todo debería seguir funcionando como antes y ahora tenemos un reductor que encapsula ambas funciones del *reducer*. Esto significa que, en lugar de crear estos reductores individuales y tener que encajarlos en la antigua declaración de *switch/case*, podemos crear un grupo de reductores individuales, reducirlos y devolverlos como una sola función de reductora.

Luego de cambiar todo a acciones individuales tenderemos un codigo como este:

```js
const addTodoReducer = handleAction(
  [ADD_TODO],
  (state, action) => (
    {
      ...state,
      currentTodo: '',
      todos: state.todos.concat(action.payload),
    }
  ),
  initState,
)

const loadTodosReducer = handleAction(
  [LOAD_TODOS],
  (state, action) => ({ ...state, todos: action.payload }),
  initState,
)

const updateCurrentReducer = handleAction(
  [UPDATE_CURRENT],
  (state, action) => ({ ...state, currentTodo: action.payload }),
  initState,
)

const replaceTodoReducer = handleAction(
  [REPLACE_TODO],
  (state, action) => (
    {
      ...state,
      todos: state.todos.map(t => (t.id === action.payload.id ? action.payload : t)),
    }
  ),
  initState,
)

const removeTodoReducer = handleAction(
  [REMOVE_TODO],
  (state, action) => (
    {
      ...state,
      todos: state.todos.filter(t => t.id !== action.payload)
    }
  ),
  initState,
)

const showLoaderReducer = handleAction(
  [SHOW_LOADER],
  (state, action) => ({ ...state, isLoading: action.payload }),
  initState,
)

const hideLoaderReducer = handleAction(
  [HIDE_LOADER],
  (state, action) => ({ ...state, isLoading: action.payload }),
  initState,
)

export default reduceReducers(
  addTodoReducer,
  loadTodosReducer,
  updateCurrentReducer,
  replaceTodoReducer,
  removeTodoReducer,
  showLoaderReducer,
  hideLoaderReducer,
)
```
### Handle Multiple Actions using a Single Function with combineActions in redux-actions

A veces, se pueden usar múltiples acciones para actualizar el estado usando la misma función. En esta punto, veremos cómo usar `combineActions` para manejar acciones separadas pero relacionadas en un solo controlador de acción.

Si echamos un vistazo al reductor `SHOW_LOADER` y al reductor `HIDE_LOADER`, notaremos que están haciendo exactamente lo mismo. Podemos usar redux-actions para combinarlas en un solo reductor. Comencemos saltando a la parte superior de nuestro archivo y actualizando nuestra importación para obtener también la función de acciones combinadas desde redux-actions.

```js
import { combineActions } from 'redux-actions'
```

Vamos a comentar las acciones `showLoaderReducer` y `hideLoaderReducer` y crear un nuevo reductor en su lugar. Simplemente lo llamaremos el `loaderReducer`.

```js
// const loadTodosReducer = handleAction(
//   [LOAD_TODOS],
//   (state, action) => ({ ...state, todos: action.payload }),
//   initState,
// )

// const updateCurrentReducer = handleAction(
//   [UPDATE_CURRENT],
//   (state, action) => ({ ...state, currentTodo: action.payload }),
//   initState,
// )

const loaderAction = '?????'
```

Necesitamos crear un nuevo tipo de acción combinar nuestras dos acciones. Crearemos entonces a `loaderAction` con una llamada a `combineActions`, esto tomará `SHOW_LOADER` y `HIDE_LOADER` como sus argumentos.

```js
const loaderAction = combineActions(SHOW_LOADER, HIDE_LOADER)
```

Ahora crearemos una funcion `loaderReducer` que hará un llamado a `handleAction` y el primer argumento de esta sera la función anterior `loaderAction`. 

```js
const loaderReducer = handleAction(
  loaderAction, 
  (state, action) => ({ ...state, isLoading: action.payload }),
  initState,
)
```

Solo nos resta eliminar `removeTodoReducer` y `showLoaderReducer` de nuestro *export default* y agregar la nueva función `loaderReducer`:

```js
export default reduceReducers(
  addTodoReducer,
  loadTodosReducer,
  updateCurrentReducer,
  replaceTodoReducer,
  removeTodoReducer,
  loaderReducer,
)
```

Si quisiéramos omitir el paso donde definimos esta nueva variable, honestamente podríamos simplemente tomar acciones combinadas, cortarlas desde allí, pegarlas como el primer argumento para manejar Acción. No hay necesidad de crear esa variable intermedia.

```js
const loaderReducer = handleAction(
  combineActions(SHOW_LOADER, HIDE_LOADER),
  (state, action) => ({ ...state, isLoading: action.payload }),
  initState,
)
```
### Create a Reducer Function for Multiple Redux Actions using redux-actions

Estamos utilizando la biblioteca de `reduce-reducers` para tomar estos reductores individuales que hemos creado con la acción de manejar y combinarlos en un solo reductor. Esta es una necesidad bastante común. En esta punto, usaremos la función `handleActions` proporcionada por `redux-actions` para crear un reductor que manejará múltiples acciones, usando un reducerMap.

```js
import { handleActions } from 'redux-actions'
```

Voy a crear una funcion llamada `reducers` que hará un llamado a `handleActions`; *handleActions* tomará un objeto como su primer argumento. Este objeto es un *reducerMap*. En este reducerMap se van a asignar los tipos de acción a funciones reductoras. Después del objeto *reducerMap*, el segundo argumento para manejar las acciones es ese valor `initState`.

```js
const reducer = handleActions({
  [ADD_TODO]: (state, action) => (
    {
      ...state,
      currentTodo: '',
      todos: state.todos.concat(action.payload)
    }
  ),
}, initState)
```
Despues de refactorizar todos nuestros reducers tendremos un codigo como el siguiente:

```js
const reducer = handleActions({
  [ADD_TODO]: (state, action) => (
    {
      ...state,
      currentTodo: '',
      todos: state.todos.concat(action.payload)
    }
  ),
  [LOAD_TODOS]: (state, action) => ({ ...state, todos: action.payload }),
  [UPDATE_CURRENT]: (state, action) => ({ ...state, currentTodo: action.payload }),
  [REPLACE_TODO]: (state, action) => (
    {
      ...state,
      todos: state.todos.map(t => (t.id === action.payload.id ? action.payload : t)),
    }
  ),
  [REMOVE_TODO]: (state, action) => (
    {
      ...state,
      todos: state.todos.filter(t => t.id !== action.payload),
    }
  ),
}, initState)
```

Luego de esto nos podemos preguntar, ¿Como incluir aquí nuestro reduce combinado? la respuesta es simple:

```js
[combineActions(SHOW_LOADER, HIDE_LOADER)]: (state, action) => ({ ...state, isLoading: action.payload })
```

*Codigo final*

```js
const reducer = handleActions({
  [ADD_TODO]: (state, action) => (
    {
      ...state,
      currentTodo: '',
      todos: state.todos.concat(action.payload)
    }
  ),
  [LOAD_TODOS]: (state, action) => ({ ...state, todos: action.payload }),
  [UPDATE_CURRENT]: (state, action) => ({ ...state, currentTodo: action.payload }),
  [REPLACE_TODO]: (state, action) => (
    {
      ...state,
      todos: state.todos.map(t => (t.id === action.payload.id ? action.payload : t)),
    }
  ),
  [REMOVE_TODO]: (state, action) => (
    {
      ...state,
      todos: state.todos.filter(t => t.id !== action.payload),
    }
  ),
  [combineActions(SHOW_LOADER, HIDE_LOADER)]:
    (state, action) => ({ ...state, isLoading: action.payload }),
}, initState)

export default reducer
```
### Handle Error Conditions in a Reducer using redux-actions

En esta punto, veremos cómo podemos manejar las condiciones de éxito y error de forma independiente utilizando las propiedades `next` y `throw` en un `reducerMap` con `handleActions`.

Actualmente, las funciones `reducer` que están en nuestro `reducerMap` solo manejan el camino feliz. Nada aquí explica una condición de error. Simulemos un error y veamos qué sucede con el reductor de `loadTodo` cuando nuestro servicio lanza una excepción. Para esto, voy hacer un cambio en el archivo de servicios `/lib/todoServices.js` para devolver una excepción.

```js
export const getTodos = () => {
  return fetch(baseUrl).then(res => res.json())
  .then(() => {
    throw new Error('Boom!')
  })
}
```
Veremos que nuestro indicador de carga se prolongó un poco más de lo esperado y ahora tenemos este rechazo no manejado con nuestro error de *Boom!*.

Ahora, volvamos a nuestro archivo `/store/actions/index.js` y vamos a revisar la función `fetchTodos`, esta función no controla la excepción con la función `catch`. Normalmente nosotros creariamos un nuevo *action creator* que agregaría otro paso a nuestro reductor y básicamente esto nos permitiría enviar una acción de error. En su lugar, lo que vamos a hacer a llamar a `loadTodos` como lo hicimos antes, pero esta vez vamos a pasar nuestro error. También vamos a enviar `hideLoader`, para que se esconda mejor.

```js
export const fetchTodos = () => (dispatch) => {
  dispatch(showLoader())

  getTodos()
    .then((todos) => {
      dispatch(loadTodos(todos))
      dispatch(hideLoader())
    })
    .catch((err) => {
      dispatch(loadTodos(err))
      dispatch(hideLoader())
    })
}
```

Ahora, volvamos a nuestra función de `reducer` en `/store/reducers/index.js` y veamos cómo podemos hacer que esto funcione. En `LOAD_TODOS`, verás que esperamos que nuestro `payload` sea un array de *todos*. Eso funciona en nuestro camino feliz, pero con la forma en que acabamos de enviar esta acción, ahora estamos enviando un error.

Obviamente, el error no va a funcionar en lugar de nuestro array de objetos de *Todo*. El formato de **flux standard action** que estamos usando para estos objetos de acción tiene una propiedad de **error** que es un indicador booleano. Si nuestro objeto `payload` es un error, nuestro *action cretator* establecerá ese indicador de error en verdadero y debido a que estamos usando `action-redux` para nuestros *action cretators*, esto se maneja automáticamente y no tenemos que hacer nada.

Lo que debemos hacer es diferenciar cómo queremos manejar nuestro reduce en función de si se trata de un objeto de error o no. Lo que vamos a hacer es que, en lugar de utilizar la función reductora como nuestro valor para esta clave `LOAD_TODOS`, le pasaremos un objeto.

Ese objeto tendrá dos keys propias, `next` y `throw`, donde `next` será nuestra función reductora y `throw` es una función reductora, pero esta es la que llamamos si nuestro `payload` es un error y la clave de error en esa acción se establece en true.

```js
[LOAD_TODOS]: {
  next: (state, action) => ({ ...state, todos: action.payload }),
  throw: (state, action) => ({ ...state, message: action.payload.message }),
},
```

Al igual que antes, extendí el estado existente. Ahora, lo que quiero hacer es establecer la propiedad del mensaje y esto mostrará un mensaje en la parte superior de nuestra página. Porque, sé que estoy dentro de este reductor de error entonces el *payload* va a ser un objeto de error. Voy a usar `action.payload`, que es mi objeto de error y voy a usar la propiedad de `message` de ese objeto de error para definir cuál debería ser el texto del mensaje. 

Guardarémos esto. Regresamos al navegador y esta vez cuando se vuelva a cargar, obtendremos nuestro error, pero nuestro indicador está oculto y nuestro mensaje se muestra con el texto que dimos en ese error.
### Add Meta Data to a Redux Action with redux-actions

En la ultima parte de nuestro proyecto, agregaremos metadatos a una acción de redux usando el argumento opcional de la función metaCreator para `createAction`. Adjuntar metadatos a una acción nos permite pasar información que no forma parte de nuestra carga útil a nuestro reductor. En este caso, utilizaremos la meta propiedad en nuestra acción para mostrar un mensaje de error con información específica de la acción.

Voy a simular un error mientras guardo una nueva tarea, para este parte vamos a repetir el procedimiento del punto aterior en `/lib/todoServices.js` pero ahora en la función `createTodo`.

```js
export const createTodo = (name) => {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, isComplete: false }),
  }).
  then(res => res.json())
  .then(() => {
    throw new Error('Boom!')
  })
}
```

Ahora en `/store/actions/index.js` vamos a capturar esta excepción en la función `saveTodo`

```js
export const saveTodo = name => (dispatch) => {
  dispatch(showLoader())

  createTodo(name)
    .then((res) => {
      dispatch(addTodo(res))
      dispatch(hideLoader())
    })
    .catch((err) => {
      dispatch(addTodo(err))
      dispatch(hideLoader())
    })
}
```

Y por ultimo ajustaremos nuestra función reductora `ADD_TODO` en `/store/reducers/index.js` para que tenga un objeto con las keys `next` y `throw`

```js
[ADD_TODO]: {
  next: (state, action) => (
    {
      ...state,
      currentTodo: '',
      todos: state.todos.concat(action.payload),
    }
  ),
  throw: (state, action) => ({ ...state, message: 'There was a problem saving the todo' }),
},
```

Me gustaría hacer este mensaje de error un poco más específico. Voy a ir hasta a donde estamos capturando y enviando la acción con el objeto de error y voy a pasar un segundo argumento que será el nombre que se pasa en `saveTodo` originalmente.

```js
export const saveTodo = name => {
  return dispatch => {
    dispatch(showLoader())
    createTodo(name)
      .then(res => {
        dispatch(addTodo(res))
        dispatch(hideLoader())
      })
      .catch(err => {
        dispatch(addTodo(err, name))
        dispatch(hideLoader())
      })
  }
}
```
Ahora tal como está, *addTodo* tomará el error y tendrá un **payload**. Necesitamos una forma de incluir esta propiedad `name` en el reductor para poder usarlo como parte de ese mensaje. Aquí es donde la meta propiedad de un objeto *flux standard action * entra en juego.

Nuestro creador de acción `addTodo` nos da la posibilidad de tomar este valor y ponerlo en una propiedad de metadatos en esa acción.

Ahora, normalmente en el mapa de acción, estos tipos de acción se asignan a la función de creador del *payload* pero también tenemos una función de creador de metadatos que también podemos pasar. En realidad, voy a pasar una array y esto va a ser dos funciones.

En `/store/actions/index.js` vamos a comentar la acción de identidad `ADD_TODO` y debajo de `HIDE_LOADER` vamos agregarla nuevamente pero ahora sera una propiedad que recibe un array de dos funciones.

```js
export const {
  updateCurrent,
  loadTodos,
  addTodo,
  replaceTodo,
  removeTodo,
  showLoader,
  hideLoader,
} = createActions(
  {
    [UPDATE_CURRENT]: fixCase,
    [SHOW_LOADER]: () => true,
    [HIDE_LOADER]: () => false,
    [ADD_TODO]: [x => x, (pay, name) => ({ name })],
  },
  [LOAD_TODOS].toString(),
  // [ADD_TODO].toString(),
  [REPLACE_TODO].toString(),
  [REMOVE_TODO].toString(),
)
```
El primero parametro del array es para el creador *payload*. Realmente no quiero cambiar eso, solo voy a usar una función de identidad simple aquí. El segundo va a ser para mis metadatos. Esto tomará dos argumentos, tomará el valor que se está pasando para usar el `payload` y también va a tomar ese segundo argumento que en este caso es `name`. Entonces, quiero devolver un objeto con estos metadatos. Como no quiero tener en cuenta mi *payload* voy a cambiarlo con un `_` y voy a devolver un objecto `{ name: name }`

```js
[ADD_TODO]: [x => x, (_, name) => ({ name })],
```

Ahora que vamos a tenerlo disponible, actualicemos nuestro mensaje de error. En este caso, vamos a acceder a eso a través de `action.meta.name`.

```js
const reducer = handleActions({
  [ADD_TODO]: {
    next: (state, action) => (
      {
        ...state,
        currentTodo: '',
        todos: state.todos.concat(action.payload),
      }
    ),
    throw: (state, action) => ({ ...state, message: `There was a problem saving the todo ${action.meta.name}` }),
  },
}, initState)
```
Vamos a guardar esto. Volveremos a cargar nuestra aplicación en el navegador. Esta vez, cuando intentemos agregar una nueva tarea, veremos que esta vez es parte de nuestro mensaje de error.

Eso se agregó realmente a nuestros metadatos en nuestro objeto de acción, que podemos verlo en las herramientas de desarrollo de Redux.

Con esto terminamos, **¡Espero que esto haya sido útil y/o te haya hecho aprender algo nuevo!**
