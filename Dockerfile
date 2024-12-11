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

# Etapa 2: Servir os arquivos
FROM alfg/nginx-rtmp

# Remove o arquivo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos construídos para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia o arquivo de configuração do Nginx (opcional, caso precise configurar algo customizado)
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Exponha a porta 80
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]