---
title: "Administración básica de Linux: Comandos básicos"
date: 2023/02/10
lang: es
duration: 10min
---

<div class="text-center max-w-lg mx-auto">
  <h1>{{ `${title}` }}</h1>
  {{ `${date}` }}
</div>

Linux es un sistema operativo de código abierto que se utiliza ampliamente en servidores, computadoras de escritorio y dispositivos móviles. En este artículo, aprenderemos sobre la administración básica de Linux y algunos comandos esenciales para trabajar con el terminal de Linux. El siguiente contenido está escrito en formato Markdown para facilitar su lectura y uso.

## Índice

1. [Introducción al terminal de Linux](#introducción)
2. [Navegación en el sistema de archivos](#navegación)
3. [Manipulación de archivos y directorios](#manipulación)
4. [Permisos de archivos y directorios](#permisos)
5. [Gestión de procesos](#procesos)
6. [Conclusión](#conclusión)

<a name="introducción"></a>
## 1. Introducción al terminal de Linux

El terminal de Linux es una interfaz de línea de comandos (CLI) que permite a los usuarios interactuar con el sistema operativo. A través del terminal, puedes ejecutar comandos para realizar diversas tareas, como navegar en el sistema de archivos, manipular archivos y directorios, gestionar procesos, entre otros.

<a name="navegación"></a>
## 2. Navegación en el sistema de archivos

- `pwd`: Muestra la ruta del directorio actual.
- `cd`: Cambia el directorio actual. Por ejemplo, `cd /ruta/del/directorio`.
- `ls`: Lista los archivos y directorios en el directorio actual. Puedes usar `ls -l` para ver más detalles o `ls -a` para ver también los archivos ocultos.

<a name="manipulación"></a>
## 3. Manipulación de archivos y directorios

- `mkdir`: Crea un nuevo directorio. Por ejemplo, `mkdir nuevo_directorio`.
- `touch`: Crea un archivo vacío. Por ejemplo, `touch archivo.txt`.
- `cp`: Copia un archivo o directorio. Por ejemplo, `cp archivo.txt copia_archivo.txt` o `cp -r directorio/ copia_directorio/`.
- `mv`: Mueve o renombra un archivo o directorio. Por ejemplo, `mv archivo.txt nuevo_nombre.txt` o `mv directorio/ nueva_ubicación/`.
- `rm`: Elimina un archivo. Por ejemplo, `rm archivo.txt`. Para eliminar un directorio y su contenido, utiliza `rm -r directorio/`.

<a name="permisos"></a>
## 4. Permisos de archivos y directorios

- `chmod`: Cambia los permisos de un archivo o directorio. Por ejemplo, `chmod 755 archivo.txt` o `chmod u+x archivo.txt`.
- `chown`: Cambia el propietario de un archivo o directorio. Por ejemplo, `chown usuario:grupo archivo.txt`.
- `umask`: Establece los permisos predeterminados para archivos y directorios nuevos. Por ejemplo, `umask 022`.

<a name="procesos"></a>
## 5. Gestión de procesos

- `ps`: Muestra los procesos en ejecución. Puedes usar `ps aux` para ver todos los procesos en el sistema.
- `top`: Muestra información en tiempo real sobre los procesos en ejecución y el uso de recursos del sistema. Para salir de `top`, presiona la tecla `q`.
- `kill`: Envía una señal a un proceso para terminarlo. Por ejemplo, `kill -9 12345`, donde `12345` es el ID del proceso (PID).
- `bg`: Continúa la ejecución de un proceso en segundo plano.
- `fg`: Trae un proceso en segundo plano al primer plano.

<a name="conclusión"></a>
## 6. Conclusión

En este artículo, hemos cubierto la administración básica de Linux y algunos comandos esenciales para trabajar con el terminal de Linux. Dominar estos comandos básicos te ayudará a ser más eficiente y cómodo al trabajar con sistemas Linux. Por supuesto, hay muchos más comandos y opciones disponibles, pero estos comandos básicos te proporcionarán una sólida base para comenzar a explorar y administrar tu entorno Linux. No dudes en consultar las páginas del manual (`man comando`) para obtener más información y opciones para cada comando.





