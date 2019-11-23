# Running with Docker #
The project includes two different docker-compose configurations. Since MongoDB does not work with a shared volume on a Windows OS there has to be made some additional steps to make the database persistent. Note that these docker configurations are only made for development purposes and should not be used in a production setup.
This manual is written using PowerShell as terminal. If using other terminals there might have to be made som changes in some commands.
## Requirements ##
1. Current docker version is `Docker version 19.03.4, build 9013bf5`
2. Make sure that the following ports are available. These can if necessary be changed in the `docker-compose.yml` file:
   * 3000, used for the React application
   * 35729, used for the hot reload of the React application
   * 8080, used for the REST api
   * 27017, used for the database
## Development non persistent ##
This is the basic setup which will get you up and running within few minutes. Note that the database will be cleared when the container is stopped.
1. Open PowerShell in the `/DEV` folder where the `docker-compose.yml` is located.
2. Run '`docker-compose up --build`' 
3. Running the first the images have to be built which could take some time. Following runs should be up and running within a minute.
4. Check that the app is running by going to `http://localhost:3000` default credentials are:
* username: admin
* password: admin

## Development persistent ##
To be able to create a volume for MongoDB we need some additional setup.
We need to install WSL (Windows Subsystem for Linux). This will allow us to create volume to persist the database files. (TODO figure out where the database files end up)
1. Download and install the WSL from here: https://docs.microsoft.com/da-dk/windows/wsl/install-win10 you can either install it from Microsoft Store or using the direct download link. I used the direct link for 'Ubuntu 18.04 LTS'
2. Run the downloaded program. The first time some setup is required and some of the files we will need for later are being generated.
3. Locate the `.bashrc` file which should be located in folder similar to this one `C:\Users\Runi\AppData\Local\Packages\CanonicalGroupLimited.Ubuntu18.04onWindows_79rhkp1fndgsc\LocalState\rootfs\home\inur93` and add the following lines at the end:
```bashrc
export PATH="$HOME/bin:$HOME/.local/bin:$PATH"
export PATH="$PATH:/mnt/c/Program\ Files/Docker/Docker/resources/bin"
alias docker=docker.exe
alias docker-compose=docker-compose.exe
```
4. Run WSL. If you get a message that you don't have permissions on the `.bashrc` file 
   1.  run `chomd 777 /home/username/.bashrc` to grant all permissions on the file. These permissions might be reverted if you make any changes to the `.bashrc` file.
   2. Close WSL
   3. Open Powershell and run `wsl -t Ubuntu-18.04`. If the parameter is not correct run `wsl -l` to see the distribution name and use that instead. This will restart the WSL service and changes made in the `.bashrc` will take effect.
   4. Run WSL again.
5. Run `docker ps` to test if the changes did work. If not try step 4.3 again.
6. Now we can run the development environment with WSL by navigating to the project folder (`.../timetracker/DEV/persistent`) containing the `docker-compose.yml` that creates the persistent database.
   * note that the drives are located in `/mnt/` which means if your project is located in fx `F:\docker\samples` the path in WSL is `/mnt/f/docker/samples`.
7. Run `docker-compose up --build`

# Cheat sheet #
Useful unix docker commands that have been used during this project.

## WSL ##
* `ls -la ./path/to/fileOrFoler` or just `ls -la` to show permissions on a file.
* `chmod 777 /path/to/file` to change permissions on a file.
    * Permission explained:
       * 0 no permission
       * 1 execute
       * 2 write
       * 4 read
    * Digits explained:
       1. Permissions of the owner
       2. Permissions for the group
       3. Permissions for others
## Docker ##
* `docker build -t imagename .`
* `docker run -it imagename`
* `find / -type d -iname '*java*`
* `/usr/local/openjdk-11`
* `/root/.m2`

# Dockerfiles #
See each Dockerfile explained below:
* [/api/Dockerfile](api/README.md) builds the rest api
* [/frontend/Dockerfile](frontend/README.md) builds and runs react application

# docker-compose.yml #
