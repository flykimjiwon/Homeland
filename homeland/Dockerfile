FROM gradle:6.9.2-jdk11

WORKDIR /backend

#여기에 스프링 프로젝트를 올리고 gradle 명령어로 실행시킴
COPY . /backend/


CMD ["/usr/bin/gradle","build"]
CMD ["/usr/bin/gradle","bootRun"]
