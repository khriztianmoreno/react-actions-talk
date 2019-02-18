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
