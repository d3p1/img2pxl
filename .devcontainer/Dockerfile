##
# @description Dockerfile for Dev Container
# @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
##
FROM node:18

##
# @note Install basic development tools
##
RUN apt update && apt install -y less man-db sudo

##
# @note Ensure default `node` user has access to `sudo`
##
ARG USERNAME=node
RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME

##
# @note Set `DEVCONTAINER` environment variable to help with orientation
##
ENV DEVCONTAINER=true
