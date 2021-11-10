FROM archlinux:latest
EXPOSE 80
EXPOSE 443
USER root
RUN ["pacman","--noconfirm","-Syu","nodejs","npm"]
VOLUME [ "/data" ]
WORKDIR /data
CMD [ "sh","/data/build.sh" ]