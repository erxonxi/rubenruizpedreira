---
title: Crear tu primer clúster de Kubernetes con k0s
date: 2022-01-10T00:00:00.000+00:00
lang: es
duration: 7min
---
<div class="text-center max-w-lg mx-auto">
  <h1>{{ `${title}` }}</h1>
  {{ `${new Date(date).getFullYear()}/${new Date(date).getMonth()}/${new Date(date).getDate()} &middot; ${duration} read` }}
</div>

Buenas, lectores, hoy vamos a desplegar nuestro primer clúster de Kubernetes con 2 nodos usando k0s, para en próximos artículos podamos desplegar nuestros servicios (frontends, microservicios...).

## Requisitos


- 2 instancias (diferentes ``hostnames``)


## Preparación

### Certificado para las conexiones SSH

Primero de todo tendremos que preparar los certificados para establecer conexión con las instancias y poder administrarlas remotamente.

Si no disponemos de un certificado para la conexión lo crearemos usando el siguiente comando:

```sh
ssh-keygen
``` 

Nos pedirá que indiquemos el nombre del fichero, podéis dejarlo por defecto.

Seguidamente, copiaremos el certificado en las instancias usando el siguiente comando, tendremos que introducir la contraseña del usuario:

```sh
ssh-copy-id <user>@<ip-instancia>
``` 

Ahora podemos conectarnos a la instancia usando el criticado, lo podemos comprobar:


```sh
ssh <user>@<ip-instancia>
``` 

### Descargar k0s

Para continuar tendremos que descargar la herramienta k0s. Recomiendo utilizar la última versión estable. En mi caso la v0.11.4.

 [k0s Releases](https://github.com/k0sproject/k0sctl/releases) 

 [k0s v0.11.4](https://github.com/k0sproject/k0sctl/releases/tag/v0.11.4) 

Descargaremos el binario:

```sh
wget https://github.com/k0sproject/k0sctl/releases/download/v0.11.4/k0sctl-linux-x64
``` 

Le ponemos un nombre más bonito 🤩 y le damos permisos de ejecución:

```sh
mv k0sctl-linux-x64 k0sctl && chmod u+x k0s
``` 

### Iniciar Clusters

Crearemos el fichero de configuración usando el siguiente comando:

```sh
./k0sctl init > k0sctl.yml
``` 

Modificaremos el fichero y cambiaremos las ips de las instancias y el directorio del fichero del certificado si es diferente.

En este caso un nodo va a ejercer de controlador y de trabajador y el segundo nodo solo de trabajador.

```yml
apiVersion: k0sctl.k0sproject.io/v1beta1
kind: Cluster
metadata:
  name: k0s-cluster
spec:
  hosts:
    - ssh:
        address: <ip-instancia-1>
        user: root
        port: 22
        keyPath: /home/<user>/.ssh/id_rsa
      role: controller+worker
    - ssh:
        address: <ip-instancia-2>
        user: root
        port: 22
        keyPath: /home/<user>/.ssh/id_rsa
      role: worker
  k0s:
    version: 1.22.5+k0s.0
``` 

Seguidamente, vamos a aplicar la configuración, esto puede tardar unos minutos, ya que va a preparar nuestras instancias.

```sh
~ ⌚ 15:09:17
$ ./k0sctl apply --config k0sctl.yml

⠀⣿⣿⡇⠀⠀⢀⣴⣾⣿⠟⠁⢸⣿⣿⣿⣿⣿⣿⣿⡿⠛⠁⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀█████████ █████████ ███
⠀⣿⣿⡇⣠⣶⣿⡿⠋⠀⠀⠀⢸⣿⡇⠀⠀⠀⣠⠀⠀⢀⣠⡆⢸⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀███          ███    ███
⠀⣿⣿⣿⣿⣟⠋⠀⠀⠀⠀⠀⢸⣿⡇⠀⢰⣾⣿⠀⠀⣿⣿⡇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀███          ███    ███
⠀⣿⣿⡏⠻⣿⣷⣤⡀⠀⠀⠀⠸⠛⠁⠀⠸⠋⠁⠀⠀⣿⣿⡇⠈⠉⠉⠉⠉⠉⠉⠉⠉⢹⣿⣿⠀███          ███    ███
⠀⣿⣿⡇⠀⠀⠙⢿⣿⣦⣀⠀⠀⠀⣠⣶⣶⣶⣶⣶⣶⣿⣿⡇⢰⣶⣶⣶⣶⣶⣶⣶⣶⣾⣿⣿⠀█████████    ███    ██████████

k0sctl v0.11.4 Copyright 2021, k0sctl authors.
Anonymized telemetry of usage will be sent to the authors.
By continuing to use k0sctl you agree to these terms:
https://k0sproject.io/licenses/eula
INFO ==> Running phase: Connect to hosts
``` 

Una vez terminado tendremos que configurar nuestro `kubectl ` para usar este clúster. Para ello vamos a configurar una variable en nuestra máquina.

Primero de todo crearemos el fichero de configuración de `kubectl `usando el siguiente comando:

```sh
./k0sctl kubeconfig > kubeconfig
```

Exportamos la variable de la siguiente forma y podemos ver que ya podemos ver la información del clúster:

```sh
~ ⌚ 15:58:01
$ export KUBECONFIG=/home/ruben/kubeconfig

~ ⌚ 15:58:46
$ kubectl get nodes
NAME         STATUS   ROLES    AGE     VERSION
rrp-node-1   Ready    <none>   3m55s   v1.22.5+k0s
rrp-node-2   Ready    <none>   3m56s   v1.22.5+k0s
```

I así de fácil es crear un clúster de Kubernetes con k0s. Espero que os parezca interesante.

```sh
$ send saludos!
```