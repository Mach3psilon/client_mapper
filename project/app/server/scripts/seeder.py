import sqlite3
import pandas as pd
import time

# Path to your Excel file
excel_file_path = '../db/Enodo_Skills_Assessment_Data_File.xlsx'

# Read the Excel file
df = pd.read_excel(excel_file_path)

# Convert 'PIN' column to string to avoid scientific notation issues
df['PIN'] = df['PIN'].astype(str)

# Ensure all columns are present
required_columns = [
    'Full Address', 'CLASS_DESCRIPTION', 'ESTIMATED_MARKET_VALUE', 'BLDG_USE', 'BUILDING_SQ_FT'
]
# Add any missing columns with default values (e.g., None or 0)
for col in required_columns:
    if (col not in df.columns):
        df[col] = None

# Function to connect to the database with retry mechanism
def connect_to_db(db_path):
    
    conn = sqlite3.connect(db_path)  # Increased timeout to 30 seconds
    return conn


        

# Connect to SQLite database (or create it)
conn = connect_to_db('../db/sqlite.db')
c = conn.cursor()

print("Seeding data...")
# Create table with all the fields and appropriate data types
c.execute('''
CREATE TABLE IF NOT EXISTS enodo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_address TEXT,
    class_description TEXT,
    estimated_market_value TEXT,
    building_use TEXT,
    building_square_feet TEXT
)
''')
print("Table created successfully!")

# Insert data into the table
for index, row in df.iterrows():
    try:
        print(f"Inserting row {index + 1} of {len(df)}")
        #print(row['Full Address'], row['CLASS_DESCRIPTION'], row['ESTIMATED_MARKET_VALUE'], row['BLDG_USE'], row['BUILDING_SQ_FT'])
        
        c.execute('''
        INSERT INTO enodo (
            full_address, class_description, estimated_market_value, building_use, building_square_feet
        ) VALUES (?, ?, ?, ?, ?)
        ''', (
            row['Full Address'], row['CLASS_DESCRIPTION'], row['ESTIMATED_MARKET_VALUE'], row['BLDG_USE'], row['BUILDING_SQ_FT']
        ))

        print(f"Row {index + 1} inserted successfully!")
    except Exception as e:
        print(f"Error inserting row {index + 1}: {e}")

        # Sleep for 0.1 seconds to avoid hitting the database too hard
        time.sleep(0.1)

print("Data inserted successfully!")
# Commit and close connection
conn.commit()
conn.close()

def print_inserted_data_from_db():
    conn = connect_to_db('../db/sqlite.db')
    c = conn.cursor()

    # Query the database to check if the data was inserted
    c.execute('''
    SELECT * FROM enodo LIMIT 5
    ''')
    rows = c.fetchall()
    for row in rows:
        print(row)
    conn.close()





print_inserted_data_from_db()