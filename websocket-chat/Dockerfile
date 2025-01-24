# Etapa 1: Build
FROM golang:1.23.5 AS builder

# Configura o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY go.mod go.sum ./
RUN go mod download

COPY . .

# Compila a aplicação
RUN go build -o app .

# Etapa 2: Runtime
FROM debian:bookworm-slim

# Configura o diretório de trabalho no runtime
WORKDIR /app

# Copia o binário gerado na etapa de build
COPY --from=builder /app/app .

# Define a porta que será exposta
EXPOSE 8080

# Comando de inicialização
CMD ["./app"]