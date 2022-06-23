---
title: Automatizaciones de despliegue de servidores con Ansible
date: 2022/01/10
lang: es
duration: 7min
---
<div class="text-center mx-auto">
  <h1>{{ `${title}` }}</h1>
  {{ `${date}` }}
</div>

Hoy vamos a ver una herramienta para automatizar tareas o despliegues de servidores. De esta forma si tubiesemos que realizar replicas de un servidor, podriamos rea

El otro dia estava montando mi primer Jenkins para tener el control de la integración continua de mis repositorios. La verdad es que GitHub Actions esta muy bien, pero se me quedava corto en ciertas funcionalidades.

Decidi automatizar la preparación e instalación de Jenkis en el servidor. De esta forma si tengo que añadir algun *trabajador* podre realizar-lo de forma sencilla.

La herramienta usada es Ansiable