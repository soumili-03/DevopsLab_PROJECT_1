FROM jenkins/jenkins:lts

USER root

# Install Docker CLI (simplified approach)
RUN apt-get update && \\
    apt-get install -y curl && \\
    curl -fsSL https://get.docker.com | sh

# Install plugins
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN /usr/local/bin/install-plugins.sh < /usr/share/jenkins/ref/plugins.txt

USER jenkins