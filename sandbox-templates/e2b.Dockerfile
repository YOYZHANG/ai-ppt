# You can use most Debian-based base images
FROM node:21-slim

# Install dependencies and customize sandbox
WORKDIR /home/user/slidev
Run npm install -g npm
RUN npm install @slidev/cli @slidev/theme-default @slidev/theme-seriph

RUN touch slides.md
RUN apt-get update && apt-get install -y xdg-utils && apt-get clean && rm -rf /var/lib/apt/lists/*
RUN mv /home/user/slidev/* /home/user/ && rm -rf /home/user/slidev

EXPOSE 3030
# Move the Vue app to the home directory and remove the Vue directory
CMD ["npx", "slidev", "--remote"]
