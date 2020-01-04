FROM maven:3.6.2-jdk-11

WORKDIR /tmp
COPY pom.xml .
RUN mvn dependency:go-offline

CMD ["mvn", "package"]