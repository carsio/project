# Etapa 1: Construção
FROM node:18 as build

# Diretório de trabalho no container
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código
COPY . .

# Constrói o projeto para produção
RUN npm run build

# Etapa 2: Servir os arquivos e configurar o túnel reverso
FROM alfg/nginx-rtmp

# Instala o cliente SSH
RUN apk update && apk add openssh-client

# Diretório de trabalho para servir arquivos estáticos
WORKDIR /www/static

# Copia os arquivos construídos da etapa anterior para o Nginx
COPY --from=build /app/dist /www/static

# Copia o arquivo de configuração do Nginx
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Copia a chave SSH para acessar a máquina B
COPY .ssh/id_rsa /root/.ssh/id_rsa
RUN chmod 600 /root/.ssh/id_rsa

RUN env

# Expõe a porta 80 para o Nginx
EXPOSE 80

# Comando para iniciar o túnel reverso e o Nginx
CMD ["sh", "-c", "ssh-keyscan -H $SSH_HOST > /root/.ssh/known_hosts && ssh -N -R 0.0.0.0:$REMOTE_PORT:localhost:$LOCAL_PORT $SSH_USER@$SSH_HOST & nginx"]

# CMD envsubst "$(env | sed -e 's/=.*//' -e 's/^/\$/g')" < \
#   /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && \
#   nginx