FROM node:alpine

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV HOST=0.0.0.0

WORKDIR /app

# 1. Copier seulement les fichiers de dépendances pour profiter du cache de Docker
COPY package.json ./

# 2. Activer Corepack / pnpm
RUN corepack enable \
 && corepack prepare pnpm@10.9.0 --activate

# 3. Installer les dépendances en cachant le store pnpm
#    Le dossier /home/node/.pnpm-store sera conservé entre les builds
RUN  pnpm install

# 4. Copier le reste du code
COPY . .


EXPOSE  3001

CMD ["pnpm", "dev"]