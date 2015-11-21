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

###### Query o busquedas

Las querys son

`/api/thumbnails?busqueda=ejemplo`

y en express se guardan en:

`req.query.busqueda`
