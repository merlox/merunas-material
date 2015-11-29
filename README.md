# merunas-material
angular material with express web app personal project

## para configurar el git remote url
para que no nos pida los credenciales a cada git push

```
git config remote.origin.url https://{{username}}:{{password}}@github.com/{{username}}/{{repository name}}
```

## Querys y parametros en express
En express podemos hacer que un param:

`/api/thumbnails/:parametro`

sea opcional añadiendo un `?` al final del parametro

`/api/thumbnails/:parametro?`

### Query o busquedas
Las querys son

`/api/thumbnails?busqueda=ejemplo`

y en express se guardan en:

`req.query.busqueda`

### Si hay un error ya sea en el server o en el cliente
Colocar un minimo de 3 console.logs describiendo el proceso que deberia ocurrir en el caso de que funcionase correctamente

ej:

```javascript
console.log('Aqui deberia ejecutarse la function');
console.log('Aqui deberia recibirse el data del find()');
```

## Passport authentication
Para usar passport estoy siguiendo el tutorial del libro mean web development sobre passport paso por paso.

## Configuración inicial de passport (sin detallar at the moment)
### Diferentes partes de passport
There are three main parts in using passport.js:
1. Requiring the module and using its passport.initialize() and passport.session() middleware with express.
2. Configuring passport with at least one Strategy and setting up passport's serializeUser and deserializeUser methods.
3. Specifying a route which uses the passport.authenticate middleware to actually authenticate a user.

`serializeUser` se encargar de decidir que información guardar en la sesión, se guardará en:

```javascript
  req.session.passport.user = { // our serialised user object // }.
```

The result is also attached to the request as `req.user`.

Entonces después se llamará a la request.

#### Functionamiento de la session de passport con la sesión iniciada
SUBSEQUENT AUTHENTICATED REQUESTS FLOW

On subsequent request, the following occurs:
1. Express loads the session data and attaches it to the req. As passport stores the serialised user in the session, the serialised user object can be found at `req.session.passport.user`.
2. The general passport middleware we setup (`passport.initialize`) is invoked on the request, it finds the `passport.user` attached to the session. If is doesn't (user is not yet authenticated) it creates it like `req.passport.user = {}`.
3. Next, `passport.session` is invoked. This middleware is a Passport Strategy invoked on every request. If it finds a serialised user object in the session, it will consider this request authenticated.
4. The `passport.session` middleware calls `passport.deserializeUser` we've setup. Attaching the loaded user object to the request as `req.user`.

##### Resumen de funciones de passport
SUMMARY PASSPORT METHODS AND MIDDLEWARE
- `passport.initialize` middleware is invoked on every request. It ensures the session contains a passport.user object, which may be empty.
- `passport.session` middleware is a Passport Strategy which will load the user object onto `req.user` if a serialised user object was found in the server.
- `passport.deserializeUser` is invoked on every request by `passport.session`. It enables us to load additional user information on every request. This user object is attached to the request as req.user making it accessible in our request handling.
- Our Local Strategy is only invoked on the route which uses the `passport.authenticate` middleware.
- Only during this authentication `passport.serializeUser` is invoked allowing us the specify what user information should be stored in the session.
- OVERVIEW PASSPORT METHODS ATTACHED TO THE REQUEST

###### Passport methods accessible within request handlers:
- req.login()
- req.logout()
- req.isAuthenticated()
- req.isUnAuthenticated()

## Definicion de callback
Una función asignada or pasada como un argument.

```javascript
var yo = function(){} //<-- callback function
```

```javascript
yo(function(){}) //<-- callback function
```

That is what we call a callback.

### Cuando se ejecuta el callback?
Cuando un callback se ejecuta _sometime in the future_ osea que es asincrono, esto quiere decir que el código _nunca se ejecutará_ mientras el síncrono, osea el código principal, esté en funcionamiento, esto es debido a que javascript es **singlethread**.

**Por ello ejecutará los callbacks uno por uno tras el código síncrono principal**

Los callback se crean `síncronomicamente` pero ejecutados `asíncronicamente`.
