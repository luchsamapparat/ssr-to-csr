FROM openjdk:15-jdk as build
WORKDIR /workspace/app

COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src

RUN ./mvnw install -DskipTests -DskipFrontend

FROM openjdk:15-jdk-alpine

COPY --from=build /workspace/app/target/todo-app-*.jar /app/todo-app.jar

ENTRYPOINT ["java", "-jar", "/app/todo-app.jar"]