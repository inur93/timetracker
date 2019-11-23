# Dockerfile #
This file is rather simple and its only job is to build our java REST API.
We change our image working directory to /tmp and copy our pom.xml file into the image at /tmp:
```Dockerfile
WORKDIR /tmp
COPY pom.xml .
```
Then we add a dependency called go-offline which will resolve all of our dependencies. This will make sure that the maven dependencies are saved in the image and do not have to be downloaded each time a container is started:
```Dockerfile
RUN mvn dependency:go-offline
```
Finally we package the application to a WAR file. This command is not run until a container is started:
```Dockerfile
CMD ["mvn", "package"]
```
And that's it. By running this image a new WAR file is generated. So when using fx and IDE like IntelliJ run this image instead of the builtin build configuration. This image is run automatically within the `docker-compose.yml` file but can be run over and over to create a new build that will be automatically loaded into tomcat ready for debugging.
See the documentation for the server in the `docker-compose.yml` documentation TODO // add docs

