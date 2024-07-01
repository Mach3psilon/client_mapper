# Use the official Python image
FROM python:3.10-slim

# Set the working directory in the Docker container
WORKDIR /app

# Install the required packages
COPY src/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code and environment files to the src directory
COPY src/ ./src/

COPY db/sqlite.db ./db/sqlite.db

# Ensure PYTHONPATH includes the src directory
ENV PYTHONPATH=/app/src

CMD ["python", "src/server.py"]
# # Run the FastAPI server on container startup
# CMD ["uvicorn", "src.server:app", "--host", "0.0.0.0", "--port", "8000"]
