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

### Add redux-actions as a Dependency of a React and Redux App

Lo primero que vamos a hacer es revisar la aplicación React y Redux con la que trabajaremos e instalaremos redux-actions como una dependencia de proyecto usando npm.

```bash
# We need to install that as dependency for our project
$ npm i -S redux-actions
```
### Refactor a Redux Action Creator using the createAction function from redux-actions

En esta lección, tomaremos uno de los creadores de acciones existentes y lo reemplazaremos usando la función createAction proporcionada por redux-actions. El uso de createAction reduce algunos de los problemas y, lo que es más importante, garantiza que nuestras Acciones se adhieran a la estructura FSA (Flux Standard Action).

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


### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
