#!/bin/sh
docker-compose down

# Start Docker Compose services
echo "Starting Docker Compose services..."
docker-compose up --build 

# Check if Docker Compose started successfully
if [ $? -ne 0 ]; then
    echo "Failed to start Docker Compose services."
    exit 1
fi
